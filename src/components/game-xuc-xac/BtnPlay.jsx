import React from "react";
import { useXucXacContent } from "../../contextAPI/xucXacContext";

const BtnPlay = () => {
  const { playXucXac } = useXucXacContent();

  return (
    <button className="btn-play" onClick={playXucXac}>
      PLAY GAME
    </button>
  );
};

export default BtnPlay;
