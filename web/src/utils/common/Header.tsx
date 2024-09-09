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
      navigate(-1); // Default action: go to the previous page
    }
  };

  return (
    <div>
      <Button className="back-button" onClick={handleBack}>
        Back
      </Button>
      <H3>{title}</H3>
    </div>
  );
};

export default Header;