import React, { useState } from "react";
import { Button, TextArea, Card, H4 } from "@blueprintjs/core";
import "./Base64Encoder.css";
import Header from "../common/Header";
import CopyButton from "../common/CopyButton";

interface Base64EncoderProps {
  initialText?: string;
  vscode: any;
}

const Base64Encoder: React.FC<Base64EncoderProps> = ({
  initialText = "",
  vscode = null,
}) => {
  const [inputText, setInputText] = useState<string>(initialText);
  const [encodedText, setEncodedText] = useState<string>("");

  const encodeToBase64 = (text: string) => {
    try {
      const base64Encoded = btoa(text);
      setEncodedText(base64Encoded);
    } catch (e) {
      setEncodedText("Error encoding to Base64");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setInputText(newText);
    encodeToBase64(newText);
  };

  const handleClear = () => {
    setInputText("");
    setEncodedText("");
  };

  return (
    <div className="holder">
      <Header title="Base64 Encoder" />
      <Card className="input-card">
        <H4>Text Input</H4>
        <TextArea
          autoResize={true}
          fill={true}
          large={true}
          value={inputText}
          onChange={handleInputChange}
          placeholder="Enter text to encode..."
        />
        <div>
          <Button
            className="clear-button"
            intent="danger"
            onClick={handleClear}
          >
            Clear Input
          </Button>
          <CopyButton vscode={vscode} text={encodedText} label="Copy Result" />
        </div>

        <H4>Base64 Output</H4>
        <TextArea
          autoResize={true}
          fill={true}
          large={true}
          readOnly={true}
          value={encodedText}
        />
      </Card>
    </div>
  );
};

export default Base64Encoder;
