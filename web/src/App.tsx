import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CardGrid from "./home/CardGrid"; // The card grid component
import CardDetail from "./tools/CardDetail"; // The detail page for individual cards

const App = () => {
  return (
    <div className="bp5-dark">
      <Router>
        <Routes>
          <Route path="/" element={<CardGrid />} />
          <Route path="/card/:id" element={<CardDetail />} />
          <Route path="*" element={<CardGrid />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
