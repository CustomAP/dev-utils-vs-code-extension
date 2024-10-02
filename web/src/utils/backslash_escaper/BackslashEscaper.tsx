import React, { useState } from "react";
import { Button, TextArea, Card, H4 } from "@blueprintjs/core";
import "./BackslashEscaper.css";
import Header from "../common/Header";
import CopyButton from "../common/CopyButton";

interface BackslashEscaperProps {
  initialText?: string;
  vscode: any;
}

const BackslashEscaper: React.FC<BackslashEscaperProps> = ({
  initialText = "",
  vscode = null,
}) => {
  const [inputText, setInputText] = useState<string>(initialText);
  const [escapedText, setEscapedText] = useState<string>("");

  const escapeBackslashes = (text: string) => {
    return text.replace(/\\/g, "\\\\");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setInputText(newText);
    setEscapedText(escapeBackslashes(newText));
  };

  const handleClear = () => {
    setInputText("");
    setEscapedText("");
  };

  return (
    <div className="holder">
      <Header title="Backslash Escaper" />
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
            text={escapedText}
            label="Copy Escaped Text"
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
              placeholder="Enter text to be backslash-escaped..."
            />
          </div>

          <div className="text-input">
            <H4>Escaped Output</H4>
            <TextArea
              autoResize={true}
              fill={true}
              large={true}
              readOnly={true}
              value={escapedText}
              placeholder="Result will be displayed here..."
            />
          </div>
        </div>
      </Card>

      <Card className="example-card">
        <H4>Example Usage</H4>
        <p>Here's how the Backslash Escaper works:</p>

        <div className="text-inputs">
          <div className="text-input">
            <H4>Example Text Input</H4>
            <TextArea
              className="example-input"
              autoResize={true}
              fill={true}
              large={true}
              readOnly={true}
              value={`Example with a single backslash: \\
Multiple backslashes in text: \\\\`}
            />
          </div>
          <div className="text-input">
            <H4>Expected Escaped Output</H4>
            <TextArea
              className="example-output"
              autoResize={true}
              fill={true}
              large={true}
              readOnly={true}
              value={`Example with a single backslash: \\\\
Multiple backslashes in text: \\\\\\\\`}
            />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default BackslashEscaper;
