require("dotenv").config();
const API_KEY = process.env;
const { Videogame, Genre, Platform } = require("../db");
const axios = require("axios");



async function loadGenres() {
  

  try {
    const genres = await axios.get(
      `https://api.rawg.io/api/genres?key=${API_KEY}&`
    );
    if (genres.data) {
      let promises = [];
      genres.data.results.forEach((genre) => {
        promises.push(
          Genre.create({
            id: genre.id,
            name: genre.name,
          })
        );
      });
      await Promise.all(promises);
    }
  } catch (e) {
    console.log("Error genresFromAPI", e);
  }
}
async function loadPlatforms() {
  try {
    const platforms = await axios.get(
      `https://api.rawg.io/api/platforms?key=${API_KEY}`
    );
    if (platforms.data) {
      let promises = [];
      platforms.data.results.forEach((p) => {
        promises.push(
          Platform.create({
            id: p.id,
            name: p.name,
          })
        );
      });
      await Promise.all(promises);
    }
  } catch (e) {
    console.log("Error loadPlatforms", e);
  }
}

async function loadGame(info) {
  if (info) {
    try {
      const game = await Videogame.create({
        name: info.name,
        description: info.description,
        image: info.image ? info.image : null,
        released: info.released,
        rating: info.rating ? info.rating : null,
        platforms: info.platforms.join("&&"),
      });
      await game.addGenres(info.genres);
      // await game.addPlatforms(info.platforms);
      return true;
    } catch (e) {
      console.log("Error loadGame", e);
    }
  }
  return false;
}

module.exports = {
  loadGenres,
  loadPlatforms,
  loadGame,
};
