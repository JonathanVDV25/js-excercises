"use strict";
const jwt = require("jsonwebtoken");
const { parse, serialize } = require("../utils/json");

const bcrypt = require('bcrypt');
const jwtSecret = "ilovejavascript!";
const LIFETIME_JWT = 24 * 60 * 60 * 1000; //24h

const jsonDbPath = __dirname + "/../data/users.json";

const saltRounds = 10;

//Default users
const defaultUsers = [
    {
        username: "admin",
        password: "$2b$10$RqcgWQT/Irt9MQC8UfHmjuGCrQkQNeNcU6UtZURdSB/fyt6bMWARa",
    },
];

class Users {
    constructor(dbPath=jsonDbPath, items=defaultUsers){
        this.jsonDbPath = dbPath;
        this.collection = items;
    }

    getNextId(){
        const collection = parse(this.jsonDbPath, this.defaultUsers);
        let nextId;
        if(collection.length === 0) nextId = 1;
        else nextId = collection[collection.length-1].id + 1;

        return nextId;
    }

    /**
     * Returns all items
     * @return {Array} Array of items
     */
    getAll(){
        const items = parse(jsonDbPath, defaultUsers);
        return items;
    }

    /**
     * Returns the item identified by id
     * @param {Number} id - id of the item to find
     * @return {Object} the item found or undefined if the id does not lead to a item
     */
    getOne(id){
        const items = parse(jsonDbPath, defaultUsers);
        const foundIndex = items.findIndex((item) => item.id == id);
        if(foundIndex < 0) return;

        return items[foundIndex];
    }

    /**
     * Returns the item identified by username
     * @param {string} username - username of item to find
     * @return {Object} the item found or undefined if the username does not lead to an item 
     */
    getOneByUsername(username){
        const items = parse(jsonDbPath, defaultUsers);
        const foundIndex = items.findIndex((item) => item.username == username);
        if(foundIndex < 0) return;

        return items[foundIndex];
    }

    /**
     * Add an item in the DB and returns the added item (containing a new id)
     * @param {object} body - it contains all required data to create an item
     * @return {object} the item that was created (with id)
     */
    async addOne(body){
        const items = parse(jsonDbPath, defaultUsers);
        //hash the password (async call)
        const hashedPassword = await bcrypt.hash(body.password, saltRounds);

        //add new item to the menu
        const newItem = {
            username: body.username,
            role: "regular",
            password: hashedPassword,
        };
        items.push(newItem);
        serialize(this.jsonDbPath, items);
        return newItem;
    }

    /**
     * Delete an item in the DB and return the deleted item
     * @param {Number} id - id of the item to be deleted
     * @return {Object} the id that has been deleted or undefind if delete operation failed
     */
    deleteOne(id){
        const items = parse(jsonDbPath, defaultUsers);
        const foundIndex = items.findIndex((item) => item.id == id);
        if(foundIndex < 0) return;
        
        const itemRemoved = items.splice(foundIndex, 1);
        serialize(this.jsonDbPath, items);

        return itemRemoved[0];
    }

    /**
     * Update an item in the DB and return the updated item
     * @param {Number} idValue - id of the item to be updated
     * @param {Object} body - it contains all the data to be updated
     * @param {Number} idKey - key (or name) of the attribute to be used as id (id by default)
     * @return {object} the updated item or undefined if the update operation failed
     */
    updateOne(idValue, body, idKey = "id"){
        const items = parse(jsonDbPath, defaultUsers);
        const foundIndex = items.findIndex((item) => item[idKey] == idValue);
        if(foundIndex < 0) return;
        //Create a new object based on the existing item - prior to modification
        //and the properties requested to be updated (those in the body of the request)
        //use of the spread operator to create a shallow copy and repl
        const updateItem = { ...items[foundIndex], ...body };
        //replace the item found at index : (or use splice)
        items[foundIndex] = updateItem;

        serialize(jsonDbPath, defaultUsers);
        return updateItem;
    }

    /**
     * Authentificate a user and generate a token if the user credentials are OK
     * @param {*} username
     * @param {*} password
     * @returns {Promise} Promise represents the authentificatedUser ({username:..., token:...}) or undefined if the user could not be authentificated
     */
    async login(username, password){
        const userFound = this.getOneByUsername(username);
        if(!userFound) return;
        //Check hash of password
        const match = await bcrypt.compare(password, userFound.password);
        if(!match) return;

        const authentificatedUser = {
            username: username,
            token: "Future signed token",
        };

        //replace expected token with JWT : create a JWT
        const token = jwt.sign(
            { username: authentificatedUser.username}, // session data in the payload
            jwtSecret, // secret used for the signature
            { expiresIn: LIFETIME_JWT } //lifeTime of the JWT

        );

        authentificatedUser.token = token;
        return authentificatedUser;

    }

    /**
     * Create a new User in DB and generate a token
     * @param {*} username
     * @param {*} password
     * @returns the new authentificated user ({username:....,token:...}) or undefined if the user could not be created (if username already in use)
     */
    register(username, password){
        const userFound = this.getOneByUsername(username);
        if(userFound) return;

        const newUser = this.addOne({username: username, password: password});

        const authentificatedUser = {
            username: username,
            token: "Future signed token",
        };

        //Replace expected token with JWT : create a JWT
        const token = jwt.sign(
            {username: authentificatedUser.username}, //session data in the payload
            jwtSecret, //secret used for the signature
            {expiresIn: LIFETIME_JWT} // Lifetime of the JWT
        );

        authentificatedUser.token = token;
        return authentificatedUser;
    }
}

module.exports = { Users };