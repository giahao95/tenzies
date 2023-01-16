import React from "react";
import BanChoi from "./BanChoi";
import BtnPlay from "./BtnPlay";
import KetQua from "./KetQua";

const GameXucXac = () => {
  return (
    <div className="game-wrapper">
      <div>
        <h3>GAME XÚC XẮC</h3>
        <BanChoi />
      </div>
      <div>
        <KetQua />
        <BtnPlay />
      </div>
    </div>
  );
};

export default GameXucXac;
