import React, { useState } from "react";
import { Button, TextArea, Card, H4 } from "@blueprintjs/core";
import { jwtDecode } from "jwt-decode";
import "./JwtDecoder.css";
import Header from "../common/Header";
import CopyButton from "../common/CopyButton";

interface JwtDecoderProps {
  initialJwt?: string;
  vscode: any;
}

const JwtDecoder: React.FC<JwtDecoderProps> = ({
  initialJwt = "",
  vscode = null,
}) => {
  const [jwtText, setJwtText] = useState<string>(initialJwt);
  const [decodedHeader, setDecodedHeader] = useState<string>("");
  const [decodedPayload, setDecodedPayload] = useState<string>("");

  const decodeJwt = (jwtStr: string) => {
    try {
      const header = jwtDecode(jwtStr, { header: true });
      setDecodedHeader(JSON.stringify(header, null, 2));

      const decodedPayload = jwtDecode(jwtStr);
      setDecodedPayload(JSON.stringify(decodedPayload, null, 2));
    } catch (e) {
      setDecodedHeader("Invalid JWT format");
      setDecodedPayload("Invalid JWT format");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newJwtText = e.target.value;
    setJwtText(newJwtText);
    decodeJwt(newJwtText);
  };

  const handleClear = () => {
    setJwtText("");
    setDecodedHeader("");
    setDecodedPayload("");
  };

  return (
    <div className="holder">
      <Header title="JWT Decoder" />
      <Card className="input-card">
        <H4>JWT Input</H4>
        <TextArea
          autoResize={true}
          fill={true}
          large={true}
          value={jwtText}
          onChange={handleInputChange}
          placeholder="Paste JWT here..."
        />
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
            text={decodedPayload}
            label="Copy Result"
          />
        </div>

        <H4>Decoded Header</H4>
        <TextArea
          autoResize={true}
          fill={true}
          large={true}
          readOnly={true}
          value={decodedHeader}
        />

        <H4>Decoded Payload</H4>
        <TextArea
          autoResize={true}
          fill={true}
          large={true}
          readOnly={true}
          value={decodedPayload}
        />
      </Card>
    </div>
  );
};

export default JwtDecoder;
