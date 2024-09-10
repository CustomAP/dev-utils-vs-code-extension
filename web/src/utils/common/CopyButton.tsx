import { Button } from "@blueprintjs/core";
import "./CopyButton.css";

interface CopyButtonProps {
  text: string;
  label: string;
  vscode: any;
}

const handleCopy = (text: string, vscode: any) => {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      vscode.postMessage({ type: "copy", text: text }, "*");
    })
    .catch((err) => {
      console.error("Failed to copy: ", err);
    });
};

const CopyButton: React.FC<CopyButtonProps> = ({
  text = "",
  label = "",
  vscode = null,
}) => {
  return (
    <Button
      className="copy-button"
      intent="success"
      onClick={() => handleCopy(text, vscode)}
    >
      {label}
    </Button>
  );
};

export default CopyButton;
