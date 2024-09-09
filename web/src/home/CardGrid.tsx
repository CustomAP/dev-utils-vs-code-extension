import React, { useState } from "react";
import { Card, Elevation, InputGroup, H2 } from "@blueprintjs/core";
import { useNavigate } from "react-router-dom";
import "./CardGrid.css";
import { tools } from "./tools_list";

const CardGrid = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleCardClick = (id: string) => {
    navigate(`/util/${id}`);
  };

  const filteredTools = tools.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="dev-utils-title">
        <H2>Dev Utils</H2>
      </div>

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
