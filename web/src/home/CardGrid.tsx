import React, { useState } from "react";
import { Card, Elevation, InputGroup } from "@blueprintjs/core";
import { useNavigate } from "react-router-dom";
import "./CardGrid.css";

const tools = [
  {
    id: "csv_to_json",
    name: "CSV to JSON",
    description: "Convert CSV to JSON",
  },
  {
    id: "json_to_csv",
    name: "JSON to CSV",
    description: "Convert JSON to CSV",
  },
];

const CardGrid = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleCardClick = (id: string) => {
    navigate(`/card/${id}`);
  };

  const filteredTools = tools.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="card-grid-container">
      <InputGroup
        placeholder="Search..."
        leftIcon="search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-bar"
      />

      <div className="card-grid">
        {filteredTools.map((item) => (
          <Card
            key={item.id}
            elevation={Elevation.TWO}
            className="card-item"
            interactive={true}
            onClick={() => handleCardClick(item.id)}
          >
            <h3>{item.name}</h3>
            <p>{item.description}</p>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CardGrid;
