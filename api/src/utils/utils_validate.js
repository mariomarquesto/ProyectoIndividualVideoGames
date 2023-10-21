require("dotenv").config();
const { Genre, Platform } = require("../db");
const moment = require("moment");

async function validateGenres(genres) {
  try {
    if (!Array.isArray(genres)) return false;
    if (!genres.length) return false;
    const genresDB = await Genre.findAll({
      where: { id: genres },
    });
    return genresDB.length === genres.length;
  } catch (e) {
    console.log("Error validateGenres", e);
  }
}

async function validatePlatforms(platforms) {
  try {
    if (!Array.isArray(platforms)) return false;
    if (!platforms.length) return false;
    if (!platforms.every((p) => typeof p === "string")) return false;
    // case sensitive
    const platformDB = await Platform.findAll({
      where: { name: platforms },
    });
    return platformDB.length === platforms.length;
  } catch (e) {
    console.log("Error validatePlatforms", e);
  }
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

async function validateParams(params) {
  try {
    if (!params) return false;
    const { name, description, genres, platforms, image, released, rating } =
      params;
    if (
      typeof name === "string" &&
      name.length > 0 &&
      typeof description === "string" &&
      description.length > 0 &&
      (await validateGenres(genres)) &&
      (await validatePlatforms(platforms)) &&
      (!image || validateUrl(image)) &&
      (!released || validateDate(released)) &&
      (!rating || typeof rating === "number")
    )
      return true;
    else return false;
  } catch (e) {
    console.log("Error validateParams", e);
  }
}

function validateUUID(id) {
  if (typeof id !== "string") return false;
  const REGEX = /[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}/g;
  return REGEX.test(id);
}

module.exports = {
  validateParams,
  validateUUID,
};
