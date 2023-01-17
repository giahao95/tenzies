import React from "react";
import { useXucXacContent } from "../../contextAPI/xucXacContext";

const BtnPlay = () => {
  const { playXucXac, reset } = useXucXacContent();

  return (
    <>
      <button className="btn-play" onClick={playXucXac}>
        PLAY GAME
      </button>
      <button className="btn-reset" onClick={reset}>
        RESET
      </button>
    </>
  );
};

export default BtnPlay;
