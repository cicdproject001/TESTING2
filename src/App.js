import "./App.css";
import { useEffect, useState } from "react";
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

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setdisabled(true);

      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceTwo.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetTurn();
      } else {
        console.log("they dont match");
        setTimeout(() => resetTurn(), 1000);
      }
    }
    console.log(cards);
  }, [choiceOne, choiceTwo]);

  let resetTurn = () => {
    setchoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurn) => prevTurn + 1);
    setdisabled(false);
  };

  let shuffledCards = () => {
    let shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => {
        return { ...card, id: crypto.randomUUID() };
      });

    setchoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setTurns(0);
  };

  useEffect(() => shuffledCards(), []);
  return (
    <div className="App">
      <h1>Fortnite Fusion</h1>
      <button onClick={shuffledCards}>New Game</button>

      <div className="card-grid">
        {cards.map((card) => {
          return (
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
          );
        })}
      </div>
      <p>Turns: {turns}</p>
    </div>
  );
}

export default App;
