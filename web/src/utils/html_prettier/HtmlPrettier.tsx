import React, { useState } from "react";
import { Button, TextArea, Card, H4 } from "@blueprintjs/core";
import { html as beautifyHtml } from "js-beautify";
import "./HtmlPrettier.css";
import Header from "../common/Header";
import CopyButton from "../common/CopyButton";

interface HtmlPrettierProps {
  initialHtml?: string;
  vscode: any;
}

const HtmlPrettier: React.FC<HtmlPrettierProps> = ({
  initialHtml = "",
  vscode = null,
}) => {
  const [htmlText, setHtmlText] = useState<string>(initialHtml);
  const [formattedHtml, setFormattedHtml] = useState<string>("");

  const beautifyHtmlContent = (htmlStr: string) => {
    try {
      const formatted = beautifyHtml(htmlStr, {
        indent_size: 2,
        preserve_newlines: true,
        max_preserve_newlines: 1,
        end_with_newline: true,
      });
      setFormattedHtml(formatted);
    } catch (e) {
      setFormattedHtml("Invalid HTML format");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newHtmlText = e.target.value;
    setHtmlText(newHtmlText);
    beautifyHtmlContent(newHtmlText);
  };

  const handleClear = () => {
    setHtmlText("");
    setFormattedHtml("");
  };

  return (
    <div className="holder">
      <Header title="HTML Prettier" />
      <Card className="input-card">
        <div>
          <Button
            className="clear-button"
            intent="danger"
            onClick={handleClear}
          >
            Clear Input
          </Button>
          <CopyButton
            vscode={vscode}
            text={formattedHtml}
            label="Copy Result"
          />
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
            <H4>Formatted HTML Output</H4>
            <TextArea
              autoResize={true}
              fill={true}
              large={true}
              readOnly={true}
              value={formattedHtml}
              placeholder="Result will be displayed here..."
            />
          </div>
        </div>
      </Card>

      <Card className="example-card">
        <H4>Example Usage</H4>
        <p>Below is an example of how to use the HTML Prettier:</p>

        <div className="text-inputs">
          <div className="text-input">
            <H4>Example HTML Input</H4>
            <TextArea
              className="example-input"
              autoResize={true}
              fill={true}
              large={true}
              readOnly={true}
              value={`<div><h1>Hello World</h1><p>This is an example.</p></div>`}
            />
          </div>
          <div className="text-input">
            <H4>Expected Formatted Output</H4>
            <TextArea
              className="example-output"
              autoResize={true}
              fill={true}
              large={true}
              readOnly={true}
              value={`<div>\n  <h1>Hello World</h1>\n  <p>This is an example.</p>\n</div>`}
            />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default HtmlPrettier;
