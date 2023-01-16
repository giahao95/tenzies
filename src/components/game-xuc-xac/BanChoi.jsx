import React from "react";
import { useXucXacContent } from "../../contextAPI/xucXacContext";
import XucXac from "./XucXac";

const BanChoi = () => {
  const { xucXacState, handleTaiXiu } = useXucXacContent();

  const renderXucXacs = () => {
    return xucXacState.map((item, index) => {
      return <XucXac item={item} key={index} />;
    });
  };

  return (
    <div className="ban-choi">
      <button onClick={() => handleTaiXiu(true)}>TÀI </button>
      <div>{renderXucXacs()}</div>
      <button onClick={() => handleTaiXiu(false)}>XỈU </button>
    </div>
  );
};

export default BanChoi;
