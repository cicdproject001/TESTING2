import React from "react";
import "./SingleCard.css";
function SingleCard({
  card,
  choiceOne,
  setchoiceOne,
  choiceTwo,
  setChoiceTwo,
  flipped,
  disabled,
}) {
  let handleClick = (card) => {
    if (!disabled) {
      if (choiceOne) {
        setChoiceTwo(card);
      } else {
        setchoiceOne(card);
      }
    } else {
      console.log("currently disabled");
    }
  };

  return (
    <div className={`card`}>
      <div className={flipped ? "flipped" : ""}>
        <img
          className="front"
          style={{ width: "200", height: "200" }}
          src={card.src}
          alt="card front"
        />
        <img
          className="back"
          src={"/img/cover.png"}
          onClick={() => {
            handleClick(card);
          }}
          alt="card front"
        />
      </div>
    </div>
  );
}

export default SingleCard;
