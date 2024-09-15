import React, { useState } from "react";
import { Button, TextArea, Card, H4 } from "@blueprintjs/core";
import "./UrlEncoder.css";
import Header from "../common/Header";
import CopyButton from "../common/CopyButton";

interface UrlEncoderProps {
  initialText?: string;
  vscode: any;
}

const UrlEncoder: React.FC<UrlEncoderProps> = ({
  initialText = "",
  vscode = null,
}) => {
  const [inputText, setInputText] = useState<string>(initialText);
  const [encodedText, setEncodedText] = useState<string>("");

  const encodeToUrl = (text: string) => {
    try {
      const urlEncoded = encodeURIComponent(text);
      setEncodedText(urlEncoded);
    } catch (e) {
      setEncodedText("Error encoding URL");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setInputText(newText);
    encodeToUrl(newText);
  };

  const handleClear = () => {
    setInputText("");
    setEncodedText("");
  };

  return (
    <div className="holder">
      <Header title="URL Query Encoder" />
      <Card className="input-card">
        <H4>Text Input</H4>
        <TextArea
          autoResize={true}
          fill={true}
          large={true}
          value={inputText}
          onChange={handleInputChange}
          placeholder="Enter query to encode..."
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

        <H4>Encoded URL Query Output</H4>
        <TextArea
          autoResize={true}
          fill={true}
          large={true}
          readOnly={true}
          value={encodedText}
        />
      </Card>

      <Card className="example-card">
        <H4>Example Usage</H4>
        <p>Below is an example of how to use the URL Query Encoder:</p>

        <H4>Example Text Input</H4>
        <TextArea
          className="example-input"
          autoResize={true}
          fill={true}
          large={true}
          readOnly={true}
          value="React Components & BlueprintJS"
        />

        <H4>Expected Encoded URL Query Output</H4>
        <TextArea
          className="example-output"
          autoResize={true}
          fill={true}
          large={true}
          readOnly={true}
          value="React%20Components%20%26%20BlueprintJS"
        />
      </Card>
    </div>
  );
};

export default UrlEncoder;
