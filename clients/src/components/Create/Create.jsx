import React from "react";
import Selected from "../Selected/Selected";
import s from "./Create.module.css";
import {
  getPlatforms,
  getGenresFromDB,
  validateInputs,
  addVideogame,
  genresToId,
} from "../../utils/utils";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Popup from "../Pop-up/Popup";

function Create() {
  const [platforms, setPlatforms] = useState([]);
  const [genres, setGenres] = useState([]);
  const [input, setInput] = useState({
    name: "",
    description: "",
    image: "",
    rating: "",
    released: "",
  });
  const [inputPlatforms, setInputPlatforms] = useState([]);
  const [inputGenres, setInputGenres] = useState([]);
  const [errors, setErrors] = useState({});
  const [start, setStart] = useState(false);
  const [popState, setPopupState] = useState(false);
  const [popupTitle, setPopupTitle] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
    (async () => {
      const responseP = await getPlatforms();
      const responseG = await getGenresFromDB();
      setPlatforms(() => responseP.map((e) => e.name));
      setGenres(() => responseG.map((e) => e.name));
      setStart(() => true);
    })();
  }, []);

  useEffect(() => {
    if (start) {
      setErrors(() => validateInputs(input, inputGenres, inputPlatforms));
    }
    // eslint-disable-next-line
  }, [inputGenres, inputPlatforms]);

  const onChange = (e) => {
    setInput((prev) => {
      const input = {
        ...prev,
        [e.target.name]: e.target.value,
      };
      setErrors(() => validateInputs(input, inputGenres, inputPlatforms));
      return input;
    });
  };

  const onSubmit = () => {
    (async () => {
      const genresID = await genresToId(inputGenres);
      const body = {
        ...input,
        rating: Number(input.rating),
        platforms: inputPlatforms,
        genres: genresID,
      };
      const response = await addVideogame(body);
      setInput(() => ({
        name: "",
        description: "",
        image: "",
        rating: "",
        released: "",
      }));
      setStart(() => false);
      setInputGenres(() => []);
      setInputPlatforms(() => []);
      setErrors(() => ({}));
      setStart(() => true);
      setPopupTitle(() => response.created);
      setPopupState(() => true);
    })();
  };

  return (
    <div className={s.container}>
      {popState ? (
        <div className={s.popup}>
          <Popup title={popupTitle} setPopupState={setPopupState} />
        </div>
      ) : null}
      <Link className={s.btnHome} to="/home">
        <div>Home</div>
      </Link>
      <div className={s.form}>
        <div className={s.info}>
          <div className={`${s.name} ${errors.name ? s.dangerText : ""}`}>
            <span>{!errors.name ? "Name" : errors.name}</span>
            <input
              className={`${s.input} ${
                errors.name ? s.dangerShadow : !input.name ? "" : s.validShadow
              }`}
              onChange={onChange}
              type="text"
              value={input.name}
              name="name"
              placeholder="Name"
            />
          </div>

          <div
            className={`${s.description} ${
              errors.description ? s.dangerText : ""
            }`}
          >
            <span>
              {!errors.description ? "Description" : errors.description}
            </span>
            <textarea
              className={`${s.input} ${
                errors.description
                  ? s.dangerShadow
                  : !input.description
                  ? ""
                  : s.validShadow
              }`}
              onChange={onChange}
              type="text"
              rows="5"
              value={input.description}
              name="description"
              placeholder="Description"
            />
          </div>

          <div className={`${s.image} ${errors.image ? s.dangerText : ""}`}>
            <span>{!errors.image ? "Image" : errors.image}</span>
            <input
              className={`${s.input} ${
                errors.image
                  ? s.dangerShadow
                  : Object.keys(errors).length === 0
                  ? ""
                  : s.validShadow
              }`}
              onChange={onChange}
              type="text"
              value={input.image}
              name="image"
              placeholder="http://url-image"
            />
          </div>
        </div>

        <div className={s.numbers}>
          <div className={`${s.number} ${errors.rating ? s.dangerText : ""}`}>
            <span>{!errors.rating ? "Rating" : errors.rating}</span>
            <input
              className={`${s.input} ${
                errors.rating
                  ? s.dangerShadow
                  : Object.keys(errors).length === 0
                  ? ""
                  : s.validShadow
              }`}
              onChange={onChange}
              type="number"
              min="0"
              max="5"
              step="0.01"
              value={input.rating}
              name="rating"
              placeholder="Rating"
            />
          </div>

          <div className={`${s.number} ${errors.released ? s.dangerText : ""}`}>
            <span>{!errors.released ? "Released" : errors.released}</span>
            <input
              style={
                !input.released
                  ? {
                      color: "yellow",
                      fontWeight: "100",
                      fontStyle: "oblique",
                    }
                  : null
              }
              className={`${s.input} ${
                errors.released
                  ? s.dangerShadow
                  : Object.keys(errors).length === 0
                  ? ""
                  : s.validShadow
              }`}
              onChange={onChange}
              type="date"
              value={input.released}
              name="released"
            />
          </div>
        </div>
        <div className={s.selecteds}>
          <div
            className={`${s.select} ${errors.genres ? s.dangerText : ""} ${
              errors.genres
                ? s.dangerShadow
                : !inputGenres.length
                ? ""
                : s.validShadow
            }`}
          >
            <span>{!errors.genres ? "Genres" : errors.genres}</span>
            <Selected
              list={genres}
              items={inputGenres}
              setItems={setInputGenres}
            />
          </div>
          <div
            className={`${s.select} ${errors.platform ? s.dangerText : ""} ${
              errors.platform
                ? s.dangerShadow
                : !inputPlatforms.length
                ? ""
                : s.validShadow
            }`}
          >
            <span>{!errors.platform ? "Platforms" : errors.platform}</span>
            <Selected
              list={platforms}
              items={inputPlatforms}
              setItems={setInputPlatforms}
            />
          </div>
        </div>

        {errors.validate ? (
          <button className={s.btnSubmit} onClick={onSubmit}>
            Create
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default Create;
