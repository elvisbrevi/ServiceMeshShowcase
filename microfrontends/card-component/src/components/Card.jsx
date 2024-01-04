import { useState, useEffect } from "react";
import axios from "axios";
import "./Card.css";

// eslint-disable-next-line react/prop-types
function Card({ name }) {
  const [cardData, setCardData] = useState(null);
  const [origin, setOrigin] = useState(null);

  useEffect(() => {
    const fetchCardData = async () => {
      if (!name) return;

      try {
        let response = await axios.get(
          `${import.meta.env.VITE_REDIS_ENDPOINT}/cache/card:${name}`
        );
        let data = response.data;

        if (!data || Object.keys(data).length === 0) {
          response = await axios.get(
            `${import.meta.env.VITE_POKEMON_ENDPOINT}/${name}`
          );

          data = response.data;

          setOrigin("API de Pokemon");
        } else {
          setOrigin("Caché de Redis");
        }

        setCardData(data);
      } catch (error) {
        console.error("Error al obtener datos de la carta", error);
      }
    };

    fetchCardData();
  }, [name]);

  if (!cardData) {
    return null;
  }

  return (
    <div className="cardContainer">
      <p>Origin: {origin}</p>
      <p>Name: {cardData.name}</p>
      <img src={cardData.img} alt={cardData.name} />
    </div>
  );
}

export default Card;
