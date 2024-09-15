import React, { useState, useCallback } from "react";
import { Button, InputGroup, Card, H4 } from "@blueprintjs/core";
import "./RgbToHex.css";
import Header from "../common/Header";
import CopyButton from "../common/CopyButton";

interface RgbToHexProps {
  initialRed?: string;
  initialGreen?: string;
  initialBlue?: string;
  vscode: any;
}

const MemoizedHeader = React.memo(Header);

const MemoizedCopyButton = React.memo(CopyButton);

const RgbToHex: React.FC<RgbToHexProps> = ({
  initialRed = "",
  initialGreen = "",
  initialBlue = "",
  vscode = null,
}) => {
  const [red, setRed] = useState<string>(initialRed);
  const [green, setGreen] = useState<string>(initialGreen);
  const [blue, setBlue] = useState<string>(initialBlue);
  const [hex, setHex] = useState<string>("");

  const validateAndFormat = useCallback((value: string) => {
    const numericValue = value.replace(/[^0-9]/g, "");
    return numericValue.length > 3 ? numericValue.slice(0, 3) : numericValue;
  }, []);

  const rgbToHex = (r: string, g: string, b: string) => {
    const toHex = (num: number) =>
      num.toString(16).padStart(2, "0").toUpperCase();
    const redInt = parseInt(r, 10);
    const greenInt = parseInt(g, 10);
    const blueInt = parseInt(b, 10);

    if (
      isNaN(redInt) ||
      redInt < 0 ||
      redInt > 255 ||
      isNaN(greenInt) ||
      greenInt < 0 ||
      greenInt > 255 ||
      isNaN(blueInt) ||
      blueInt < 0 ||
      blueInt > 255
    ) {
      setHex("");
      return;
    }

    setHex(`#${toHex(redInt)}${toHex(greenInt)}${toHex(blueInt)}`);
  };

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, color: string) => {
      let newValue = validateAndFormat(e.target.value);

      if (parseInt(newValue, 10) > 255) {
        newValue = newValue.slice(0, 2);
      }

      if (color === "red") {
        setRed(newValue);
        rgbToHex(newValue, green, blue);
      }
      if (color === "green") {
        setGreen(newValue);
        rgbToHex(red, newValue, blue);
      }
      if (color === "blue") {
        setBlue(newValue);
        rgbToHex(red, green, newValue);
      }
    },
    [red, green, blue, validateAndFormat]
  );

  const handleClear = useCallback(() => {
    setRed("");
    setGreen("");
    setBlue("");
    setHex("");
  }, []);

  return (
    <div className="holder">
      <MemoizedHeader title="RGB to Hex Converter" />
      <Card className="input-card">
        <H4>RGB Input</H4>
        <div className="input-holder">
          <div className="input-container">
            <MemoizedInputGroup
              color="red"
              value={red}
              onChange={handleInputChange}
            />
            <MemoizedInputGroup
              color="green"
              value={green}
              onChange={handleInputChange}
            />
            <MemoizedInputGroup
              color="blue"
              value={blue}
              onChange={handleInputChange}
            />
          </div>
          <div
            className="color-preview"
            style={{ backgroundColor: hex || "#ffffff" }}
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
          <MemoizedCopyButton vscode={vscode} text={hex} label="Copy Result" />
        </div>

        <H4>Hex Output</H4>
        <InputGroup readOnly={true} value={hex} className="hex-field" />
      </Card>

      <Card className="example-card">
        <H4>Example Usage</H4>
        <p>Below is an example of how to use the RGB to Hex Converter:</p>

        <H4>Example RGB Input</H4>
        <div className="example-input">
          <InputGroup readOnly={true} value="Red: 255" className="rgb-field" />
          <InputGroup readOnly={true} value="Green: 87" className="rgb-field" />
          <InputGroup readOnly={true} value="Blue: 51" className="rgb-field" />
        </div>

        <H4>Expected Hex Output</H4>
        <InputGroup readOnly={true} value="#FF5733" />
      </Card>
    </div>
  );
};

const MemoizedInputGroup = React.memo(
  ({
    color,
    value,
    onChange,
  }: {
    color: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>, color: string) => void;
  }) => (
    <InputGroup
      type="text"
      fill={true}
      large={true}
      value={value}
      onChange={(e) => onChange(e, color)}
      placeholder={`${color.charAt(0).toUpperCase() + color.slice(1)} (0-255)`}
    />
  )
);

export default RgbToHex;
