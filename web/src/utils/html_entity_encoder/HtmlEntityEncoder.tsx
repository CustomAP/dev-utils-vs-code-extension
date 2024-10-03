import React, { useState } from "react";
import { Button, TextArea, Card, H4 } from "@blueprintjs/core";
import "./HtmlEntityEncoder.css";
import Header from "../common/Header";
import CopyButton from "../common/CopyButton";

interface HtmlEntityEncoderProps {
  initialText?: string;
  vscode: any;
}

const HtmlEntityEncoder: React.FC<HtmlEntityEncoderProps> = ({
  initialText = "",
  vscode = null,
}) => {
  const [inputText, setInputText] = useState<string>(initialText);
  const [encodedText, setEncodedText] = useState<string>("");

  const encodeHtmlEntities = (text: string) => {
    const encodedString = text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");

    setEncodedText(encodedString);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setInputText(newText);
    encodeHtmlEntities(newText);
  };

  const handleClear = () => {
    setInputText("");
    setEncodedText("");
  };

  const exampleText = `<div class="container">
  <h1>Welcome to My Website</h1>
  <p>This is a sample text with a <a href="https://example.com">link</a> & special characters: < > " '</p>
</div>`;

  const exampleEncoded = `&lt;div class=&quot;container&quot;&gt;
  &lt;h1&gt;Welcome to My Website&lt;/h1&gt;
  &lt;p&gt;This is a sample text with a &lt;a href=&quot;https://example.com&quot;&gt;link&lt;/a&gt; &amp; special characters: &lt; &gt; &quot; &#39;&lt;/p&gt;
&lt;/div&gt;`;

  return (
    <div className="holder">
      <Header title="HTML Entity Encoder" />
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
              placeholder="Paste text here..."
            />
          </div>

          <div className="text-input">
            <H4>Encoded Output</H4>
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
        <p>Below is an example of how to use the HTML entity encoder:</p>

        <div className="text-inputs">
          <div className="text-input">
            <H4>Example HTML Input</H4>
            <TextArea
              className="example-text"
              autoResize={true}
              fill={true}
              large={true}
              readOnly={true}
              value={exampleText}
            />
          </div>

          <div className="text-input">
            <H4>Expected Encoded Output</H4>
            <TextArea
              autoResize={true}
              fill={true}
              large={true}
              readOnly={true}
              value={exampleEncoded}
              className="example-encoded"
            />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default HtmlEntityEncoder;
