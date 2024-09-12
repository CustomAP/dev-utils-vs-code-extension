import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CardGrid from "./home/CardGrid";
import JsonToCsv from "./utils/json_to_csv/JsonToCsv";
import CsvToJson from "./utils/csv_to_json/CsvToJson";
import JsonPrettier from "./utils/json_prettier/JsonPrettier";
import Base64Encoder from "./utils/base64encoder/Base64Encoder";
import Base64Decoder from "./utils/base64decoder/Base64Decoder";
import YamlToJson from "./utils/yaml_to_json/YamlToJson";
import JsonToYaml from "./utils/json_to_yaml/JsonToYaml";
import UrlEncoder from "./utils/url_encoder/UrlEncoder";
import UrlDecoder from "./utils/url_decoder/UrlDecoder";
import TimestampToDate from "./utils/timestamp_to_date/TimestampToDate";
import UrlParamsToJson from "./utils/url_params_to_json/UrlParamsToJson";
import HexToRgb from "./utils/hex_to_rgb/HexToRgb";
import RgbToHex from "./utils/rgb_to_hex/RgbToHex";
import ImageToBase64 from "./utils/image_to_base64/ImageToBase64";
import Base64ToImage from "./utils/base64_to_image/Base64ToImage";
import RegexTester from "./utils/regex_tester/RegexTester";
import LoremIpsumGenerator from "./utils/lorem_ipsum_generator/LoremIpsumGenerator";
import DiffChecker from "./utils/diff_checker/DiffChecker";
import BackslashEscaperUnescaper from "./utils/backslash_escaper_unescaper/BackslashEscaperUnescaper";
import JsonEscaperUnescaper from "./utils/json_escaper_unescaper/JsonEscaperUnescaper";

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
          <Route
            path="/util/yaml_to_json"
            element={<YamlToJson vscode={vscode} />}
          />
          <Route
            path="/util/json_to_yaml"
            element={<JsonToYaml vscode={vscode} />}
          />
          <Route
            path="/util/url_encoder"
            element={<UrlEncoder vscode={vscode} />}
          />
          <Route
            path="/util/url_decoder"
            element={<UrlDecoder vscode={vscode} />}
          />
          <Route
            path="/util/timestamp_to_date"
            element={<TimestampToDate vscode={vscode} />}
          />
          <Route
            path="/util/url_params_to_json"
            element={<UrlParamsToJson vscode={vscode} />}
          />
          <Route
            path="/util/hex_to_rgb"
            element={<HexToRgb vscode={vscode} />}
          />
          <Route
            path="/util/rgb_to_hex"
            element={<RgbToHex vscode={vscode} />}
          />
          <Route
            path="/util/image_to_base64"
            element={<ImageToBase64 vscode={vscode} />}
          />
          <Route
            path="/util/base64_to_image"
            element={<Base64ToImage vscode={vscode} />}
          />
          <Route
            path="/util/regex_tester"
            element={<RegexTester vscode={vscode} />}
          />
          <Route
            path="/util/lorem_ipsum_generator"
            element={<LoremIpsumGenerator vscode={vscode} />}
          />
          <Route
            path="/util/diff_checker"
            element={<DiffChecker vscode={vscode} />}
          />
          <Route
            path="/util/backslash_escaper_unescaper"
            element={<BackslashEscaperUnescaper vscode={vscode} />}
          />
          <Route
            path="/util/json_escaper_unescaper"
            element={<JsonEscaperUnescaper vscode={vscode} />}
          />
          <Route path="*" element={<CardGrid vscode={vscode} />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
