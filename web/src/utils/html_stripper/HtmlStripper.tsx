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
        <H4>HTML Input</H4>
        <TextArea
          autoResize={true}
          fill={true}
          large={true}
          value={htmlText}
          onChange={handleInputChange}
          placeholder="Paste HTML data here..."
        />
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

        <H4>Plain Text Output</H4>
        <TextArea
          autoResize={true}
          fill={true}
          large={true}
          readOnly={true}
          value={plainText}
        />
      </Card>
    </div>
  );
};

export default HtmlStripper;
