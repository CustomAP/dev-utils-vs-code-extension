import React, { useState } from "react";
import { Button, TextArea, Card, H4 } from "@blueprintjs/core";
import "./TimestampToDate.css";
import Header from "../common/Header";
import CopyButton from "../common/CopyButton";

interface TimestampToDateProps {
  initialTimestamp?: string;
  vscode: any;
}

const TimestampToDate: React.FC<TimestampToDateProps> = ({
  initialTimestamp = "",
  vscode = null,
}) => {
  const [timestampText, setTimestampText] = useState<string>(initialTimestamp);
  const [dateText, setDateText] = useState<string>("");

  const convertTimestampToDate = (timestampStr: string) => {
    const timestamp = Number(timestampStr);
    if (!isNaN(timestamp)) {
      const date = new Date(timestamp * 1000); // Convert seconds to milliseconds
      setDateText(date.toUTCString());
    } else {
      setDateText("Invalid timestamp");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newTimestampText = e.target.value;
    setTimestampText(newTimestampText);
    convertTimestampToDate(newTimestampText);
  };

  const handleClear = () => {
    setTimestampText("");
    setDateText("");
  };

  return (
    <div className="holder">
      <Header title="Timestamp to Date Converter" />
      <Card className="input-card">
        <div>
          <Button
            className="clear-button"
            intent="danger"
            onClick={handleClear}
          >
            Clear Input
          </Button>
          <CopyButton vscode={vscode} text={dateText} label="Copy Result" />
        </div>

        <div className="text-inputs">
          <div className="text-input">
            <H4>Timestamp Input</H4>
            <TextArea
              autoResize={true}
              fill={true}
              large={true}
              value={timestampText}
              onChange={handleInputChange}
              placeholder="Enter Unix timestamp here..."
            />
          </div>

          <div className="text-input">
            <H4>Date Output</H4>
            <TextArea
              autoResize={true}
              fill={true}
              large={true}
              readOnly={true}
              value={dateText}
              placeholder="Result will be displayed here..."
            />
          </div>
        </div>
      </Card>

      <Card className="example-card">
        <H4>Example Usage</H4>
        <p>
          Below is an example of how to use the Timestamp to Date Converter:
        </p>

        <div className="text-inputs">
          <div className="text-input">
            <H4>Example Timestamp Input</H4>
            <TextArea
              className="example-input"
              autoResize={true}
              fill={true}
              large={true}
              readOnly={true}
              value="1694006400"
            />
          </div>

          <div className="text-input">
            <H4>Expected Date Output</H4>
            <TextArea
              className="example-output"
              autoResize={true}
              fill={true}
              large={true}
              readOnly={true}
              value="Wed, 06 Sep 2023 13:20:00 GMT"
            />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default TimestampToDate;
