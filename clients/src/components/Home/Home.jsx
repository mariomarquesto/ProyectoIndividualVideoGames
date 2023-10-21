import React from "react";
import NavBar from "../NavBar/NavBar";
import Games from "../Games/Games";
import Filters from "../Filters/Filters";
import Footer from "../Footer/Footer";
import Loading from "../Loading/Loading";
import NotGame from "../NotGame/NotGame";
import s from "./Home.module.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import {
  getGames,
  filterReset,
  gamesPage,
  setLoading,
  resetState,
} from "../acctions/index.jsx";

function Home() {
  const loading = useSelector((state) => state.loading);
  const pages = useSelector((state) => state.gamesPage);
  const page = useSelector((state) => state.page);
  const dispatch = useDispatch();
  const [showFilters, setShowFilters] = useState(true);

  useEffect(() => {
    (async () => {
      dispatch(setLoading(true));
      dispatch(await getGames());
      dispatch(filterReset());
      dispatch(gamesPage(page));
      dispatch(setLoading(false));
    })();

    return () => {
      // console.log("Saliendo...");
      dispatch(resetState());
    };
    // eslint-disable-next-line
  }, []);

  const onClick = () => {
    if (!loading) {
      setShowFilters((prev) => !prev);
    }
  };

  return (
    <div className={s.container}>
      <div className={s.navbar}>
        <NavBar />
      </div>
      {
        <div
          style={{
            zIndex: `${showFilters ? "2" : "0"}`,
            borderRight: `${
              showFilters ? "none" : "1px solid rgba(128, 128, 128, 0.18)"
            }`,
            backgroundColor: `${showFilters ? "transparent" : "#e8e423"}`,
          }}
          className={s.filters}
        >
          {loading || !showFilters ? null : (
            <Filters setShowFilters={setShowFilters} />
          )}
          {showFilters ? null : (
            <button className={s.btn} onClick={onClick}>
              Show filters ↪
            </button>
          )}
        </div>
      }
      <div className={s.games}>
        {loading ? <Loading /> : <Games />}
        {!pages.length && !loading && <NotGame />}
      </div>
      <div className={s.footer}>
        <Footer />
      </div>
    </div>
  );
}

export default Home;
