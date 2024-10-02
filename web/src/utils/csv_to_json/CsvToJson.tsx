import React, { useState } from "react";
import { Button, TextArea, Card, H4 } from "@blueprintjs/core";
import Papa from "papaparse";
import "./CsvToJson.css";
import Header from "../common/Header";
import CopyButton from "../common/CopyButton";

interface CsvToJsonProps {
  initialCsv?: string;
  vscode: any;
}

const CsvToJson: React.FC<CsvToJsonProps> = ({
  initialCsv = "",
  vscode = null,
}) => {
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

  const exampleCsv = `name,age,email
John Doe,30,johndoe@example.com
Jane Doe,28,janedoe@example.com`;

  const exampleJson = `[
    {
      "name": "John Doe",
      "age": "30",
      "email": "johndoe@example.com"
    },
    {
      "name": "Jane Doe",
      "age": "28",
      "email": "janedoe@example.com"
    }
]`;

  return (
    <div className="holder">
      <Header title="CSV to JSON Converter" />
      <Card className="input-card">
        <div>
          <Button
            className="clear-button"
            intent="danger"
            onClick={handleClear}
          >
            Clear Input
          </Button>
          <CopyButton vscode={vscode} text={jsonText} label="Copy Result" />
        </div>

        <div className="text-inputs">
          <div className="text-input">
            <H4>CSV Input</H4>
            <TextArea
              autoResize={true}
              fill={true}
              large={true}
              value={csvText}
              onChange={handleInputChange}
              placeholder="Paste CSV data here..."
            />
          </div>

          <div className="text-input">
            <H4>JSON Output</H4>
            <TextArea
              autoResize={true}
              fill={true}
              large={true}
              readOnly={true}
              value={jsonText}
              placeholder="Result will be displayed here..."
            />
          </div>
        </div>
      </Card>

      <Card className="example-card">
        <H4>Example Usage</H4>
        <p>Below is an example of how to use the CSV to JSON converter:</p>

        <div className="text-inputs">
          <div className="text-input">
            <H4>Example CSV Input</H4>
            <TextArea
              className="example-csv"
              autoResize={true}
              fill={true}
              large={true}
              readOnly={true}
              value={exampleCsv}
            />
          </div>

          <div className="text-input">
            <H4>Expected JSON Output</H4>
            <TextArea
              className="example-json"
              autoResize={true}
              fill={true}
              large={true}
              readOnly={true}
              value={exampleJson}
            />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CsvToJson;
