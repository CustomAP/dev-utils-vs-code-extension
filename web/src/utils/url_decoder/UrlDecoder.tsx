import React, { useState } from "react";
import { Button, TextArea, Card, H4 } from "@blueprintjs/core";
import "./UrlDecoder.css";
import Header from "../common/Header";
import CopyButton from "../common/CopyButton";

interface UrlDecoderProps {
  initialText?: string;
  vscode: any;
}

const UrlDecoder: React.FC<UrlDecoderProps> = ({
  initialText = "",
  vscode = null,
}) => {
  const [encodedText, setEncodedText] = useState<string>(initialText);
  const [decodedText, setDecodedText] = useState<string>("");

  const decodeFromUrl = (text: string) => {
    try {
      const urlDecoded = decodeURIComponent(text);
      setDecodedText(urlDecoded);
    } catch (e) {
      setDecodedText("Invalid URL encoding");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setEncodedText(newText);
    decodeFromUrl(newText);
  };

  const handleClear = () => {
    setEncodedText("");
    setDecodedText("");
  };

  return (
    <div className="holder">
      <Header title="URL Query Decoder" />
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
            <H4>Encoded URL Query Input</H4>
            <TextArea
              autoResize={true}
              fill={true}
              large={true}
              value={encodedText}
              onChange={handleInputChange}
              placeholder="Enter URL-encoded query here..."
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
        <p>
          Below is an example of how to use the URL Query Decoder. Copy paste
          the <b>Query part of the URL</b> and the utility does the rest:
        </p>

        <H4>Example URL</H4>
        <TextArea
          className="example-input"
          autoResize={true}
          fill={true}
          large={true}
          readOnly={true}
          value="www.example.com/React%20Components%20%26%20BlueprintJS"
        />

        <div className="text-inputs">
          <div className="text-input">
            <H4>Example Encoded URL Input</H4>
            <TextArea
              className="example-input"
              autoResize={true}
              fill={true}
              large={true}
              readOnly={true}
              value="React%20Components%20%26%20BlueprintJS"
            />
          </div>

          <div className="text-input">
            <H4>Expected Decoded URL Query Output</H4>
            <TextArea
              className="example-output"
              autoResize={true}
              fill={true}
              large={true}
              readOnly={true}
              value="React Components & BlueprintJS"
            />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default UrlDecoder;
