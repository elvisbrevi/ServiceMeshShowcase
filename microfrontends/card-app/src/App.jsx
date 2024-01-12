import { useState, useRef } from "react";
import Card from "cardComponent/Card";

function App() {
  const [cardName, setCardName] = useState("");
  const inputRef = useRef(null);

  const handleButtonClick = () => {
    if (inputRef.current) {
      setCardName(inputRef.current.value);
    }
  };

  return (
    <div>
      <input
        type="text"
        ref={inputRef}
        placeholder="Ingrese nombre de la carta"
      />

      <button onClick={handleButtonClick}>Buscar!</button>

      <Card name={cardName} />
    </div>
  );
}

export default App;
