import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [cardName, setCardName] = useState('');
  const [cardData, setCardData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dataOrigin, setDataOrigin] = useState('');

  const fetchCardData = async () => {
    setLoading(true);
    try {
      // Intenta obtener la tarjeta desde la caché de Redis
      let response = await axios.get(`http://localhost:3002/cache/card:${cardName}`);
      let data = response.data;

      // Si la caché está vacía, obtén la tarjeta desde la API de Hearthstone
      if (!data || Object.keys(data).length === 0) {
        response = await axios.get(`http://localhost:3001/card/${cardName}`);
        data = response.data[0];

        // Guarda la tarjeta en Redis para futuras consultas
        await axios.post('http://localhost:3002/cache', {
          cacheKey: `card:${cardName}`,
          cardInfo: {
            name: data.name,
            artist: data.artist,
            img: data.img
          }
        });

        setDataOrigin('API de Hearthstone');
      } else {
        setDataOrigin('Caché de Redis');
      }

      setCardData(data);
    } catch (error) {
      console.error("Error al obtener datos de la tarjeta", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={cardName}
        onChange={(e) => setCardName(e.target.value)}
        placeholder="Ingrese nombre de la carta"
      />
      <button onClick={fetchCardData} disabled={loading}>
        {loading ? 'Cargando...' : 'Buscar Carta'}
      </button>
      
      {cardData && (
        <div>
          <h3>{cardData.name}</h3>
          {cardData.artist && <p>Artista: {cardData.artist}</p>}
          <p>Datos obtenidos desde: {dataOrigin}</p>
          {cardData.img && <img src={cardData.img} alt={cardData.name} />}
        </div>
      )}
    </div>
  );
}

export default App;