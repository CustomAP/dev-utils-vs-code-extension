import React, { useState } from "react";
import { Button, TextArea, Card, H4 } from "@blueprintjs/core";
import "./Base64ToImage.css";
import Header from "../common/Header";

interface Base64ToImageProps {
  vscode: any;
}

const Base64ToImage: React.FC<Base64ToImageProps> = ({ vscode = null }) => {
  const [base64String, setBase64String] = useState<string>("");
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>("downloaded_image");

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const base64 = e.target.value;
    setBase64String(base64);

    if (base64.startsWith("data:image")) {
      setImageSrc(base64);
    } else {
      setImageSrc(null);
    }
  };

  const handleClear = () => {
    setBase64String("");
    setImageSrc(null);
  };

  const handleDownload = () => {
    if (imageSrc) {
      vscode.postMessage({
        type: "downloadImage",
        base64Data: imageSrc,
        fileName: `${fileName}.png`, // Adjust the file extension based on the image type
      });
    }
  };

  return (
    <div className="holder">
      <Header title="Base64 to Image Converter" />
      <Card className="input-card">
        {imageSrc && (
          <>
            <H4>Image Output</H4>
            <div className="image-preview">
              <img src={imageSrc} alt="Converted from Base64" />
            </div>
          </>
        )}
        <div>
          <Button
            className="clear-button"
            intent="danger"
            onClick={handleClear}
          >
            Clear Input
          </Button>
          {imageSrc && (
            <Button
              className="download-button"
              intent="success"
              onClick={handleDownload}
            >
              Download Image
            </Button>
          )}
        </div>
        <H4>Base64 Input</H4>
        <TextArea
          autoResize={true}
          fill={true}
          large={true}
          value={base64String}
          onChange={handleInputChange}
          placeholder="Paste Base64 string here..."
        />
      </Card>
    </div>
  );
};

export default Base64ToImage;
