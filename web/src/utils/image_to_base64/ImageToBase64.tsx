import React, { useState } from "react";
import {
  Button,
  FileInput,
  TextArea,
  Card,
  H4,
  Elevation,
} from "@blueprintjs/core";
import "./ImageToBase64.css";
import Header from "../common/Header";
import CopyButton from "../common/CopyButton";

interface ImageToBase64Props {
  vscode: any;
}

const ImageToBase64: React.FC<ImageToBase64Props> = ({ vscode = null }) => {
  const [base64String, setBase64String] = useState<string>("");
  const [fileName, setFileName] = useState<string>("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setBase64String(base64);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClear = () => {
    setBase64String("");
    setFileName("");
  };

  return (
    <div className="holder">
      <Header title="Image to Base64 Converter" />
      <Card className="input-card" elevation={Elevation.TWO}>
        <H4>Select Image</H4>
        <FileInput
          text={fileName || "Choose file..."}
          onInputChange={handleFileChange}
        />
        <div>
          <Button
            className="clear-button"
            intent="danger"
            onClick={handleClear}
          >
            Clear
          </Button>
          <CopyButton vscode={vscode} text={base64String} label="Copy Result" />
        </div>

        <H4>Base64 Output</H4>
        <TextArea
          autoResize={true}
          fill={true}
          large={true}
          readOnly={true}
          value={base64String}
          placeholder="Base64 string will appear here..."
        />
      </Card>
    </div>
  );
};

export default ImageToBase64;
