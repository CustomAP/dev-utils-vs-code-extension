import React, { useState } from "react";
import { Button, TextArea, Card, H4 } from "@blueprintjs/core";
import yaml from "js-yaml";
import "./JsonToYaml.css";
import Header from "../common/Header";
import CopyButton from "../common/CopyButton";

interface JsonToYamlProps {
  initialJson?: string;
  vscode: any;
}

const JsonToYaml: React.FC<JsonToYamlProps> = ({
  initialJson = "",
  vscode = null,
}) => {
  const [jsonText, setJsonText] = useState<string>(initialJson);
  const [yamlText, setYamlText] = useState<string>("");

  const jsonToYaml = (jsonStr: string) => {
    try {
      const parsedJson = JSON.parse(jsonStr);
      const convertedYaml = yaml.dump(parsedJson);
      setYamlText(convertedYaml);
    } catch (e) {
      setYamlText("Invalid JSON format");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newJsonText = e.target.value;
    setJsonText(newJsonText);
    jsonToYaml(newJsonText);
  };

  const handleClear = () => {
    setJsonText("");
    setYamlText("");
  };

  return (
    <div className="holder">
      <Header title="JSON to YAML Converter" />
      <Card className="input-card">
        <H4>JSON Input</H4>
        <TextArea
          autoResize={true}
          fill={true}
          large={true}
          value={jsonText}
          onChange={handleInputChange}
          placeholder="Paste JSON data here..."
        />
        <div>
          <Button
            className="clear-button"
            intent="danger"
            onClick={handleClear}
          >
            Clear Input
          </Button>
          <CopyButton vscode={vscode} text={yamlText} label="Copy Result" />
        </div>

        <H4>YAML Output</H4>
        <TextArea
          autoResize={true}
          fill={true}
          large={true}
          readOnly={true}
          value={yamlText}
        />
      </Card>
    </div>
  );
};

export default JsonToYaml;
