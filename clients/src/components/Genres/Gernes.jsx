import React from "react";
import { filterGames, setFilterActive } from "../acctions/index.jsx";
import { useDispatch, useSelector } from "react-redux";
import { handleClickFilters } from "../../utils/utils";

function Genres({ genres }) {
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.filterActive);

  const handleClick = (e) => {
    handleClickFilters(e, dispatch, filter, filterGames, setFilterActive);
  };

  return (
    <div>
      {genres &&
        genres.map((g) => (
          <button
            className={filter.genres === g.name ? "active-button" : ""}
            onClick={handleClick}
            name="genres"
            value={g.name}
            style={
              filter.genres !== "" && filter.genres !== g.name
                ? { display: "none" }
                : {}
            }
            key={`${g.id}_${g.name}`}
          >
            {g.name}
          </button>
        ))}
    </div>
  );
}

export default Genres;
