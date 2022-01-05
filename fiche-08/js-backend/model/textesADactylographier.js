"use strict";
const { parse, serialize } = require("../utils/json");
var escape = require("escape-html");

const jsonDbPath = __dirname + "/../data/texts.json";

//textes par défaut
const defaultTexts = [
    {
        id: 1,
        content: "voici un texte a dactylographier sans caractere complique",
        level: "facile",
    },
    {
        id: 2,
        content: "et voila que nous apprenons tous a taper sur un clavier",
        level: "facile",
    },
    {
        id: 3,
        content: "Si c'est ça être sage, alors je préfère rester un idiot pour le restant de mes jours !",
        level: "moyen",
    },
    {
        id: 4,
        content:
        "J'étais devenu une relique du passé qu'ils souhaitaient tous voir disparaître. Jeune, je me suis demandé pourquoi j'existais.",
        level: "moyen",
    },
    {
        id: 5,
        content: "Les gens vivent en s'appuyant sur leurs convictions et leurs connaissances et ils appellent ça la réalité : mais le savoir et la compréhension sont des concepts si ambigus que cette réalité ne pourrait être alors qu'une illusion.",
        level: "difficile",
    },
    {
        id: 6,
        content:
        "C'est vrai... Dans le monde des ninjas, ceux qui ne respectent pas les règles et transgressent les lois... Sont considérés comme des moins-querien. Mais... Ceux qui ne pensent pas à leurs compagnons... Sont encore pires.",
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
        let randomNumber = Math.floor(Math.random() * amountTextsByLevel);
        console.log(amountTextsByLevel);
        console.log(randomNumber);

        return texts.filter(t => t.level === level &&  t.id % amountTextsByLevel  === randomNumber).slice(0, 1);
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

        return newText;
    }

}

module.exports = { TextesADactylographier };