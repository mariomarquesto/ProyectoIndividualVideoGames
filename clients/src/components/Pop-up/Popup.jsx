import React from "react";
import s from "./Popup.module.css";

function Popup({ title, setPopupState }) {
  const onClose = () => {
    setPopupState(() => false);
  };
  return (
    <div className={s.container}>
      <div className={s.box}>
        <h2 className={s.title}>
          {title ? "Videogame created!" : "Videogame not created"}
        </h2>
        <button className={s.valid} onClick={onClose}>
          OK
        </button>
      </div>
    </div>
  );
}

export default Popup;
