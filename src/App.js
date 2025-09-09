import "./App.css";
import { useEffect, useState, useCallback } from "react";
import SingleCard from "./components/SingleCard";

let cardImages = [
  { src: "/img/chunli.png", matched: false },
  { src: "/img/peely.png", matched: false },
  { src: "/img/fishstick.png", matched: false },
  { src: "/img/jonesy.png", matched: false },
  { src: "/img/ghoultrooper.png", matched: false },
  { src: "/img/midas.png", matched: false },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setchoiceOne] = useState("");
  const [choiceTwo, setChoiceTwo] = useState("");
  const [disabled, setdisabled] = useState(false);

  // ✅ define resetTurn before useEffect, wrap with useCallback
  const resetTurn = useCallback(() => {
    setchoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurn) => prevTurn + 1);
    setdisabled(false);
  }, []);

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setdisabled(true);

      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards) =>
          prevCards.map((card) =>
            card.src === choiceTwo.src ? { ...card, matched: true } : card
          )
        );
        resetTurn();
      } else {
        console.log("they dont match");
        setTimeout(() => resetTurn(), 1000);
      }
    }
    console.log(cards);
  }, [choiceOne, choiceTwo, resetTurn, cards]); // ✅ clean deps

  const shuffledCards = () => {
    let shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: crypto.randomUUID() }));

    setchoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setTurns(0);
  };

  useEffect(() => shuffledCards(), []);

  return (
    <div className="App">
      <h1>CLOUD TEST</h1>
      <button onClick={shuffledCards}>New Game</button>

      <div className="card-grid">
        {cards.map((card) => (
          <SingleCard
            choiceOne={choiceOne}
            setchoiceOne={setchoiceOne}
            choiceTwo={choiceTwo}
            setChoiceTwo={setChoiceTwo}
            key={card.id}
            card={card}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
      <p>Turns: {turns}</p>
    </div>
  );
}

export default App;
