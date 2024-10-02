import React, { useState } from "react";
import { Button, TextArea, Card, H4 } from "@blueprintjs/core";
import "./JsonPrettier.css";
import Header from "../common/Header";
import CopyButton from "../common/CopyButton";

interface JsonPrettierProps {
  initialJson?: string;
  vscode: any;
}

const JsonPrettier: React.FC<JsonPrettierProps> = ({
  initialJson = "",
  vscode = null,
}) => {
  const [jsonText, setJsonText] = useState<string>(initialJson);
  const [prettyJson, setPrettyJson] = useState<string>("");

  const prettifyJson = (jsonStr: string) => {
    try {
      const jsonObject = JSON.parse(jsonStr);
      const pretty = JSON.stringify(jsonObject, null, 2);
      setPrettyJson(pretty);
    } catch (e) {
      setPrettyJson("Invalid JSON format");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newJsonText = e.target.value;
    setJsonText(newJsonText);
    prettifyJson(newJsonText);
  };

  const handleClear = () => {
    setJsonText("");
    setPrettyJson("");
  };

  return (
    <div className="holder">
      <Header title="JSON Prettier" />
      <Card className="input-card">
        <div>
          <Button
            className="clear-button"
            intent="danger"
            onClick={handleClear}
          >
            Clear Input
          </Button>
          <CopyButton vscode={vscode} text={prettyJson} label="Copy Result" />
        </div>
        <div className="text-inputs">
          <div className="text-input">
            <H4>JSON Input</H4>
            <TextArea
              autoResize={true}
              fill={true}
              large={true}
              value={jsonText}
              onChange={handleInputChange}
              placeholder="Paste JSON here..."
            />
          </div>

          <div className="text-input">
            <H4>Pretty JSON Output</H4>
            <TextArea
              autoResize={true}
              fill={true}
              large={true}
              readOnly={true}
              value={prettyJson}
              placeholder="Result will be displayed here..."
            />
          </div>
        </div>
      </Card>

      <Card className="example-card">
        <H4>Example Usage</H4>
        <p>Below is an example of how to use the JSON Prettier:</p>

        <div className="text-inputs">
          <div className="text-input">
            <H4>Example JSON Input</H4>
            <TextArea
              className="example-json"
              autoResize={true}
              fill={true}
              large={true}
              readOnly={true}
              value={`{
      "name": "John Doe","age": 30,"email": "johndoe@example.com",
      "address": {
        "street": "123 Main St",
        "city": "Springfield",
        "state": "IL"
      }
    }`}
            />
          </div>

          <div className="text-input">
            <H4>Expected Pretty JSON Output</H4>
            <TextArea
              className="example-pretty-json"
              autoResize={true}
              fill={true}
              large={true}
              readOnly={true}
              value={`{
  "name": "John Doe",
  "age": 30,
  "email": "johndoe@example.com",
  "address": {
    "street": "123 Main St",
    "city": "Springfield",
    "state": "IL"
  }
}`}
            />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default JsonPrettier;
