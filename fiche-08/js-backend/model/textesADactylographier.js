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
        let amountTextsByLevel = 0;
        texts.filter(t => t.level === level).forEach(t => amountTextsByLevel++);
        let random;
        while(true){
            random = Math.random();
            if(random != 0) break;
        }
        let randomNumber = Math.floor(random * amountTextsByLevel);
        console.log(amountTextsByLevel);
        console.log(randomNumber);

        let s = texts.filter(t => t.level === level &&  t.id % amountTextsByLevel  === 0);
        console.log(s);
        return s;
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