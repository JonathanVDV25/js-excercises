"use strict";
const { parse, serialize } = require("../utils/json");
var escape = require("escape-html");

const jsonDbPath = __dirname + "/../data/texts.json";

//textes par défaut
const defaultTexts = [
    {
        id: 1,
        content: "1",
        level: "facile",
    },
    {
        id: 2,
        content: "2",
        level: "facile",
    },
    {
        id: 3,
        content: "3",
        level: "moyen",
    },
    {
        id: 4,
        content: "4",
        level: "moyen",
    },
    {
        id: 5,
        content: "5",
        level: "difficile",
    },
    {
        id: 6,
        content: "6",
        level: "difficile",
    }

];

class TextesADactylographier{
    constructor(dbPath = jsonDbPath, defaultItems = defaultTexts){
        this.jsonDbPath = dbPath;
        this.defaultTexts = defaultItems;
    }

    getNextId(){
        const texts = parse(this.jsonDbPath, this.defaultTexts);
        let nextId;
        if(texts.length === 0) nextId = 1;
        else nextId = texts[texts.length - 1].id + 1;

        return nextId;
    }

    /**
   * Returns a random text that has a specific level
   * @param {String} level - The level of a text
   * @returns {object} the text found or undefined if the level does not lead to a text
   */
    getOne(level){
        const texts = parse(this.jsonDbPath, this.defaultTexts);

        let textsPossible = texts.filter(t => t.level === level);
        let amount = 0;
        texts.filter(t => t.level === level).forEach(t => amount++);
        //console.log("amount: ", amount);
        //console.log("Les textes dispo: ", textsPossible);
        //console.log("lll", textsPossible[0]);

        let chiffre = Math.floor(Math.random()*(amount-1));
        let textToSend = textsPossible[chiffre]; //Car le tableau commence à 0
        console.log(chiffre);
        console.log(textToSend);
        return textToSend;
    }

    /**
   * Add a text in the DB and returns the added text (containing a new id)
   * @param {object} body - it contains all required data to create a text
   * @returns {object} the text that was created (with id)
   */
    addOne(body){
        const texts = parse(this.jsonDbPath, this.defaultTexts);

        const newText = {
            id: this.getNextId(),
            content: escape(body.content),
            level: escape(body.level),
        }

        texts.push(newText);
        serialize(this.jsonDbPath, texts);
        console.log(newText);

        return newText;
    }

}

module.exports = { TextesADactylographier };