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
          `http://localhost:3002/cache/card:${name}`
        );
        let data = response.data;

        if (!data || Object.keys(data).length === 0) {
          response = await axios.get(
            `http://localhost:3001/pokemon/card/${name}`
          );

          data = {
            name: response.data.name,
            img: response.data.images.small,
          };

          await axios.post("http://localhost:3002/cache", {
            cacheKey: `card:${name}`,
            cardInfo: {
              name: data.name,
              img: data.img,
            },
          });

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
