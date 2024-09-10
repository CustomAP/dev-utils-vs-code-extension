import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CardGrid from "./home/CardGrid";
import JsonToCsv from "./utils/json_to_csv/JsonToCsv";
import CsvToJson from "./utils/csv_to_json/CsvToJson";
import JsonPrettier from "./utils/json_prettier/JsonPrettier";
import Base64Encoder from "./utils/base64encoder/Base64Encoder";
import Base64Decoder from "./utils/base64decoder/Base64Decoder";

const vscode = (window as any).acquireVsCodeApi();

const App = () => {
  return (
    <div className="bp5-dark">
      <Router>
        <Routes>
          <Route path="/" element={<CardGrid vscode={vscode} />} />
          <Route
            path="/util/csv_to_json"
            element={<CsvToJson vscode={vscode} />}
          />
          <Route
            path="/util/json_to_csv"
            element={<JsonToCsv vscode={vscode} />}
          />
          <Route
            path="/util/json_prettier"
            element={<JsonPrettier vscode={vscode} />}
          />
          <Route
            path="/util/base64_encoder"
            element={<Base64Encoder vscode={vscode} />}
          />
          <Route
            path="/util/base64_decoder"
            element={<Base64Decoder vscode={vscode} />}
          />
          <Route path="*" element={<CardGrid vscode={vscode} />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
