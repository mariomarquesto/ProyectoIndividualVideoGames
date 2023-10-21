import React from "react";
import { filterGames,setFilterActive } from "../acctions/index.jsx";
import { useDispatch, useSelector } from "react-redux";
import { handleClickFilters } from "../../utils/utils";

function Order() {
  const filter = useSelector((state) => state.filterActive);
  const dispatch = useDispatch();

  const handleClick = (e) => {
    handleClickFilters(e, dispatch, filter, filterGames, setFilterActive);
  };

  return (
    <div>
      <button
        className={filter.order === "A-Z" ? "active-button" : ""}
        onClick={handleClick}
        name="order"
        value="A-Z"
      >
        A-Z
      </button>
      <button
        className={filter.order === "Z-A" ? "active-button" : ""}
        onClick={handleClick}
        name="order"
        value="Z-A"
      >
        Z-A
      </button>
      <button
        className={filter.order === "Rating" ? "active-button" : ""}
        onClick={handleClick}
        name="order"
        value="Rating"
      >
        Rating
      </button>
    </div>
  );
}

export default Order;
