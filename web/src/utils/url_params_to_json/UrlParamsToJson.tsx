import React, { useState } from "react";
import { Button, TextArea, Card, H4 } from "@blueprintjs/core";
import "./UrlParamsToJson.css";
import Header from "../common/Header";
import CopyButton from "../common/CopyButton";

interface UrlParamsToJsonProps {
  initialUrlParams?: string;
  vscode: any;
}

const UrlParamsToJson: React.FC<UrlParamsToJsonProps> = ({
  initialUrlParams = "",
  vscode = null,
}) => {
  const [urlParamsText, setUrlParamsText] = useState<string>(initialUrlParams);
  const [jsonText, setJsonText] = useState<string>("");

  const urlParamsToJson = (paramsStr: string) => {
    try {
      const urlSearchParams = new URLSearchParams(paramsStr);
      const paramsObject: { [key: string]: string } = {};
      urlSearchParams.forEach((value, key) => {
        paramsObject[key] = value;
      });
      setJsonText(JSON.stringify(paramsObject, null, 2));
    } catch (e) {
      setJsonText("Invalid query parameters");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newUrlParamsText = e.target.value;
    setUrlParamsText(newUrlParamsText);
    urlParamsToJson(newUrlParamsText);
  };

  const handleClear = () => {
    setUrlParamsText("");
    setJsonText("");
  };

  return (
    <div className="holder">
      <Header title="URL Query Parameters to JSON Converter" />
      <Card className="input-card">
        <H4>URL Query Parameters Input</H4>
        <TextArea
          autoResize={true}
          fill={true}
          large={true}
          value={urlParamsText}
          onChange={handleInputChange}
          placeholder="Enter URL query parameters here..."
        />
        <div>
          <Button
            className="clear-button"
            intent="danger"
            onClick={handleClear}
          >
            Clear Input
          </Button>
          <CopyButton vscode={vscode} text={jsonText} label="Copy Result" />
        </div>

        <H4>JSON Output</H4>
        <TextArea
          autoResize={true}
          fill={true}
          large={true}
          readOnly={true}
          value={jsonText}
        />
      </Card>
    </div>
  );
};

export default UrlParamsToJson;
