import React, { useState } from "react";
import { Button, TextArea, Card, H4 } from "@blueprintjs/core";
import "./JsonPrettier.css";
import Header from "../common/Header";
import CopyButton from "../common/CopyButton";

interface JsonPrettierProps {
  initialJson?: string;
}

const JsonPrettier: React.FC<JsonPrettierProps> = ({ initialJson = "" }) => {
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
    <div>
      <Header title="JSON Prettier" />
      <Card className="input-card">
        <H4>JSON Input</H4>
        <TextArea
          autoResize={true}
          fill={true}
          large={true}
          value={jsonText}
          onChange={handleInputChange}
          placeholder="Paste JSON here..."
        />
        <div>
          <Button
            className="clear-button"
            intent="danger"
            onClick={handleClear}
          >
            Clear Input
          </Button>
          <CopyButton text={prettyJson} label="Copy Result" />
        </div>

        <H4>Pretty JSON Output</H4>
        <TextArea
          autoResize={true}
          fill={true}
          large={true}
          readOnly={true}
          value={prettyJson}
        />
      </Card>
    </div>
  );
};

export default JsonPrettier;
