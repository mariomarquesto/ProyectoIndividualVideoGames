var express = require("express");
var router = express.Router();
const { Platform } = require("../db");

router.get("/", async (req, res) => {
  try {
    const platforms = await Platform.findAll({
      attributes: ["name"],
    });
    res.json(platforms);
  } catch (e) {
    res.sendStatus(404);
  }
});

module.exports = router;
