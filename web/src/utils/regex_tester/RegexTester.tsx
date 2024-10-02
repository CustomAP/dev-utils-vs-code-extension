import React, { useState } from "react";
import {
  Button,
  TextArea,
  Card,
  H4,
  InputGroup,
  Callout,
} from "@blueprintjs/core";
import "./RegexTester.css";
import Header from "../common/Header";

interface RegexTesterProps {
  initialPattern?: string;
  initialText?: string;
  vscode: any;
}

const RegexTester: React.FC<RegexTesterProps> = ({
  initialPattern = "",
  initialText = "",
  vscode = null,
}) => {
  const [pattern, setPattern] = useState<string>(initialPattern);
  const [testString, setTestString] = useState<string>(initialText);
  const [result, setResult] = useState<string>("");
  const [matchCount, setMatchCount] = useState<number | null>(null);

  const testRegex = (pattern: string, text: string) => {
    try {
      const regex = new RegExp(pattern, "g");
      const matches = [...text.matchAll(regex)];

      if (matches.length === 0) {
        setResult("No matches found");
        setMatchCount(0);
      } else {
        let lastIndex = 0;
        let highlightedText = "";

        matches.forEach((match) => {
          const matchStart = match.index!;
          const matchEnd = matchStart + match[0].length;

          // Add text before the match
          highlightedText += text.slice(lastIndex, matchStart);

          // Add the match wrapped in a <mark> tag
          highlightedText += `<mark>${match[0]}</mark>`;

          // Update the lastIndex to the end of the current match
          lastIndex = matchEnd;
        });

        // Add any remaining text after the last match
        highlightedText += text.slice(lastIndex);

        // Replace newline characters with <br> tags for proper display
        highlightedText = highlightedText.replace(/\n/g, "<br>");

        setResult(highlightedText);
        setMatchCount(matches.length);
      }
    } catch (e) {
      setResult("Invalid regular expression");
      setMatchCount(null);
    }
  };

  const handlePatternChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPattern = e.target.value;
    setPattern(newPattern);
    testRegex(newPattern, testString);
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setTestString(newText);
    testRegex(pattern, newText);
  };

  const handleClear = () => {
    setPattern("");
    setTestString("");
    setResult("");
    setMatchCount(null);
  };

  return (
    <div className="holder">
      <Header title="Regex Tester" />
      <Card className="input-card">
        <H4>Regex Pattern</H4>
        <InputGroup
          value={pattern}
          className="input-text"
          onChange={handlePatternChange}
          placeholder="Enter regex pattern here..."
        />

        <div className="text-inputs">
          <div className="text-input">
            <H4>Test String</H4>
            <TextArea
              autoResize={true}
              fill={true}
              large={true}
              value={testString}
              onChange={handleTextChange}
              placeholder="Enter test string here..."
            />
          </div>

          <div className="text-input">
            <H4>Result</H4>
            {result != null && result !== "" ? (
              <div
                className="regex-result"
                dangerouslySetInnerHTML={{ __html: result }}
              />
            ) : (
              <TextArea
                autoResize={true}
                fill={true}
                large={true}
                readOnly={true}
                value={result}
                onChange={handleTextChange}
                placeholder="Result will be displayed here..."
              />
            )}
          </div>
        </div>

        {matchCount !== null && (
          <Callout>
            {matchCount} {matchCount === 1 ? "match" : "matches"} found
          </Callout>
        )}
        <div>
          <Button
            className="clear-button"
            intent="danger"
            onClick={handleClear}
          >
            Clear
          </Button>
        </div>
      </Card>

      <Card className="example-card">
        <H4>Example Usage</H4>
        <p>Below is an example of how to use the Regex Tester:</p>

        <H4>Example Regex Pattern</H4>
        <InputGroup
          className="example-input"
          value={`\\b\\d{3}-\\d{2}-\\d{4}\\b`}
          readOnly={true}
        />

        <H4>Example Test String</H4>
        <TextArea
          className="example-input"
          autoResize={true}
          fill={true}
          large={true}
          value={`Here are some SSNs: 123-45-6789, 987-65-4321. The following is not a valid SSN: 123-456-7890.`}
          readOnly={true}
        />

        <H4>Expected Result</H4>
        <Callout className="example-callout">2 matches found</Callout>
        <div
          dangerouslySetInnerHTML={{
            __html: `Here are some SSNs: <mark>123-45-6789</mark>, <mark>987-65-4321</mark>. The following is not a valid SSN: 123-456-7890.`,
          }}
        />
      </Card>
    </div>
  );
};

export default RegexTester;
