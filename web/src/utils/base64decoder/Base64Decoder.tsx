import React, { useState } from "react";
import { Button, TextArea, Card, H4 } from "@blueprintjs/core";
import "./Base64Decoder.css";
import Header from "../common/Header";
import CopyButton from "../common/CopyButton";

interface Base64DecoderProps {
  initialText?: string;
  vscode: any;
}

const Base64Decoder: React.FC<Base64DecoderProps> = ({
  initialText = "",
  vscode = null,
}) => {
  const [encodedText, setEncodedText] = useState<string>(initialText);
  const [decodedText, setDecodedText] = useState<string>("");

  const decodeFromBase64 = (base64Str: string) => {
    try {
      const decoded = atob(base64Str);
      setDecodedText(decoded);
    } catch (e) {
      setDecodedText("Invalid Base64 format");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newEncodedText = e.target.value;
    setEncodedText(newEncodedText);
    decodeFromBase64(newEncodedText);
  };

  const handleClear = () => {
    setEncodedText("");
    setDecodedText("");
  };

  return (
    <div className="holder">
      <Header title="Base64 Decoder" />
      <Card className="input-card">
        <H4>Base64 Input</H4>
        <TextArea
          autoResize={true}
          fill={true}
          large={true}
          value={encodedText}
          onChange={handleInputChange}
          placeholder="Paste Base64 encoded text here..."
        />
        <div>
          <Button
            className="clear-button"
            intent="danger"
            onClick={handleClear}
          >
            Clear Input
          </Button>
          <CopyButton vscode={vscode} text={decodedText} label="Copy Result" />
        </div>

        <H4>Decoded Text Output</H4>
        <TextArea
          autoResize={true}
          fill={true}
          large={true}
          readOnly={true}
          value={decodedText}
        />
      </Card>
    </div>
  );
};

export default Base64Decoder;
