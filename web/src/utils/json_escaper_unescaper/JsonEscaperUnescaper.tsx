import React, { useState } from "react";
import { Button, TextArea, Card, H4 } from "@blueprintjs/core";
import "./JsonEscaperUnescaper.css";
import Header from "../common/Header";
import CopyButton from "../common/CopyButton";

interface JsonEscaperUnescaperProps {
  initialText?: string;
  vscode: any;
}

const JsonEscaperUnescaper: React.FC<JsonEscaperUnescaperProps> = ({
  initialText = "",
  vscode = null,
}) => {
  const [inputText, setInputText] = useState<string>(initialText);
  const [escapedText, setEscapedText] = useState<string>("");
  const [unescapedText, setUnescapedText] = useState<string>("");

  const escapeJson = (text: string) => {
    return text.replace(/"/g, '\\"');
  };

  const unescapeJson = (text: string) => {
    return text.replace(/\\"/g, '"');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setInputText(newText);
    setEscapedText(escapeJson(newText));
    setUnescapedText(unescapeJson(newText));
  };

  const handleClear = () => {
    setInputText("");
    setEscapedText("");
    setUnescapedText("");
  };

  return (
    <div className="holder">
      <Header title="JSON Escaper/Unescaper" />
      <Card className="input-card">
        <H4>Text Input</H4>
        <TextArea
          autoResize={true}
          fill={true}
          large={true}
          value={inputText}
          onChange={handleInputChange}
          placeholder='Enter JSON text with or without escaped quotes (e.g., { "key": "value" })...'
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
    </div>
  );
};

export default JsonEscaperUnescaper;
