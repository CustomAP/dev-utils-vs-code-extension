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

        <div className="text-inputs">
          <div className="text-input">
            <H4>JSON Input</H4>
            <TextArea
              autoResize={true}
              fill={true}
              large={true}
              value={jsonText}
              onChange={handleInputChange}
              placeholder="Paste JSON data here..."
            />
          </div>

          <div className="text-input">
            <H4>YAML Output</H4>
            <TextArea
              autoResize={true}
              fill={true}
              large={true}
              readOnly={true}
              value={yamlText}
              placeholder="Result will be displayed here..."
            />
          </div>
        </div>
      </Card>

      <Card className="example-card">
        <H4>Example Usage</H4>
        <p>Below is an example of how to use the JSON to YAML Converter:</p>

        <div className="text-inputs">
          <div className="text-input">
            <H4>Example JSON Input</H4>
            <TextArea
              className="example-input"
              autoResize={true}
              fill={true}
              large={true}
              readOnly={true}
              value={`{
  "name": "John Doe",
  "age": 30,
  "occupation": "Developer"
}`}
            />
          </div>
          <div className="text-input">
            <H4>Expected YAML Output</H4>
            <TextArea
              className="example-output"
              autoResize={true}
              fill={true}
              large={true}
              readOnly={true}
              value={`name: John Doe\nage: 30\noccupation: Developer`}
            />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default JsonToYaml;
