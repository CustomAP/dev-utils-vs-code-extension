import { Button } from "@blueprintjs/core";
import "./CopyButton.css";

interface CopyButtonProps {
  text: string;
  label: string;
}

const vscode = (window as any).acquireVsCodeApi();

const handleCopy = (text: string) => {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      vscode.postMessage({ type: "copy", text: text }, "*");
    })
    .catch((err) => {
      console.error("Failed to copy: ", err);
    });
};

const CopyButton: React.FC<CopyButtonProps> = ({ text = "", label = "" }) => {
  return (
    <Button
      className="copy-button"
      intent="success"
      onClick={() => handleCopy(text)}
    >
      {label}
    </Button>
  );
};

export default CopyButton;
