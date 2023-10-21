import React from "react";
import Template from "../../img/game_template.png";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { getGameDetails } from "../../utils/utils";
import s from "./GameDetails.module.css";
import { Link } from "react-router-dom";
import Loading from "../Loading/Loading";
import NotGame from "../NotGame/NotGame";

function GameDetails() {
  const { idVideoGame } = useParams();
  const [state, setState] = useState({
    gameDetails: {},
    loading: true,
  });
  const { name, description, image, rating, released, genres, platforms, id } =
    state.gameDetails;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    (async () => {
      try {
        setState((prev) => ({ ...prev, loading: true }));
        const details = await getGameDetails(idVideoGame);
        setState(() => ({ gameDetails: details, loading: false }));
      } catch (e) {
        console.log("Error useEffect details", e);
      }
    })();
  }, [idVideoGame]);

  return (
    <div className={s.container}>
      <div className={s.buttons}>
        <Link className={s.link} to="/home">
          <span>Home</span>
        </Link>
        <Link className={s.link} to="/create">
          <span>Create</span>
        </Link>
      </div>
      {!state.loading && Object.keys(state.gameDetails).length > 0 ? (
        <div className={s.detail}>
          <h2>{name}</h2>
          <img src={image ? image : Template} alt={`${name}`} />
          <p className={s.description}>
            {description ? description : "No description."}
          </p>
          <div className={s.spans}>
            <span>
              {!isNaN(Number(rating)) ? `Rating: ${Number(rating)}` : 0}
            </span>
            <span>Released: {released}</span>
          </div>
          <div className={s.lists}>
            <div className={s.list}>
              <h4>Genres</h4>
              <ul>
                {genres &&
                  genres.map((g) => (
                    <li key={`${g.id}&&${g.name}`}>{g.name}</li>
                  ))}
              </ul>
            </div>
            <div className={s.list}>
              <h4>Platforms</h4>
              <ul>
                {platforms &&
                  platforms.map((p) => <li key={`${p}_${id}`}>{p}</li>)}
              </ul>
            </div>
          </div>
        </div>
      ) : state.loading ? (
        <div className={s.loads}>
          <Loading />
        </div>
      ) : (
        <div className={s.loads}>
          <NotGame />
        </div>
      )}
      <div className={s.footer}></div>
    </div>
  );
}

export default GameDetails;
