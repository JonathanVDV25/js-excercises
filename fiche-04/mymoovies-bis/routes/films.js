var express = require("express");
var router = express.Router();
const { Films } = require("../models/films");
const filmModel = new Films();

// GET /films : read all the films, filtered by minimum-duration if the query param exist
router.get("/", function(req, res) {
    // NB : in JS, variables cannot contain '-'
    console.log("req.params ", req.query);
    const minimumFilmDuration = req.query
    ? parseInt(req.query["minimum-duration"])
    : undefined;
    if(
        minimumFilmDuration &&
        (isNaN(minimumFilmDuration) || minimumFilmDuration <= 0)
    ) //isNaN vérifie si le paramètre n'est pas un nombre
        return res.sendStatus(400);
    
    const films = filmModel.getAll();
    if(!minimumFilmDuration) return res.json(filmModel.getAll());
    else {
        res.json(filmModel.getAll((film) => film.duration >= minimumFilmDuration));
    }
});

// GET/films/{id} : Get a film from its id
router.get("/:id", function(req, res){
    const film = filmModel.getOne(req.params.id);
    //Send an error code 404 if the film wasn't found
    if(!film) return res.sendStatus(404);

    return res.json(film);
});

// POST /films : add a film
router.post("/", function(req, res){
    //Send an error code 400 if the body parameters are not valid
    if(
        !req.body ||
    !req.body.title ||
    !req.body.link ||
    !req.body.duration ||
    !req.body.budget ||
    !req.body.title ||
    !req.body.title.trim() ||
    !req.body.link.trim())

        return res.sendStatus(400);

    const film = filmModel.addOne(req.body);
    
    return res.json(film);
});

// DELETE /films{id} : delete a film
router.delete("/:id", function(req, res){
    const film = filmModel.deleteOne(req.params.id);
    if(!film) return res.sendStatus(404);

    return res.json(film);
});

// PUT /films{id} : update a film identified by its id
router.put("/:id", function(req, res){
    // Send an error code 400 if the body parameters are not valid
    if(
        !req.body ||
        (req.body.title && !req.body.title.trim()) ||
        (req.body.link && !req.body.link.trim()) ||
        (req.body.duration && isNaN(req.body.duration)) ||
        (req.body.budget && isNaN(req.body.budget))
    )

        return res.sendStatus(400).end();

    const updatedFilm = filmModel.updateOne(req.params.id, req.body);
    // Send an error code 404 Not found if the film hasn't been found
    if(!updatedFilm)
        return res.sendStatus(404);
    
    return res.json(updatedFilm)
});

module.exports = router;