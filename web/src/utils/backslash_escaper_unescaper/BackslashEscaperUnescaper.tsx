import React, { useState } from "react";
import { Button, TextArea, Card, H4 } from "@blueprintjs/core";
import "./BackslashEscaperUnescaper.css";
import Header from "../common/Header";
import CopyButton from "../common/CopyButton";

interface BackslashEscaperUnescaperProps {
  initialText?: string;
  vscode: any;
}

const BackslashEscaperUnescaper: React.FC<BackslashEscaperUnescaperProps> = ({
  initialText = "",
  vscode = null,
}) => {
  const [inputText, setInputText] = useState<string>(initialText);
  const [escapedText, setEscapedText] = useState<string>("");
  const [unescapedText, setUnescapedText] = useState<string>("");

  const escapeBackslashes = (text: string) => {
    return text.replace(/\\/g, "\\\\");
  };

  const unescapeBackslashes = (text: string) => {
    return text.replace(/\\\\/g, "\\");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setInputText(newText);
    setEscapedText(escapeBackslashes(newText));
    setUnescapedText(unescapeBackslashes(newText));
  };

  const handleClear = () => {
    setInputText("");
    setEscapedText("");
    setUnescapedText("");
  };

  return (
    <div className="holder">
      <Header title="Backslash Escaper/Unescaper" />
      <Card className="input-card">
        <H4>Text Input</H4>
        <TextArea
          autoResize={true}
          fill={true}
          large={true}
          value={inputText}
          onChange={handleInputChange}
          placeholder="Enter text with or without backslashes..."
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
          <CopyButton
            vscode={vscode}
            text={unescapedText}
            label="Copy Unescaped"
          />
        </div>

        <H4>Escaped Output</H4>
        <TextArea
          autoResize={true}
          fill={true}
          large={true}
          readOnly={true}
          value={escapedText}
        />

        <H4>Unescaped Output</H4>
        <TextArea
          autoResize={true}
          fill={true}
          large={true}
          readOnly={true}
          value={unescapedText}
        />
      </Card>

      <Card className="example-card">
        <H4>Example Usage</H4>
        <p>Here's how the Backslash Escaper/Unescaper works:</p>

        <H4>Example Text Input</H4>
        <TextArea
          className="example-input"
          autoResize={true}
          fill={true}
          large={true}
          readOnly={true}
          value={`Example with a single backslash: \\
Multi-line text with backslashes: \\\\`}
        />

        <H4>Expected Escaped Output</H4>
        <TextArea
          className="example-output"
          autoResize={true}
          fill={true}
          large={true}
          readOnly={true}
          value={`Example with a single backslash: \\\\
Multi-line text with backslashes: \\\\\\\\`}
        />

        <H4>Expected Unescaped Output</H4>
        <TextArea
          className="example-output"
          autoResize={true}
          fill={true}
          large={true}
          readOnly={true}
          value={`Example with a single backslash: \\
Multi-line text with backslashes: \\`}
        />
      </Card>
    </div>
  );
};

export default BackslashEscaperUnescaper;
