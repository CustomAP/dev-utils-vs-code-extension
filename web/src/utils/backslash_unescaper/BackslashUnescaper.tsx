import React, { useState } from "react";
import { Button, TextArea, Card, H4 } from "@blueprintjs/core";
import "./BackslashUnescaper.css";
import Header from "../common/Header";
import CopyButton from "../common/CopyButton";

interface BackslashUnescaperProps {
  initialText?: string;
  vscode: any;
}

const BackslashUnescaper: React.FC<BackslashUnescaperProps> = ({
  initialText = "",
  vscode = null,
}) => {
  const [inputText, setInputText] = useState<string>(initialText);
  const [unescapedText, setUnescapedText] = useState<string>("");

  const unescapeBackslashes = (text: string) => {
    return text.replace(/\\\\/g, "\\");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setInputText(newText);
    setUnescapedText(unescapeBackslashes(newText));
  };

  const handleClear = () => {
    setInputText("");
    setUnescapedText("");
  };

  return (
    <div className="holder">
      <Header title="Backslash Unescaper" />
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
            label="Copy Unescaped Text"
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
              placeholder="Enter text with escaped backslashes..."
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
        <p>Here's how the Backslash Unescaper works:</p>

        <div className="text-inputs">
          <div className="text-input">
            <H4>Example Text Input</H4>
            <TextArea
              className="example-input"
              autoResize={true}
              fill={true}
              large={true}
              readOnly={true}
              value={`Example with escaped backslashes: \\\\
Multi-line text with escaped backslashes: \\\\\\\\`}
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
              value={`Example with escaped backslashes: \\
Multi-line text with escaped backslashes: \\`}
            />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default BackslashUnescaper;
