import React from "react";
import s from "./Game.module.css";
import Template from "../../img/game_template.png";
import { Link } from "react-router-dom";

function Game({ id, name, image, genres, rating }) {
  return (
    <Link className={s.link} to={`/games/${id}`}>
      <div className={s.container}>
        <img src={image ? image : Template} alt="" />
        <span>{name}</span>
        <p>Rating {!isNaN(Number(rating)) ? Number(rating) : 0}</p>
        <ul>
          {genres &&
            genres.map((g) => <li key={`${name}_${g.id}`}>{g.name}</li>)}
          {!genres.length && <li>No genres</li>}
        </ul>
      </div>
    </Link>
  );
}

export default Game;
