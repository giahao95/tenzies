export const innitalState = {
  banChon: true,
  banThang: 0,
  banChoi: 0,
  xucXacState: [
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
  ],
};

export const xucXacReduer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "BAN_CHON":
      state.banChon = payload;
      return { ...state };
    case "PLAY_XUC_XAC":
      state.xucXacState = payload;
      return { ...state };
    case "KET_QUA":
      state.banChoi += 1;
      if (state.banChon === payload) {
        state.banThang += 1;
      }
      return { ...state };
    default:
      return state;
  }
};
