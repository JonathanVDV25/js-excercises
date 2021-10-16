var express = require("express");
var router = express.Router();

const CARS = [
  { id: 1, brand: "Tesla", model: "S3" },
  { id: 2, brand: "BMW", model: "E43" },
];

/* Read all car */
router.get("/", function (req, res, next) {
  return res.json(CARS);
});

router.post("/", function (req, res, next) {
  if (!req.body || !req.body.brand || !req.body.model)
    return res.sendStatus(400);

  const newCar = {
    id: CARS.length + 1,
    brand: req.body.brand,
    model: req.body.model,
  };

  CARS.push(newCar);

  return res.json(newCar);
});

module.exports = router;
