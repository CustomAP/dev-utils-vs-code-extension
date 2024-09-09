import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CardGrid from "./home/CardGrid"; // The card grid component
import JsonToCsv from "./tools/json_to_csv"; // The detail page for individual cards

const App = () => {
  return (
    <div className="bp5-dark">
      <Router>
        <Routes>
          <Route path="/" element={<CardGrid />} />
          <Route path="/card/json_to_csv" element={<JsonToCsv />} />
          <Route path="*" element={<CardGrid />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
