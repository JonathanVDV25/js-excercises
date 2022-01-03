"use strict";
const { parse, serialize } = require("../utils/json");

const jsonDbPath = __dirname + "/../data/films.json";

const defaultFilms = [
    { id: 1, title: "Conjuring 3", duration: 116, budget: 4, link: "https://www.youtube.com/watch?v=KnkTLf_Zrbo"},
    { id: 2, title: "Fast And Furious 9", duration: 135, budget: 6, link: "https://www.youtube.com/watch?v=hCPXYelJteM"}
];

class Films {
    constructor(dbPath = jsonDbPath, defaultItems = defaultFilms){
        this.jsonDbPath = dbPath;
        this.defaultFilms = defaultItems;
    }

    getNextId(){
        const films = parse(this.jsonDbPath, this.defaultFilms);
        let nextId;
        if(films.length === 0) nextId = 1;
        else
            nextId = films[films.length-1].id + 1;
        
        return nextId;

    }

    /**
     * returns all ressources filtered
     * @param {predicate} function to be used to filter all ressources
     * @return {Array} Array of ressources
     */
    getAll(filterPredicate){
        let collection;
        collection = parse(this.jsonDbPath, this.defaultFilms);
        if(filterPredicate) return collection.filter(filterPredicate);
        else return collection;
    }

    /**
     * returns the film identified by id
     * @param {number} id - the id to find the film
     * @return {object} the film found or undefined if the the id does not lead to a film
     */
    getOne(id){
        const films = parse(this.jsonDbPath, this.defaultFilms);
        const foundIndex = films.findIndex((film) => film.id == id);
        if(foundIndex < 0) return;

        return films[foundIndex];
    }

    /**
     * Add a film in the DB and return the add film (containing a new id)
     * @param {object} body - it contains all required data to create a film
     * @return {object} the film that was created with id
     */
    addOne(body){
        const films = parse(this.jsonDbPath, this.defaultFilms);

        //add a new film to the db
        const newFilm = {
            id: this.getNextId(),
            title: body.title,
            duration: body.duration,
            budget: body.budget,
            link: body.link,
        };

        films.push(newFilm);
        serialize(this.jsonDbPath, films);

        return newFilm;
    }

    /**
     * Delete a film in the db and return the deleted film
     * @param {number} id - id of the film to be deleted
     * @return {object} the film that was deleted or undefined if the delete operation failed
     */
    deleteOne(id){
        const films = parse(this.jsonDbPath, this.defaultFilms);
        const foundIndex = films.findIndex((film) => film.id == id);
        if(foundIndex < 0) return;
        const itemRemoved = films.splice(foundIndex, 1); // 1 is to delete only 1 time
        serialize(this.jsonDbPath, films);

        return itemRemoved[0];
    }

    /**
     * Update a film in the DB and return the updated film
     * @param {number} id - id of the film to be updated
     * @param {object} body - it contains all the data to be updated
     * @return {object} th film that was updated or undefined if the update operation failed
     */
    updateOne(id, body){
        const films = parse(this.jsonDbPath, this.defaultFilms);
        const findIndex = films.findIndex((film) => film.id == id);
        if(findIndex < 0) return;

        // create a new object based on the existing pizza - prior to modification -
        // and the properties requested to be updated (those in the body of the request)
        // use of the spread operator to create a shallow copy
        const updatedFilm = { ...films[findIndex], ...body };
        // replace the pizza found at index : (or use splice)
        films[findIndex] = updatedFilm;

        serialize(this.jsonDbPath, films);
        return updatedFilm;
    }
      
}

module.exports = { Films };
