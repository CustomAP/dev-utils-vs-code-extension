import React, { useState } from "react";
import { Button, TextArea, Card, H4 } from "@blueprintjs/core";
import "react-diff-view/style/index.css";
import "./DiffChecker.css";
import Header from "../common/Header";
import ReactDiffViewer from "react-diff-viewer-continued";

interface DiffCheckerProps {
  initialText1?: string;
  initialText2?: string;
  vscode: any;
}

const DiffChecker: React.FC<DiffCheckerProps> = ({
  initialText1 = "",
  initialText2 = "",
  vscode = null,
}) => {
  const [text1, setText1] = useState<string>(initialText1);
  const [text2, setText2] = useState<string>(initialText2);

  const handleText1Change = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText1(e.target.value);
  };

  const handleText2Change = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText2(e.target.value);
  };

  const handleClear = () => {
    setText1("");
    setText2("");
  };

  return (
    <div className="holder">
      <Header title="Diff Checker" />
      <Card className="input-card">
        <H4>Text 1</H4>
        <TextArea
          autoResize={true}
          fill={true}
          large={true}
          value={text1}
          onChange={handleText1Change}
          placeholder="Enter first text here..."
        />
        <H4>Text 2</H4>
        <TextArea
          autoResize={true}
          fill={true}
          large={true}
          value={text2}
          onChange={handleText2Change}
          placeholder="Enter second text here..."
        />
        <div>
          <Button
            className="clear-button"
            intent="danger"
            onClick={handleClear}
          >
            Clear Input
          </Button>
        </div>

        <H4>Diff Output</H4>
        <ReactDiffViewer oldValue={text1} newValue={text2} splitView={true} />
      </Card>

      <Card className="example-card">
        <H4>How to Use the Diff Checker</H4>
        <p>
          To compare two blocks of text and view their differences, follow these
          steps:
        </p>
        <ol>
          <li>Enter the first block of text in the "Text 1" area.</li>
          <li>Enter the second block of text in the "Text 2" area.</li>
          <li>
            Click the "Clear Input" button if you want to reset both text areas.
          </li>
          <li>
            The differences between the two texts will be displayed in the "Diff
            Output" section below, highlighting additions, deletions, and
            changes.
          </li>
        </ol>
      </Card>
    </div>
  );
};

export default DiffChecker;
