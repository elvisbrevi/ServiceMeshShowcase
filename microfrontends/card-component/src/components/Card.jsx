import "./Card.css"

function Card({ cardData }) {
  if (!cardData) {
    return null; // o algún placeholder si prefieres
  }

  return (
    <div>
      <h3>{cardData.name}</h3>
      {cardData.artist && <p>Artista: {cardData.artist}</p>}
      {cardData.img && <img src={cardData.img} alt={cardData.name} />}
    </div>
  );
}

export default Card