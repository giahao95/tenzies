import React, { useContext, useReducer } from "react";
import { innitalState, xucXacReduer } from "../reducers/xucXacReducer";

const xucXacContext = React.createContext();

export const XucXacProvider = ({ children }) => {
  const [state, dispatch] = useReducer(xucXacReduer, innitalState);
  const xucXacMau = [
    {
      imgSrc: "./img/1.png",
      diem: 1,
    },
    {
      imgSrc: "./img/2.png",
      diem: 2,
    },
    {
      imgSrc: "./img/3.png",
      diem: 3,
    },
    {
      imgSrc: "./img/4.png",
      diem: 4,
    },
    {
      imgSrc: "./img/5.png",
      diem: 5,
    },
    {
      imgSrc: "./img/6.png",
      diem: 6,
    },
  ];

  const handleTaiXiu = (bool) => {
    dispatch({ type: "BAN_CHON", payload: bool });
  };

  const getRandom = () => {
    return Math.floor(Math.random() * 6);
  };

  const playXucXac = () => {
    let count = 1;
    const lacXucXac = setInterval(() => {
      const xucXac = [
        xucXacMau[getRandom()],
        xucXacMau[getRandom()],
        xucXacMau[getRandom()],
      ];

      dispatch({ type: "PLAY_XUC_XAC", payload: xucXac });

      count += 1;
      if (count > 10) {
        clearInterval(lacXucXac);

        const tongNut = xucXac.reduce((tong, item) => {
          return tong + item.diem;
        }, 0);

        let ketQua;
        if (tongNut >= 11 && tongNut <= 17) {
          ketQua = true;
        }
        if (tongNut >= 4 && tongNut < 11) {
          ketQua = false;
        }

        dispatch({
          type: "KET_QUA",
          payload: ketQua,
        });
      }
    }, 100);
  };

  const reset = () => {
    dispatch({ type: "RESET" });
  };

  return (
    <xucXacContext.Provider
      value={{ ...state, handleTaiXiu, playXucXac, reset }}
    >
      {children}
    </xucXacContext.Provider>
  );
};

export const useXucXacContent = () => {
  return useContext(xucXacContext);
};
