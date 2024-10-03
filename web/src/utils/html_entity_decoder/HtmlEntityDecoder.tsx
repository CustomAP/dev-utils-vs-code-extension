import React, { useState } from "react";
import { Button, TextArea, Card, H4 } from "@blueprintjs/core";
import { html as beautifyHtml } from "js-beautify";
import "./HtmlEntityDecoder.css";
import Header from "../common/Header";
import CopyButton from "../common/CopyButton";

interface HtmlEntityDecoderProps {
  initialText?: string;
  vscode: any;
}

const HtmlEntityDecoder: React.FC<HtmlEntityDecoderProps> = ({
  initialText = "",
  vscode = null,
}) => {
  const [inputText, setInputText] = useState<string>(initialText);
  const [decodedText, setDecodedText] = useState<string>("");

  const decodeHtmlEntities = (text: string) => {
    const textarea = document.createElement("textarea");
    textarea.innerHTML = text;
    const result = beautifyHtml(textarea.value, {
      indent_size: 2,
      preserve_newlines: true,
      max_preserve_newlines: 1,
      end_with_newline: true,
    });
    setDecodedText(result);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setInputText(newText);
    decodeHtmlEntities(newText);
  };

  const handleClear = () => {
    setInputText("");
    setDecodedText("");
  };

  const exampleEncoded = `&lt;div class=&quot;container&quot;&gt;
  &lt;h1&gt;Welcome to My Website&lt;/h1&gt;
  &lt;p&gt;This is a sample text with a &lt;a href=&quot;https://example.com&quot;&gt;link&lt;/a&gt; &amp; special characters: &lt; &gt; &quot; &#39;&lt;/p&gt;
&lt;/div&gt;`;

  const exampleDecoded = `<div class="container">
  <h1>Welcome to My Website</h1>
  <p>This is a sample text with a <a href="https://example.com">link</a> & special characters: < > " '</p>
</div>`;

  return (
    <div className="holder">
      <Header title="HTML Entity Decoder" />
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
            <H4>Encoded Input</H4>
            <TextArea
              autoResize={true}
              fill={true}
              large={true}
              value={inputText}
              onChange={handleInputChange}
              placeholder="Paste encoded text here..."
            />
          </div>

          <div className="text-input">
            <H4>Decoded Output</H4>
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
        <p>Below is an example of how to use the HTML entity decoder:</p>

        <div className="text-inputs">
          <div className="text-input">
            <H4>Example Encoded Input</H4>
            <TextArea
              className="example-text"
              autoResize={true}
              fill={true}
              large={true}
              readOnly={true}
              value={exampleEncoded}
            />
          </div>

          <div className="text-input">
            <H4>Expected Decoded Output</H4>
            <TextArea
              autoResize={true}
              fill={true}
              large={true}
              readOnly={true}
              value={exampleDecoded}
              className="example-decoded"
            />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default HtmlEntityDecoder;
