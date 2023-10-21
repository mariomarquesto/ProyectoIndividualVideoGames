import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPage } from "../acctions/index.jsx";
import { validatePage } from "../../utils/utils";
import { useEffect } from "react";
import s from "./Footer.module.css";

function Footer() {
  const dispatch = useDispatch();
  const page = useSelector((state) => state.page);
  const searchState = useSelector((state) => state.searchState);
  const gamesFilters = useSelector((state) => state.gamesFilters);
  const loading = useSelector((state) => state.loading);

  useEffect(() => {
    dispatch(setPage(0));
  }, [gamesFilters, dispatch]);

  const handleClick = (e) => {
    e.preventDefault();
    if (!loading) {
      if (e.target.value === "prev") {
        if (validatePage(page, gamesFilters.length, "prev", searchState)) {
          dispatch(setPage(page - 1));
        }
      } else if (e.target.value === "next") {
        if (validatePage(page, gamesFilters.length, "next", searchState)) {
          dispatch(setPage(page + 1));
        }
      }
    }
  };
  return (
    <div className={s.container}>
      <button onClick={handleClick} value="prev">
        Prev
      </button>
      <span>{page + 1}</span>
      <button onClick={handleClick} value="next">
        Next
      </button>
    </div>
  );
}

export default Footer;
