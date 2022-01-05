var express = require('express');
const { TextesADactylographier } = require("../model/textesADactylographier");

var router = express.Router();
const textModel = new TextesADactylographier();

// GET /texts/{level} : Get a random text from its level in the menu
router.get("/:level", function (req, res) {
  console.log(`GET /texts/${req.params.level}`);

  const text = textModel.getOne(req.params.level);
  // Send an error code '404 Not Found' if the text was not found
  if (!text) return res.status(404).end();

  return res.json(text);
});

// POST /texts : create a text to be added to the DB.
router.post("/", function (req, res) {
  if(
    !req.body ||
    (req.body.hasOwnProperty("content") && req.body.length === 0) ||
    (req.body.hasOwnProperty("level") && req.body.length === 0) ||
    (req.body.level !== "facile" && req.body.level !== "moyen" && req.body.level !== "difficile"))
    return res.status(400).end();
  
  
  const text = textModel.addOne(req.body);

  return res.json(text);
  
});


module.exports = router;
