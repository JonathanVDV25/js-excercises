"use strict";
const { parse, serialize } = require("../utils/json");

const jsonDbPath = __dirname + "/../data/moovies.json";

// Default pizza menu
const defaultMoovies = [
    { id: 1, title: "Moi moche et méchant", duration: 120, budget: 10, link: "https://www.youtube.com/watch?v=OPf1YYSKxBs"},
    { id: 2, title: "Conjuring 3", duration: 125, budget: 15, link: "https://www.youtube.com/watch?v=KnkTLf_Zrbo"},
    { id: 3, title: "Scarface", duration: 120, budget: 18, link: "https://www.youtube.com/watch?v=KnkTLf_Zrbo"},
];

class Moovies {
  constructor(dbPath = jsonDbPath, defaultItems = defaultMoovies) {
    this.jsonDbPath = dbPath;
    this.defaultMoovies = defaultItems;
  }

  getNextId() {
    const moovies = parse(this.jsonDbPath, this.defaultMoovies);
    let nextId;
    if (moovies.length === 0) nextId = 1;
    else nextId = moovies[moovies.length - 1].id + 1;

    return nextId;
  }

  /**
   * Returns all pizzas
   * @returns {Array} Array of pizzas
   */
  getAll() {
    const moovies = parse(this.jsonDbPath, this.defaultMoovies);
    return moovies;
  }

   /**
   * Returns all resources
   * @param {predicate} function to be used to filter all resources
   * @returns {Array} Array of resources
   */

  getAll(filterPredicate){
    let collection;
    collection = parse(this.jsonDbPath, this.defaultMoovies);
    if(filterPredicate) return collection.filter(filterPredicate);
    else return collection;

  }


  /**
   * Returns the pizza identified by id
   * @param {number} id - id of the pizza to find
   * @returns {object} the pizza found or undefined if the id does not lead to a pizza
   */
  getOne(id) {
    const moovies = parse(this.jsonDbPath, this.defaultMoovies);
    const foundIndex = moovies.findIndex((moovie) => moovie.id == id);
    if (foundIndex < 0) return;

    return moovies[foundIndex];
  }

  /**
   * Add a pizza in the DB and returns the added pizza (containing a new id)
   * @param {object} body - it contains all required data to create a pizza
   * @returns {object} the pizza that was created (with id)
   */

  addOne(body) {
    const moovies = parse(this.jsonDbPath, this.defaultMoovies);

    // add new pizza to the menu
    const newMoovie = {
      id: this.getNextId(),
      title: body.title,
      duration: body.duration,
      budget: body.budget,
      link: body.link,
    };
    moovies.push(newMoovie);
    serialize(this.jsonDbPath, moovies);
    return newMoovie;
  }

  /**
   * Delete a pizza in the DB and return the deleted pizza
   * @param {number} id - id of the pizza to be deleted
   * @returns {object} the pizza that was deleted or undefined if the delete operation failed
   */
  deleteOne(id) {
    const moovies = parse(this.jsonDbPath, this.defaultMoovies);
    const foundIndex = moovies.findIndex((moovie) => moovie.id == id);
    if (foundIndex < 0) return;
    const itemRemoved = moovies.splice(foundIndex, 1);
    serialize(this.jsonDbPath, moovies);

    return itemRemoved[0];
  }

  /**
   * Update a pizza in the DB and return the updated pizza
   * @param {number} id - id of the pizza to be updated
   * @param {object} body - it contains all the data to be updated
   * @returns {object} the updated pizza or undefined if the update operation failed
   */
  updateOne(id, body) {
    const moovies = parse(this.jsonDbPath, this.defaultMoovies);
    const foundIndex = moovies.findIndex((moovie) => moovie.id == id);
    if (foundIndex < 0) return;
    // create a new object based on the existing pizza - prior to modification -
    // and the properties requested to be updated (those in the body of the request)
    // use of the spread operator to create a shallow copy and repl
    const updatedMoovie = { ...moovies[foundIndex], ...body };
    // replace the pizza found at index : (or use splice)
    moovies[foundIndex] = updatedMoovie;

    serialize(this.jsonDbPath, moovies);
    return updatedMoovie;
  }
}

module.exports = { Moovies };
