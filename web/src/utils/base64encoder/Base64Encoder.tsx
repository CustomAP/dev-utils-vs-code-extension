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

  const exampleText = "Hello, World!";
  const exampleBase64 = "SGVsbG8sIFdvcmxkIQ==";

  return (
    <div className="holder">
      <Header title="Base64 Encoder" />
      <Card className="input-card">
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

        <div className="text-inputs">
          <div className="text-input">
            <H4>Text Input</H4>
            <TextArea
              autoResize={true}
              fill={true}
              large={true}
              value={inputText}
              onChange={handleInputChange}
              placeholder="Enter text to encode..."
            />
          </div>

          <div className="text-input">
            <H4>Base64 Output</H4>
            <TextArea
              autoResize={true}
              fill={true}
              large={true}
              readOnly={true}
              value={encodedText}
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
              value={exampleText}
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
              value={exampleBase64}
            />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Base64Encoder;
