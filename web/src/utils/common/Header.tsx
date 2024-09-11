import React from "react";
import { Button, H3 } from "@blueprintjs/core";
import { useNavigate } from "react-router-dom";
import "./Header.css";

interface HeaderProps {
  title: string;
  onBack?: () => void; // Optional custom back handler
}

const Header: React.FC<HeaderProps> = ({ title, onBack }) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (onBack) {
      onBack(); // Call custom handler if provided
    } else {
      navigate("/"); // Default action: go to the previous page
    }
  };

  return (
    <div>
      <Button icon="home" className="back-button" onClick={handleBack}>
        Home
      </Button>
      <H3>{title}</H3>
    </div>
  );
};

export default Header;
