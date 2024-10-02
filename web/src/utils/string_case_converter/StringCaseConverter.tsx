import React, { useState } from "react";
import { Button, TextArea, Card, H4, HTMLSelect } from "@blueprintjs/core";
import "./StringCaseConverter.css";
import Header from "../common/Header";
import CopyButton from "../common/CopyButton";

interface StringCaseConverterProps {
  initialText?: string;
  vscode: any;
}

const StringCaseConverter: React.FC<StringCaseConverterProps> = ({
  initialText = "",
  vscode = null,
}) => {
  const [inputText, setInputText] = useState<string>(initialText);
  const [convertedText, setConvertedText] = useState<string>("");
  const [caseFormat, setCaseFormat] = useState<string>("camelCase");

  // Converts to camelCase
  const toCamelCase = (text: string) => {
    return text
      .replace(/([-_\s][a-z])/gi, (g) => g[1].toUpperCase()) // Converts following characters to uppercase
      .replace(/(^\w|\s\w)/g, (g) => g.trim().toLowerCase()); // Ensures the first character is lowercase
  };

  // Converts to snake_case
  const toSnakeCase = (text: string) => {
    return text
      .replace(/([a-z])([A-Z])/g, "$1_$2") // Splits camelCase/PascalCase to snake_case
      .replace(/[\s-]+/g, "_") // Replaces spaces and dashes with underscores
      .toLowerCase();
  };

  // Converts to PascalCase
  const toPascalCase = (text: string) => {
    return text.replace(/(^\w|[-_\s]\w)/g, (g) =>
      g.replace(/[-_\s]/, "").toUpperCase()
    ); // Capitalizes each word and removes separators
  };

  // Converts to kebab-case
  const toKebabCase = (text: string) => {
    return text
      .replace(/([a-z])([A-Z])/g, "$1-$2") // Splits camelCase/PascalCase to kebab-case
      .replace(/[\s_]+/g, "-") // Replaces spaces and underscores with dashes
      .toLowerCase();
  };

  // Converts to SCREAM-KEBAB (kebab-case in uppercase)
  const toScreamKebabCase = (text: string) => {
    return text
      .replace(/([a-z])([A-Z])/g, "$1-$2") // Splits camelCase/PascalCase to kebab-case
      .replace(/[\s_]+/g, "-") // Replaces spaces and underscores with dashes
      .toUpperCase();
  };

  // Converts to CONSTANT_CASE (snake_case in uppercase)
  const toConstantCase = (text: string) => {
    return text
      .replace(/([a-z])([A-Z])/g, "$1_$2") // Splits camelCase/PascalCase to CONSTANT_CASE
      .replace(/[\s-]+/g, "_") // Replaces spaces and dashes with underscores
      .toUpperCase();
  };

  // Converts to Title Case
  const toTitleCase = (text: string) => {
    return text.toLowerCase().replace(/(?:^|\s)\w/g, (g) => g.toUpperCase()); // Capitalizes the first letter of each word
  };

  // Converts to Sentence case
  const toSentenceCase = (text: string) => {
    return text
      .toLowerCase()
      .replace(/(^\s*\w|[\.\!\?]\s*\w)/g, (g) => g.toUpperCase()); // Capitalizes the first letter of the sentence
  };

  // Converts to dot.case
  const toDotCase = (text: string) => {
    return text
      .replace(/([a-z])([A-Z])/g, "$1.$2") // Splits camelCase/PascalCase to dot.case
      .replace(/[\s_-]+/g, ".") // Replaces spaces, underscores, and hyphens with dots
      .toLowerCase();
  };

  // Converts to path/case (similar to kebab-case but uses slashes)
  const toPathCase = (text: string) => {
    return text
      .replace(/([a-z])([A-Z])/g, "$1/$2") // Splits camelCase/PascalCase to path/case
      .replace(/[\s_-]+/g, "/") // Replaces spaces, underscores, and hyphens with slashes
      .toLowerCase();
  };

  // Converts to lowercase
  const toLowerCase = (text: string) => {
    return text.toLowerCase();
  };

  // Converts to UPPERCASE
  const toUpperCase = (text: string) => {
    return text.toUpperCase();
  };

  const convertText = (text: string, caseFormat: string) => {
    switch (caseFormat) {
      case "camelCase":
        setConvertedText(toCamelCase(text));
        break;
      case "snake_case":
        setConvertedText(toSnakeCase(text));
        break;
      case "PascalCase":
        setConvertedText(toPascalCase(text));
        break;
      case "kebab-case":
        setConvertedText(toKebabCase(text));
        break;
      case "SCREAM-KEBAB":
        setConvertedText(toScreamKebabCase(text));
        break;
      case "CONSTANT_CASE":
        setConvertedText(toConstantCase(text));
        break;
      case "Title Case":
        setConvertedText(toTitleCase(text));
        break;
      case "Sentence case":
        setConvertedText(toSentenceCase(text));
        break;
      case "dot.case":
        setConvertedText(toDotCase(text));
        break;
      case "path/case":
        setConvertedText(toPathCase(text));
        break;
      case "lowercase":
        setConvertedText(toLowerCase(text));
        break;
      case "UPPERCASE":
        setConvertedText(toUpperCase(text));
        break;
      default:
        setConvertedText(text);
        break;
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setInputText(newText);
    convertText(newText, caseFormat);
  };

  const handleFormatChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newFormat = e.currentTarget.value;
    setCaseFormat(newFormat);
    convertText(inputText, newFormat);
  };

  const handleClear = () => {
    setInputText("");
    setConvertedText("");
  };

  return (
    <div className="holder">
      <Header title="String Case Converter" />
      <Card className="input-card">
        <HTMLSelect
          options={[
            { label: "camelCase", value: "camelCase" },
            { label: "snake_case", value: "snake_case" },
            { label: "PascalCase", value: "PascalCase" },
            { label: "kebab-case", value: "kebab-case" },
            { label: "SCREAM-KEBAB", value: "SCREAM-KEBAB" },
            { label: "CONSTANT_CASE", value: "CONSTANT_CASE" },
            { label: "Title Case", value: "Title Case" },
            { label: "Sentence case", value: "Sentence case" },
            { label: "dot.case", value: "dot.case" },
            { label: "path/case", value: "path/case" },
            { label: "lowercase", value: "lowercase" },
            { label: "UPPERCASE", value: "UPPERCASE" },
          ]}
          value={caseFormat}
          onChange={handleFormatChange}
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
            text={convertedText}
            label="Copy Result"
          />
        </div>

        <div className="text-inputs">
          <div className="text-input">
            <H4>Text Input</H4>
            <TextArea
              autoResize={true}
              fill={true}
              large={true}
              value={inputText}
              onChange={handleInputChange}
              placeholder="Enter text to convert..."
            />
          </div>

          <div className="text-input">
            <H4>Converted Output</H4>
            <TextArea
              autoResize={true}
              fill={true}
              large={true}
              readOnly={true}
              value={convertedText}
              placeholder="Result will be displayed here..."
            />
          </div>
        </div>
      </Card>

      <Card className="example-card">
        <H4>How to Use the String Case Converter</H4>
        <p>To convert text into different case formats, follow these steps:</p>
        <ol>
          <li>Enter the text you want to convert in the "Text Input" area.</li>
          <li>
            Select the desired case format from the dropdown menu. Available
            formats include camelCase, snake_case, PascalCase, kebab-case,
            SCREAM-KEBAB, CONSTANT_CASE, Title Case, Sentence case, dot.case,
            path/case, lowercase, and UPPERCASE.
          </li>
          <li>
            The text will be automatically converted to the selected format and
            displayed in the "Converted Output" area.
          </li>
          <li>
            If you want to reset the text and start over, click the "Clear
            Input" button.
          </li>
          <li>
            You can copy the converted text to your clipboard using the "Copy
            Result" button.
          </li>
        </ol>
      </Card>
    </div>
  );
};

export default StringCaseConverter;
