import React, { useState } from "react";
import { Button, TextArea, Card, H4 } from "@blueprintjs/core";
import "react-diff-view/style/index.css";
import "./DiffChecker.css";
import Header from "../common/Header";
import CopyButton from "../common/CopyButton";
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
    </div>
  );
};

export default DiffChecker;
