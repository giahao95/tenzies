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
  const [history, setHistory] = useState([]);

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
      setComplete(false);
      setSecond(0);
    } else {
      setDice((oldDice) =>
        oldDice.map((dieElement) => {
          return dieElement.isHeld ? dieElement : generateNewDie();
        })
      );
    }
  }

  function holdDice(id) {
    if (second === 0) {
      setSecond((second) => second + 1);
    }
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
      setHistory([...history, second]);
    }
  }, [dice]);

  useEffect(() => {
    let held = dice.some((item) => item.isHeld);
    let interval = null;

    if (held) {
      interval = setInterval(() => {
        setSecond(second + 1);
      }, 1000);
    }

    if (tenzies) {
      clearInterval(interval);
      setComplete(true);
    }

    return () => clearInterval(interval);
  }, [second, tenzies]);

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
        <>
          <div className="white-container">
            {tenzies && <Confetti />}
            <h1>Tenzies</h1>
            <p>
              Roll until all dice are the same. Click each die to freeze it at
              its current value between rolls.
            </p>
            <div className="dice-container">{dieElements}</div>
            <button className="roll-button" onClick={handleRoll}>
              {tenzies ? "New game" : "Roll"}
            </button>

            {complete ? (
              <p>Completed in {second}s</p>
            ) : (
              <p className="time">Time: {second}s</p>
            )}
          </div>
          {history.length > 0 && (
            <div className="history">
              <h3>History play</h3>
              <ul>
                {history?.map((item, index) => {
                  return (
                    <li id={index}>
                      Play {index + 1}: {item}s
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </>
      )}

      {show.xucXacShow && <GameXucXac />}
    </div>
  );
}

export default App;
