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

      <Card className="example-card">
        <H4>How to Use the Base64 Image Converter</H4>
        <p>
          To convert an image to a Base64-encoded string, follow these simple
          steps:
        </p>
        <ol>
          <li>
            Select the image you want to convert by clicking the upload button.
          </li>
          <li>
            The converter will automatically process the image and generate a
            Base64-encoded string.
          </li>
          <li>
            Copy the generated string from the output area for use in your
            application.
          </li>
        </ol>
      </Card>
    </div>
  );
};

export default ImageToBase64;
