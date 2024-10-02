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

  const exampleText = "Hello, World!";
  const exampleBase64 = "SGVsbG8sIFdvcmxkIQ==";

  return (
    <div className="holder">
      <Header title="Base64 Decoder" />
      <Card className="input-card">
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

        <div className="text-inputs">
          <div className="text-input">
            <H4>Base64 Input</H4>
            <TextArea
              autoResize={true}
              fill={true}
              large={true}
              value={encodedText}
              onChange={handleInputChange}
              placeholder="Paste Base64 encoded text here..."
            />
          </div>

          <div className="text-input">
            <H4>Decoded Text Output</H4>
            <TextArea
              autoResize={true}
              fill={true}
              large={true}
              readOnly={true}
              value={decodedText}
              placeholder="Result will be displayed here..."
            />
          </div>
        </div>
      </Card>

      <Card className="example-card">
        <H4>Example Usage</H4>
        <p>Below is an example of how to use the Base64 Encoder:</p>

        <div className="text-inputs">
          <div className="text-input">
            <H4>Example Text Input</H4>
            <TextArea
              className="example-input"
              autoResize={true}
              fill={true}
              large={true}
              readOnly={true}
              value={exampleBase64}
            />
          </div>

          <div className="text-input">
            <H4>Expected Base64 Output</H4>
            <TextArea
              className="example-output"
              autoResize={true}
              fill={true}
              large={true}
              readOnly={true}
              value={exampleText}
            />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Base64Decoder;
