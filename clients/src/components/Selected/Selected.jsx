import React from "react";
import s from "./Selected.module.css";
import { useState, useRef } from "react";

function Selected({ list, items, setItems }) {
  const [showList, setShowList] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [filterList, setFilterList] = useState(list);
  const selectRef = useRef(null);

  const onClickList = (e) => {
    setShowList((prev) => !prev);// Cambia el estado para mostrar/ocultar la lista desplegable de elementos. Cuando se hace clic en la barra de selección, esta línea invierte el valor actual de showList. Si showList es true, se convierte en false, y viceversa. Esto muestra u oculta la lista de elementos en respuesta al clic.
    setSearchValue(() => "");// Limpia el valor de búsqueda
    setFilterList(() => list);  // Restaura la lista filtrada
  };

  const onClickClean = (e) => {
    setSearchValue(() => "");
    setFilterList(() => list);
    setItems(() => []);
  };

  const onClickDelete = (name) => {
    setItems((prev) => prev.filter((item) => item !== name));
  };

  const onClickElem = (e) => {
    const value = e.target.innerHTML;
    setItems((prev) => {
      const index = prev.indexOf(value);
      if (index === -1) {
        return [...prev, value];
      } else {
        return [...prev];
      }
    });
  };

  const onChange = (e) => {
    setSearchValue(() => {
      setShowList(() => true);
      const value = e.target.value;
      if (value !== "") {
        setFilterList(() => {
          return list.filter((elem) =>
            elem.toLowerCase().includes(value.toLowerCase())
          );
        });
      } else {
        setFilterList(() => list);
      }
      return value;
    });
  };

  return (
    <div ref={selectRef} className={s.container}>
      <div className={s.bar}>
        {!items.length && "Select..."}
        {items.length
          ? items.map((item, i) => {
              return (
                <div
                  key={`${item}_item_${i * item.length + 5}`}
                  className={s.item}
                >
                  <span>{item}</span>
                  <button onClick={() => onClickDelete(item)}>X</button>
                </div>
              );
            })
          : ""}
        <div className={s.buttons}>
          <input
            className={s.buttons}
            onChange={onChange}
            value={searchValue}
            type="text"
            name="selected"
          />
          <div className={s.btnClean}>
            <button onClick={onClickClean}>×</button>
            <span> |</span>
            <button onClick={onClickList}>∨</button>
          </div>
        </div>
      </div>
      {showList && filterList.length ? (
        <div
          style={{
            top: `${
              selectRef.current
                ? `${10 + selectRef.current.clientHeight}px`
                : "50px"
            }`,
          }}
          className={s.list}
        >
          {filterList.map((elem, i) => (
            <span
              key={`${elem}_${i * elem.length}`}
              className={s.elemList}
              onClick={onClickElem}
            >
              {elem}
            </span>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export default Selected;
