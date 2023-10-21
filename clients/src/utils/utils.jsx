import axios from "axios";
import moment from "moment";

function validateUUID(id) {
  if (typeof id !== "string") return false;
  const REGEX = /[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}/g;
  return REGEX.test(id);
}

function validateUrl(str) {
  const pattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ); // fragment locator
  return !!pattern.test(str);
}

function validateDate(str) {
  if (typeof str !== "string") return false;
  return (
    moment(str, "YYYY-MM-DD", true).isValid() ||
    moment(str, "YYYY-DD-MM", true).isValid()
  );
}

export function validatePage(page, length, action, search) {
  if (action === "prev" && search === "off") {
    if (page > 0) return true;
    return false;
  } else if (action === "next" && search === "off") {
    if (page >= 0 && page * 15 + 15 < length) return true;
    return false;
  }
  return false;
}

export function orderStr(a, b) {
  if (a.toLowerCase() > b.toLowerCase()) {
    return 1;
  }
  if (a.toLowerCase() < b.toLowerCase()) {
    return -1;
  }
  return 0;
}

export function filterG(games, type) {
  switch (type) {
    case "A-Z":
      return [...games].sort((a, b) => {
        return orderStr(a.name, b.name);
      });
    case "Z-A":
      return [...games].sort((a, b) => {
        return orderStr(b.name, a.name);
      });
    case "Rating":
      return [...games].sort((a, b) => {
        return orderStr(
          Number(b.rating).toString(),
          Number(a.rating).toString()
        );
      });
    case "DB":
    case "API":
      return games.filter((game) =>
        type === "DB" ? validateUUID(game.id) : !validateUUID(game.id)
      );
    default:
      return games.filter(
        (game) => game.genres.findIndex((genre) => genre.name === type) >= 0
      );
  }
}

export function handleClickFilters(
  event,
  dispatch,
  filter,
  filterGames,
  setFilterActive
) {
  if (event.target.name === "order") {
    if (filter.order !== event.target.value) {
      // console.log(event.target.value);
      dispatch(filterGames(event.target.value));
      dispatch(setFilterActive({ ...filter, order: event.target.value }));
    }
  } else {
    if (!filter[event.target.name]) {
      // console.log(event.target.value);
      dispatch(filterGames(event.target.value));
      dispatch(
        setFilterActive({
          ...filter,
          [event.target.name]: event.target.value,
        })
      );
    }
  }
}

export async function getGameDetails(id) {
  try {
    const response = await axios.get(`/videogames/${id}`);
    return response.data;
  } catch (e) {
    console.log("Error getGameDetails", e);
    return {};
  }
}

export async function getPlatforms() {
  try {
    const response = await axios.get("/platforms");
    return [...response.data].sort((a, b) => {
      return orderStr(a.name, b.name);
    });
  } catch (e) {
    console.log("Error getPlatforms", e);
    return [];
  }
}

export async function getGenresFromDB() {
  try {
    const response = await axios.get("/genres");
    return [...response.data].sort((a, b) => {
      return orderStr(a.name, b.name);
    });
  } catch (e) {
    console.log("Error getGenresFromDB", e);
    return [];
  }
}

export async function genresToId(inputGenres) {
  const ids = [];
  const genres = await getGenresFromDB();
  inputGenres.forEach((elem) => {
    let index = genres.findIndex((g) => g.name === elem);
    ids.push(genres[index].id);
  });

  return ids;
}

export function validateInputs(input, inputG, inputP) {
  const errors = {};
  if (!input.name) {
    errors.name = "Name cannot be empty";
  } else if (!/\w+/gi.test(input.name)) {
    errors.name = "Cannot be a string of spaces";
  }

  if (!input.description) {
    errors.description = "Description cannot be empty";
  } else if (input.description.length < 10) {
    errors.description = "It must have a minimum of 10 characters";
  } else if (!/\w+/gi.test(input.description)) {
    errors.description = "Cannot be a string of spaces";
  }

  if (input.image && !validateUrl(input.image) && input.image.length > 0) {
    errors.image = "Enter a valid url";
  }

  if (isNaN(Number(input.rating))) {
    errors.rating = "Has to be a number";
  } else if (Number(input.rating) < 0 || Number(input.rating) > 5) {
    errors.rating = "It has to be between 0 and 5";
  }

  if (
    input.released &&
    !validateDate(input.released) &&
    input.released.length > 0
  ) {
    errors.released = "Only valid date";
  }
  if (!inputG.length) {
    errors.genres = "Select at least 1 gender";
  }
  if (!inputP.length) {
    errors.platform = "Select at least 1 platform";
  }
  return !Object.keys(errors).length ? { validate: true } : errors;
}

export async function addVideogame(body) {
  if (Object.keys(body).length) {
    try {
      const response = await axios.post("/videogames", body);
      return response.data;
    } catch (e) {
      console.log("Error addVideogame", e);
      return {};
    }
  }
}
