import React from "react";
import { filterGames, setFilterActive } from "../acctions/index.jsx";
import { useDispatch, useSelector } from "react-redux";
import { handleClickFilters } from "../../utils/utils";

function From() {
  const filter = useSelector((state) => state.filterActive);
  const dispatch = useDispatch();

  const handleClick = (e) => {
    handleClickFilters(e, dispatch, filter, filterGames, setFilterActive);
  };

  return (
    <div>
      <button
        className={filter.from === "DB" ? "active-button" : ""}
        onClick={handleClick}
        name="from"
        value="DB"
        style={
          filter.from !== "" && filter.from !== "DB" ? { display: "none" } : {}
        }
      >
        DB
      </button>
      <button
        className={filter.from === "API" ? "active-button" : ""}
        onClick={handleClick}
        name="from"
        value="API"
        style={
          filter.from !== "" && filter.from !== "API" ? { display: "none" } : {}
        }
      >
        API
      </button>
    </div>
  );
}

export default From;
