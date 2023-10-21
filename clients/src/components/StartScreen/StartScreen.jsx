import React from "react";
import s from "./StartScreen.module.css";
import { Link } from "react-router-dom";

function StartScreen(props) {
  return (
    <div className={s.container}>
      <Link to="/home">
        <button className={s.btn}>Start</button>
      </Link>
    </div>
  );
}

export default StartScreen;
