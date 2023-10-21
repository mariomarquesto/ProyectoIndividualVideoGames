var express = require("express");
var router = express.Router();
const { Genre } = require("../db");

router.get("/", async (req, res) => {
  try {
    const genres = await Genre.findAll();
    res.json(genres);
  } catch (e) {
    res.sendStatus(404);
  }
});
module.exports = router;
