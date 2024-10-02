import React, { useState } from "react";
import { Button, TextArea, Card, H4 } from "@blueprintjs/core";
import "./HtmlStripper.css";
import Header from "../common/Header";
import CopyButton from "../common/CopyButton";

interface HtmlStripperProps {
  initialHtml?: string;
  vscode: any;
}

const HtmlStripper: React.FC<HtmlStripperProps> = ({
  initialHtml = "",
  vscode = null,
}) => {
  const [htmlText, setHtmlText] = useState<string>(initialHtml);
  const [plainText, setPlainText] = useState<string>("");

  const stripHtmlTags = (htmlStr: string) => {
    // Regular expression to remove HTML tags
    const strippedText = htmlStr.replace(/<\/?[^>]+>/gi, "");
    setPlainText(strippedText);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newHtmlText = e.target.value;
    setHtmlText(newHtmlText);
    stripHtmlTags(newHtmlText);
  };

  const handleClear = () => {
    setHtmlText("");
    setPlainText("");
  };

  return (
    <div className="holder">
      <Header title="HTML Stripper" />
      <Card className="input-card">
        <div>
          <Button
            className="clear-button"
            intent="danger"
            onClick={handleClear}
          >
            Clear Input
          </Button>
          <CopyButton vscode={vscode} text={plainText} label="Copy Result" />
        </div>

        <div className="text-inputs">
          <div className="text-input">
            <H4>HTML Input</H4>
            <TextArea
              autoResize={true}
              fill={true}
              large={true}
              value={htmlText}
              onChange={handleInputChange}
              placeholder="Paste HTML data here..."
            />
          </div>

          <div className="text-input">
            <H4>Plain Text Output</H4>
            <TextArea
              autoResize={true}
              fill={true}
              large={true}
              readOnly={true}
              value={plainText}
              placeholder="Result will be displayed here..."
            />
          </div>
        </div>
      </Card>

      <Card className="example-card">
        <H4>Example Usage</H4>
        <p>Here's how the HTML Stripper works:</p>

        <div className="text-inputs">
          <div className="text-input">
            <H4>Example HTML Input</H4>
            <TextArea
              className="example-input"
              autoResize={true}
              fill={true}
              large={true}
              readOnly={true}
              value={`<html><h1>Hello, World!</h1>How's it going?</html>`}
            />
          </div>

          <div className="text-input">
            <H4>Expected Plain Text Output</H4>
            <TextArea
              className="example-output"
              autoResize={true}
              fill={true}
              large={true}
              readOnly={true}
              value={`Hello, World!How's it going?`}
            />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default HtmlStripper;
