import React from "react";
import s from "./Filters.module.css";
import Genres from '../Genres/Gernes';
import From from "../From/From";
import Order from "../Order/Order";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearchState, filterReset } from "../acctions/index.jsx";
import { getGenresFromDB } from "../../utils/utils";

function Filters({ setShowFilters }) {
  // Estado para almacenar la lista de géneros
  const [genres, setGenres] = useState([]);
  // Accede al estado filterActive desde Redux
  const filterActive = useSelector((state) => state.filterActive);
  // Accede al estado searchState desde Redux
  const searchState = useSelector((state) => state.searchState);
  // Accede a la función dispatch desde Redux para despachar acciones
  const dispatch = useDispatch();
  // Estado para controlar si se muestra el menú de filtros
  const [click, setClick] = useState(false);
  // Estado para controlar qué menús de filtro están abiertos o cerrados
  const [menu, setMenu] = useState({
    Genres: false,
    From: false,
    Order: false,
  });

  // useEffect se utiliza para cargar los géneros cuando el componente se monta
  useEffect(() => {
    (async () => {
      const response = await getGenresFromDB();
      setGenres(() => response);
    })();
    // Establece el estado de los menús según el estado filterActive desde Redux
    setMenu(() => ({
      Genres: Boolean(filterActive.genres),
      From: Boolean(filterActive.from),
      Order: Boolean(filterActive.order),
    }));

  }, []);

  // Función que se ejecuta al hacer clic en un título de filtro (Genres, From, Order)

  const handleClick = (e) => {
    e.preventDefault();
    // Si se hace clic en "Reset", se restablecen los filtros y el estado de búsqueda
    if (e.target.name === "reset") {
      if (
        filterActive.genres ||
        filterActive.from ||
        filterActive.order ||
        searchState === "on"
      ) {
        dispatch(setSearchState("off"));
        dispatch(filterReset());
        setMenu(() => {
          return {
            Genres: false,
            From: false,
            Order: false,
          };
        });
      }
    } else {
      // Si se hace clic en un título de filtro (Genres, From, Order), cambia su estado (abierto/cerrado)

      setMenu((prevState) => {
        return {
          ...prevState,
          [e.target.innerHTML]: !prevState[e.target.innerHTML],
        };
      });
    }
  };

  // Función para ocultar el menú de filtros

  const onClickHide = () => {
    setClick(() => true);
    setTimeout(() => {
      setShowFilters(() => false);
    }, 190);
  };

  return (
    <div className={`${s.container} ${click ? s.filterHide : s.filterShow}`}>
      <div onClick={onClickHide} className={s.btnHide}>
        Hide filters ↩
      </div>
      <div className={s.genres}>
        <h3 onClick={handleClick} name="Genres">
          Genres
        </h3>
        <div>{menu.Genres && <Genres genres={genres} />}</div>
      </div>
      <div className={s.from}>
        <h3 onClick={handleClick} name="From">
          From
        </h3>
        <div>{menu.From && <From />}</div>
      </div>
      <div className={s.order}>
        <h3 onClick={handleClick} name="Order">
          Order
        </h3>
        <div>{menu.Order && <Order />}</div>
      </div>
      <div>
        <button className={s.reset} onClick={handleClick} name="reset">
          Reset
        </button>
      </div>
    </div>
  );
}

export default Filters;
