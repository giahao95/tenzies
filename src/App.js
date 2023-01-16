import React from "react";
import { useState, useEffect } from "react";
import "./App.css";
import "./components/game-xuc-xac/game-xuc-xac.css";
import Die from "./components/Die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";
import GameXucXac from "./components/game-xuc-xac/GameXucXac";

function App() {
  const [show, setShow] = useState({ tenziesShow: true, xucXacShow: false });
  const [second, setSecond] = useState(0);
  const [complete, setComplete] = useState(false);

  const interval = () => {
    return setInterval(() => {
      setSecond((old) => old + 1);
    }, 1000);
  };

  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    };
  }
  function allNewDice() {
    const randomDice = [];
    for (let i = 0; i < 10; i++) {
      let die = generateNewDie();
      randomDice.push(die);
    }
    return randomDice;
  }

  const [dice, setDice] = useState(allNewDice());

  const dieElements = dice.map((dieElement, index) => (
    <Die
      key={index}
      value={dieElement.value}
      isHeld={dieElement.isHeld}
      handleClick={() => holdDice(dieElement.id)}
    />
  ));

  function handleRoll() {
    if (tenzies) {
      setDice(allNewDice());
      setTenzies(false);
    } else {
      setDice((oldDice) =>
        oldDice.map((dieElement) => {
          return dieElement.isHeld ? dieElement : generateNewDie();
        })
      );
    }
  }

  function holdDice(id) {
    // if (second === 0) {
    //   interval();
    // }
    setDice((oldDice) =>
      oldDice.map((dieElement) => {
        return dieElement.id === id
          ? { ...dieElement, isHeld: !dieElement.isHeld }
          : dieElement;
      })
    );
  }

  const [tenzies, setTenzies] = useState(false);

  useEffect(() => {
    const allHeld = dice.every((dieElement) => dieElement.isHeld);
    const firstValue = dice[0].value;
    const allSameValue = dice.every(
      (dieElement) => dieElement.value === firstValue
    );
    if (allHeld && allSameValue) {
      setTenzies(true);
    }
  }, [dice]);

  return (
    <div className="App">
      <div className="container">
        <h1>Mini Game</h1>
        <button
          onClick={() => {
            setShow({ xucXacShow: false, tenziesShow: true });
          }}
        >
          Tenzies
        </button>
        <button
          onClick={() => {
            setShow({ xucXacShow: true, tenziesShow: false });
          }}
        >
          Xúc Xắc
        </button>
      </div>

      {show.tenziesShow && (
        <div className="white-container">
          {tenzies && <Confetti />}
          <h1>Tenzies</h1>
          <p>
            Roll until all dice are the same. Click each die to freeze it at its
            current value between rolls.
          </p>
          <div className="dice-container">{dieElements}</div>
          <button className="roll-button" onClick={handleRoll}>
            {tenzies ? "New game" : "Roll"}
          </button>

          {/* {complete ? (
            <p>Completed in {second}s</p>
          ) : (
            <p className="time">Time: {second}s</p>
          )} */}
        </div>
      )}

      {show.xucXacShow && <GameXucXac />}
    </div>
  );
}

export default App;
