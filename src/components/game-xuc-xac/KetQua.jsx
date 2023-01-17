import React from "react";
import { useXucXacContent } from "../../contextAPI/xucXacContext";

const KetQua = () => {
  const { banChon, banThang, banChoi, alert } = useXucXacContent();

  return (
    <div className="ketqua">
      {alert.show && (
        <p className={`alert alert-${alert.type}`}>{alert.mess}</p>
      )}

      <div>
        bạn chọn :{" "}
        <span style={{ color: "red" }}>{banChon ? "Tài" : "Xỉu"}</span>
      </div>
      <div>
        số bàn thắng : <span style={{ color: "blue" }}>{banThang}</span>
      </div>
      <div>
        tổng số bàn chơi : <span style={{ color: "yellow" }}>{banChoi}</span>
      </div>
    </div>
  );
};

export default KetQua;
