import React, { useState } from "react";
import { Button, TextArea, Card, H4, InputGroup } from "@blueprintjs/core";
import "./HexToRgb.css";
import Header from "../common/Header";
import CopyButton from "../common/CopyButton";

interface HexToRgbProps {
  initialText?: string;
  vscode: any;
}

const HexToRgb: React.FC<HexToRgbProps> = ({
  initialText = "",
  vscode = null,
}) => {
  const [inputText, setInputText] = useState<string>(initialText);
  const [red, setRed] = useState<string>("");
  const [green, setGreen] = useState<string>("");
  const [blue, setBlue] = useState<string>("");

  const hexToRgb = (hex: string) => {
    // Remove hash if present
    hex = hex.replace(/^#/, "");

    // Check for valid hex format
    if (hex.length !== 6) {
      setRed("Invalid Hex Code");
      setGreen("Invalid Hex Code");
      setBlue("Invalid Hex Code");
      return;
    }

    // Convert hex to RGB
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    setRed(r.toString());
    setGreen(g.toString());
    setBlue(b.toString());
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setInputText(newText);
    hexToRgb(newText);
  };

  const handleClear = () => {
    setInputText("");
    setRed("");
    setGreen("");
    setBlue("");
  };

  return (
    <div className="holder">
      <Header title="Hex to RGB Converter" />
      <Card className="input-card">
        <H4>Hex Input</H4>
        <div className="input-container">
          <TextArea
            autoResize={true}
            fill={true}
            large={true}
            value={inputText}
            onChange={handleInputChange}
            placeholder="Enter hex color code..."
          />
          <div
            className="color-preview"
            style={{
              backgroundColor:
                inputText && inputText.replace(/^#/, "").length === 6
                  ? `#${inputText.replace(/^#/, "")}`
                  : "#ffffff",
            }}
          ></div>
        </div>
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
            text={`RGB(${red}, ${green}, ${blue})`}
            label="Copy Result"
          />
        </div>

        <H4>RGB Output</H4>
        <div className="rgb-output">
          <InputGroup
            readOnly={true}
            value={`Red: ${red}`}
            className="rgb-field"
          />
          <InputGroup
            readOnly={true}
            value={`Green: ${green}`}
            className="rgb-field"
          />
          <InputGroup
            readOnly={true}
            value={`Blue: ${blue}`}
            className="rgb-field"
          />
        </div>
      </Card>

      <Card className="example-card">
        <H4>Example Usage</H4>
        <p>Below is an example of how to use the Hex to RGB Converter:</p>

        <H4>Example Hex Input</H4>
        <TextArea
          className="example-input"
          autoResize={true}
          fill={true}
          large={true}
          readOnly={true}
          value="#FF5733"
        />

        <H4>Expected RGB Output</H4>
        <div className="rgb-output">
          <InputGroup readOnly={true} value="Red: 255" className="rgb-field" />
          <InputGroup readOnly={true} value="Green: 87" className="rgb-field" />
          <InputGroup readOnly={true} value="Blue: 51" className="rgb-field" />
        </div>
      </Card>
    </div>
  );
};

export default HexToRgb;
