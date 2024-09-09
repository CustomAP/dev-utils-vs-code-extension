import React from "react";
import { useParams } from "react-router-dom";

const CardDetail = () => {
  const { id } = useParams();

  return (
    <div>
      <h1>Details for Card {id}</h1>
      <p>This is the detailed view of card {id}.</p>
    </div>
  );
};

export default CardDetail;
