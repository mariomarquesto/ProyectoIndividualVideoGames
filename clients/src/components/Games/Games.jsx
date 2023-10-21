import React from "react";
import { useEffect } from "react";
import { gamesPage, setLoading } from "../acctions/index.jsx";
import { useSelector, useDispatch } from "react-redux";
import Game from "../Game/Game.jsx";
import s from "./Games.module.css";

function Games() {
  const loading = useSelector((state) => state.loading);
  const dispatch = useDispatch();
  const pages = useSelector((state) => state.gamesPage);
  const page = useSelector((state) => state.page);
  const gamesFilters = useSelector((state) => state.gamesFilters);

  useEffect(() => {
    dispatch(setLoading(true));
    dispatch(gamesPage(page));
    dispatch(setLoading(false));
    // eslint-disable-next-line
  }, [page, gamesFilters]);

  return (
    <div className={s.container}>
      {pages &&
        !loading &&
        pages.map((game) => (
          <Game
            key={`${game.id}_${game.name}`}
            id={game.id}
            name={game.name}
            image={game.image}
            rating={game.rating}
            genres={game.genres}
          />
        ))}
    </div>
  );
}

export default Games;
