import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CardGrid from "./home/CardGrid"; // The card grid component
import CSVToJSON from "./tools/csv_to_json"; // The detail page for individual cards

const App = () => {
  return (
    <div className="bp5-dark">
      <Router>
        <Routes>
          <Route path="/" element={<CardGrid />} />
          <Route path="/card/csv_to_json" element={<CSVToJSON />} />
          <Route path="*" element={<CardGrid />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
