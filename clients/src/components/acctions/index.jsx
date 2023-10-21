import axios from "axios";

export const GET_GAMES = "GetGames";
export const GAMES_PAGE = "GamesPage";
export const FILTER_GAMES = "FilterGames";
export const FILTER_ACTIVE = "FilterActive";
export const FILTER_RESET = "FilterReset";
export const SET_PAGE = "SetPage";
export const SEARCH_GAME = "SearchGame";
export const SET_SEARCH_STATE = "SetSearchState";
export const SET_LOADING = "SetLoading";
export const RESET_STATE = "ResetState";

export const getGames = async () => {
  try {
    const response = await axios.get("/videogames");
    return {
      type: GET_GAMES,
      payload: response.data,
    };
  } catch (e) {
    console.log("Error getGames", e);
  }
};

export const gamesPage = (payload) => {
  return {
    type: GAMES_PAGE,
    payload: payload,
  };
};

export const filterGames = (payload) => {
  return {
    type: FILTER_GAMES,
    payload: payload,
  };
};

export const filterReset = () => {
  return {
    type: FILTER_RESET,
  };
};

export const setFilterActive = (payload) => {
  return {
    type: FILTER_ACTIVE,
    payload: payload,
  };
};

export const setPage = (payload) => {
  return {
    type: SET_PAGE,
    payload: payload,
  };
};

export const searchGame = async (name) => {
  try {
    const response = await axios.get(`/videogames?name=${name}`);
    return {
      type: SEARCH_GAME,
      payload: response.data,
    };
  } catch (e) {
    console.log("Error searchGame", e);
  }
};

export const setSearchState = (payload) => {
  return {
    type: SET_SEARCH_STATE,
    payload: payload,
  };
};

export const setLoading = (payload) => {
  return {
    type: SET_LOADING,
    payload: payload,
  };
};

export const resetState = () => {
  return {
    type: RESET_STATE,
  };
};