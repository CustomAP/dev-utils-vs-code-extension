import React from "react";
import { Card, Elevation } from "@blueprintjs/core";
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
  const navigate = useNavigate();

  const handleCardClick = (id: string) => {
    navigate(`/card/${id}`);
  };

  return (
    <div className="card-grid">
      {tools.map((item) => (
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
  );
};

export default CardGrid;
