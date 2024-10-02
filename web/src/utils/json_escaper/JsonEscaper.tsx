import React, { useState } from "react";
import { Button, TextArea, Card, H4 } from "@blueprintjs/core";
import "./JsonEscaper.css";
import Header from "../common/Header";
import CopyButton from "../common/CopyButton";

interface JsonEscaperProps {
  initialText?: string;
  vscode: any;
}

const JsonEscaper: React.FC<JsonEscaperProps> = ({
  initialText = "",
  vscode = null,
}) => {
  const [inputText, setInputText] = useState<string>(initialText);
  const [escapedText, setEscapedText] = useState<string>("");

  const escapeJson = (text: string) => {
    return text.replace(/"/g, '\\"');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setInputText(newText);
    setEscapedText(escapeJson(newText));
  };

  const handleClear = () => {
    setInputText("");
    setEscapedText("");
  };

  return (
    <div className="holder">
      <Header title="JSON Escaper" />
      <Card className="input-card">
        <H4>Text Input</H4>
        <TextArea
          autoResize={true}
          fill={true}
          large={true}
          value={inputText}
          onChange={handleInputChange}
          placeholder='Enter JSON text (e.g., { "key": "value" })...'
        />
        <div>
          <Button
            className="clear-button"
            intent="danger"
            onClick={handleClear}
          >
            Clear Input
          </Button>
          <CopyButton vscode={vscode} text={escapedText} label="Copy Escaped" />
        </div>

        <H4>Escaped Output</H4>
        <TextArea
          autoResize={true}
          fill={true}
          large={true}
          readOnly={true}
          value={escapedText}
        />
      </Card>

      <Card className="example-card">
        <H4>Example Usage</H4>
        <p>Here's how the JSON Escaper works:</p>

        <H4>Example JSON Input</H4>
        <TextArea
          className="example-input"
          autoResize={true}
          fill={true}
          large={true}
          readOnly={true}
          value={`{
  "name": "John "Doe"",
  "age": 30,
  "description": "A developer"
}`}
        />

        <H4>Expected Escaped Output</H4>
        <TextArea
          className="example-output"
          autoResize={true}
          fill={true}
          large={true}
          readOnly={true}
          value={`{
  \\"name\\": \\"John \\"Doe\\"\\",
  \\"age\\": 30,
  \\"description\\": \\"A developer\\"
}`}
        />
      </Card>
    </div>
  );
};

export default JsonEscaper;
