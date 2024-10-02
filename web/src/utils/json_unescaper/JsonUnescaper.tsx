import React, { useState } from "react";
import { Button, TextArea, Card, H4 } from "@blueprintjs/core";
import "./JsonUnescaper.css";
import Header from "../common/Header";
import CopyButton from "../common/CopyButton";

interface JsonUnescaperProps {
  initialText?: string;
  vscode: any;
}

const JsonUnescaper: React.FC<JsonUnescaperProps> = ({
  initialText = "",
  vscode = null,
}) => {
  const [inputText, setInputText] = useState<string>(initialText);
  const [unescapedText, setUnescapedText] = useState<string>("");

  const unescapeJson = (text: string) => {
    return text.replace(/\\"/g, '"');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setInputText(newText);
    setUnescapedText(unescapeJson(newText));
  };

  const handleClear = () => {
    setInputText("");
    setUnescapedText("");
  };

  return (
    <div className="holder">
      <Header title="JSON Unescaper" />
      <Card className="input-card">
        <div>
          <Button
            className="clear-button"
            intent="danger"
            onClick={handleClear}
          >
            Clear Input
          </Button>
          <CopyButton
            vscode={vscode}
            text={unescapedText}
            label="Copy Unescaped"
          />
        </div>

        <div className="text-inputs">
          <div className="text-input">
            <H4>Text Input</H4>
            <TextArea
              autoResize={true}
              fill={true}
              large={true}
              value={inputText}
              onChange={handleInputChange}
              placeholder='Enter JSON text with escaped quotes (e.g., { \"key\": \"value\" })...'
            />
          </div>

          <div className="text-input">
            <H4>Unescaped Output</H4>
            <TextArea
              autoResize={true}
              fill={true}
              large={true}
              readOnly={true}
              value={unescapedText}
              placeholder="Result will be displayed here..."
            />
          </div>
        </div>
      </Card>

      <Card className="example-card">
        <H4>Example Usage</H4>
        <p>Here's how the JSON Unescaper works:</p>

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
  \\"name\\": \\"John \\"Doe\\"\\",
  \\"age\\": 30,
  \\"description\\": \\"A developer\\"
}`}
            />
          </div>

          <div className="text-input">
            <H4>Expected Unescaped Output</H4>
            <TextArea
              className="example-output"
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
          </div>
        </div>
      </Card>
    </div>
  );
};

export default JsonUnescaper;
