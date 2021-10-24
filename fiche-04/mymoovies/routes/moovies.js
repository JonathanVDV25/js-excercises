var express = require("express");
const { Moovies } = require("../model/moovies");

var router = express.Router();
const moovieModel = new Moovies();

// // GET /pizzas : read all the pizzas from the menu
// router.get("/", function (req, res) {
//   console.log("GET /moovies");
//   return res.json(moovieModel.getAll());
// });

// GET /films : read all the films, filtered by minimum-duration if the query param exists
router.get("/", function (req, res) {
  // NB : in JS, variables cannot contain '-'
  console.log("req.params", req.query);
  const minimumMoovieDuration = req.query
    ? parseInt(req.query["minimum-duration"])
    : undefined;
  if (
    minimumMoovieDuration &&
    (isNaN(minimumMoovieDuration) || minimumMoovieDuration <= 0)
  )
    return res.sendStatus(400);
  const moovies = moovieModel.getAll();
  if (!minimumMoovieDuration) return res.json(moovieModel.getAll());
  else {
    res.json(moovieModel.getAll((moovie) => moovie.duration >= minimumMoovieDuration));
  }
});

// GET /pizzas/{id} : Get a pizza from its id in the menu
router.get("/:id", function (req, res) {
  console.log(`GET /moovies/${req.params.id}`);

  const moovie = moovieModel.getOne(req.params.id);
  // Send an error code '404 Not Found' if the pizza was not found
  if (!moovie) return res.status(404).end();

  return res.json(moovie);
});

// POST /pizzas : create a pizza to be added to the menu.
router.post("/", function (req, res) {
  console.log("POST /moovie");

  // Send an error code '400 Bad request' if the body parameters are not valid
  if (
    !req.body ||
    (req.body.hasOwnProperty("title") && req.body.title.length === 0) ||
    (req.body.hasOwnProperty("duration") && req.body.duration.length === 0) ||
    (req.body.hasOwnProperty("budget") && req.body.budget.length === 0) ||
    (req.body.hasOwnProperty("link") && req.body.link.length === 0)
  )
    return res.status(400).end();

  const moovie = moovieModel.addOne(req.body);
  return res.json(moovie);
});

// DELETE /pizzas/{i} : delete a pizza from the menu
router.delete("/:id", function (req, res) {
  console.log(`DELETE /moovies/${req.params.id}`);

  const moovie = moovieModel.deleteOne(req.params.id);
  // Send an error code '404 Not Found' if the pizza was not found
  if (!moovie) return res.status(404).end();
  return res.json(moovie);
});

// PUT /pizzas/{id} : update a pizza at id
router.put("/:id", function (req, res) {
  console.log(`PUT /moovies/${req.params.id}`);
  // Send an error code '400 Bad request' if the body parameters are not valid
  if (
    !req.body ||
    (req.body.hasOwnProperty("title") && req.body.title.length === 0) ||
    (req.body.hasOwnProperty("duration") && req.body.duration.length === 0) ||
    (req.body.hasOwnProperty("budget") && req.body.budget.length === 0) ||
    (req.body.hasOwnProperty("link") && req.body.link.length === 0)
  )
    return res.status(400).end();

  const moovie = moovieModel.updateOne(req.params.id, req.body);
  // Send an error code 'Not Found' if the pizza was not found :
  if (!moovie) return res.status(404).end();
  return res.json(moovie);


});

module.exports = router;
