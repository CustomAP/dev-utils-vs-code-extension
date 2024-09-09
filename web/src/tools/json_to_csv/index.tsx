import React, { useState } from "react";
import { Button, TextArea, Card, H4 } from "@blueprintjs/core";
import Papa from "papaparse";
import "./index.css";
import Header from "../common/Header";

interface JsonToCsvProps {
  initialJson?: string;
}

const JsonToCsv: React.FC<JsonToCsvProps> = ({ initialJson = "" }) => {
  const [jsonText, setJsonText] = useState<string>(initialJson);
  const [csvText, setCsvText] = useState<string>("");

  const jsonToCsv = (jsonStr: string) => {
    try {
      const jsonObject = JSON.parse(jsonStr);
      const csv = Papa.unparse(jsonObject, {
        delimiter: ",",
        skipEmptyLines: true,
      });

      setCsvText(csv);
    } catch (e) {
      setCsvText("Invalid JSON format");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newJsonText = e.target.value;
    setJsonText(newJsonText);
    jsonToCsv(newJsonText);
  };

  const handleClear = () => {
    setJsonText("");
    setCsvText("");
  };

  return (
    <div>
      <Header title="JSON to CSV Converter" />
      <Card className="input-card">
        <H4>JSON Input</H4>
        <TextArea
          autoResize={true}
          fill={true}
          large={true}
          value={jsonText}
          onChange={handleInputChange}
          placeholder="Paste JSON array here..."
        />
        <Button className="clear-button" onClick={handleClear}>
          Clear
        </Button>

        <H4>CSV Output</H4>
        <TextArea
          autoResize={true}
          fill={true}
          large={true}
          readOnly={true}
          value={csvText}
        />
      </Card>
    </div>
  );
};

export default JsonToCsv;
