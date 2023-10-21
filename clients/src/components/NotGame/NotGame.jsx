import React from "react";
import notFound from "../../img/no-results-found.png";
import s from "./NotGame.module.css";

function NotGame() {
  return (
    <div className={s.container}>
      <img src={notFound} alt="notFound" />
    </div>
  );
}

export default NotGame;
