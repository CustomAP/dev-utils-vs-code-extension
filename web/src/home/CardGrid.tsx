import React, { useState } from "react";
import { Card, Elevation, InputGroup, H1, H5, Button } from "@blueprintjs/core";
import { useNavigate } from "react-router-dom";
import "./CardGrid.css";
import { tools } from "./tools_list";
import img from "../../public/DevUtils_Transparent.png";

interface CardGridProps {
  vscode: any;
}
const CardGrid = ({ vscode = null }: CardGridProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleCardClick = (id: string) => {
    navigate(`/util/${id}`);
  };

  const filteredTools = tools.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="dev-utils-title">
        <img src={img} className="img-logo" alt="Logo" />
        <H1>Dev Utilities</H1>
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

      <div className="contribute-holder">
        <H5>Don't find what you are looking for?</H5>
        <div>
          <Button
            className="contribute-button"
            intent="success"
            icon="git-merge"
            onClick={() =>
              vscode.postMessage({
                type: "openLink",
                url: "https://github.com/CustomAP/dev-utils-vs-code-extension",
              })
            }
          >
            Contribute
          </Button>
          <Button
            className="contribute-button"
            intent="success"
            icon="git-branch"
            onClick={() =>
              vscode.postMessage({
                type: "openLink",
                url: "https://github.com/CustomAP/dev-utils-vs-code-extension/issues/new",
              })
            }
          >
            Submit a feature request
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CardGrid;
