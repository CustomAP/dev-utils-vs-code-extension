import React, { useState } from "react";
import { Button, TextArea, Card, H4 } from "@blueprintjs/core";
import Papa from "papaparse";
import "./CsvToJson.css";
import Header from "../common/Header";
import CopyButton from "../common/CopyButton";

interface CsvToJsonProps {
  initialCsv?: string;
}

const CsvToJson: React.FC<CsvToJsonProps> = ({ initialCsv = "" }) => {
  const [csvText, setCsvText] = useState<string>(initialCsv);
  const [jsonText, setJsonText] = useState<string>("");

  const csvToJson = (csvStr: string) => {
    try {
      Papa.parse(csvStr, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          setJsonText(JSON.stringify(results.data, null, 2));
        },
        error: () => {
          setJsonText("Invalid CSV format");
        },
      });
    } catch (e) {
      setJsonText("Error parsing CSV");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newCsvText = e.target.value;
    setCsvText(newCsvText);
    csvToJson(newCsvText);
  };

  const handleClear = () => {
    setCsvText("");
    setJsonText("");
  };

  return (
    <div>
      <Header title="CSV to JSON Converter" />
      <Card className="input-card">
        <H4>CSV Input</H4>
        <TextArea
          autoResize={true}
          fill={true}
          large={true}
          value={csvText}
          onChange={handleInputChange}
          placeholder="Paste CSV data here..."
        />
        <div>
          <Button
            className="clear-button"
            intent="danger"
            onClick={handleClear}
          >
            Clear Input
          </Button>
          <CopyButton text={jsonText} label="Copy Result" />
        </div>

        <H4>JSON Output</H4>
        <TextArea
          autoResize={true}
          fill={true}
          large={true}
          readOnly={true}
          value={jsonText}
        />
      </Card>
    </div>
  );
};

export default CsvToJson;
