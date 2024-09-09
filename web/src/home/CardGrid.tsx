import React from "react";
import { Card, Elevation } from "@blueprintjs/core";
import { useNavigate } from "react-router-dom";
import "./CardGrid.css";

const CardGrid = () => {
  const navigate = useNavigate();

  const handleCardClick = (id: number) => {
    navigate(`/card/${id}`);
  };

  return (
    <div className="card-grid">
      {[1, 2, 3, 4, 5, 6].map((item) => (
        <Card
          key={item}
          elevation={Elevation.TWO}
          className="card-item"
          interactive={true}
          onClick={() => handleCardClick(item)}
        >
          <h3>Card {item}</h3>
          <p>This is a description for card {item}.</p>
        </Card>
      ))}
    </div>
  );
};

export default CardGrid;
