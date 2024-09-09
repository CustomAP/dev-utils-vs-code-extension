import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CardGrid from "./home/CardGrid";
import JsonToCsv from "./utils/json_to_csv/JsonToCsv";
import CsvToJson from "./utils/csv_to_json/CsvToJson";

const App = () => {
  return (
    <div className="bp5-dark">
      <Router>
        <Routes>
          <Route path="/" element={<CardGrid />} />
          <Route path="/util/csv_to_json" element={<CsvToJson />} />
          <Route path="/util/json_to_csv" element={<JsonToCsv />} />
          <Route path="*" element={<CardGrid />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
