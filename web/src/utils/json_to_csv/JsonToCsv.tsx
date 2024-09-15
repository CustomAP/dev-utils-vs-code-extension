import React, { useState } from "react";
import { Button, TextArea, Card, H4, Divider } from "@blueprintjs/core";
import Papa from "papaparse";
import "./JsonToCsv.css";
import Header from "../common/Header";
import CopyButton from "../common/CopyButton";

interface JsonToCsvProps {
  initialJson?: string;
  vscode: any;
}

const JsonToCsv: React.FC<JsonToCsvProps> = ({
  initialJson = "",
  vscode = null,
}) => {
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

  const exampleJson = `[
    {"name": "John Doe", "age": 30, "email": "johndoe@example.com"},
    {"name": "Jane Doe", "age": 28, "email": "janedoe@example.com"}
]`;

  const exampleCsv = `name,age,email
John Doe,30,johndoe@example.com
Jane Doe,28,janedoe@example.com`;

  return (
    <div className="holder">
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
        <div>
          <Button
            className="clear-button"
            intent="danger"
            onClick={handleClear}
          >
            Clear Input
          </Button>
          <CopyButton vscode={vscode} text={csvText} label="Copy Result" />
        </div>

        <H4>CSV Output</H4>
        <TextArea
          autoResize={true}
          fill={true}
          large={true}
          readOnly={true}
          value={csvText}
        />
      </Card>

      <Card className="example-card">
        <H4>Example Usage</H4>
        <p>Below is an example of how to use the JSON to CSV converter:</p>
        <H4>Example JSON Input</H4>
        <TextArea
          className="example-json"
          autoResize={true}
          fill={true}
          large={true}
          readOnly={true}
          value={exampleJson}
        />

        <H4>Expected CSV Output</H4>
        <TextArea
          autoResize={true}
          fill={true}
          large={true}
          readOnly={true}
          value={exampleCsv}
          className="example-csv"
        />
      </Card>
    </div>
  );
};

export default JsonToCsv;
