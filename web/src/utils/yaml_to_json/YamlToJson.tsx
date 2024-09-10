import React, { useState } from "react";
import { Button, TextArea, Card, H4 } from "@blueprintjs/core";
import yaml from "js-yaml";
import "./YamlToJson.css";
import Header from "../common/Header";
import CopyButton from "../common/CopyButton";

interface YamlToJsonProps {
  initialYaml?: string;
  vscode: any;
}

const YamlToJson: React.FC<YamlToJsonProps> = ({
  initialYaml = "",
  vscode = null,
}) => {
  const [yamlText, setYamlText] = useState<string>(initialYaml);
  const [jsonText, setJsonText] = useState<string>("");

  const yamlToJson = (yamlStr: string) => {
    try {
      const parsedYaml = yaml.load(yamlStr);
      setJsonText(JSON.stringify(parsedYaml, null, 2));
    } catch (e) {
      setJsonText("Invalid YAML format");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newYamlText = e.target.value;
    setYamlText(newYamlText);
    yamlToJson(newYamlText);
  };

  const handleClear = () => {
    setYamlText("");
    setJsonText("");
  };

  return (
    <div className="holder">
      <Header title="YAML to JSON Converter" />
      <Card className="input-card">
        <H4>YAML Input</H4>
        <TextArea
          autoResize={true}
          fill={true}
          large={true}
          value={yamlText}
          onChange={handleInputChange}
          placeholder="Paste YAML data here..."
        />
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

export default YamlToJson;
