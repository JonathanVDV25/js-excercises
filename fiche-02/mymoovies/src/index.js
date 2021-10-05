// Import Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Custom styles
import "./stylesheets/main.css";
import conjuring3 from "./img/conjuring3.jpg";
import ff9 from "./img/fastAndFurious9.jpg";

// This is the entry point to your app : add all relevant import and custom code

let page = document.getElementById("page");
let htmlText = `<h1> Mes films </h1> <ul>`;


// test orienté objet
let conjuring = {
  name: "conjuring3",
  description: "Conjuring est un film d'horreur, de troisème édition",
  getImage: () => `<img src="${conjuring3}" </img>`,
};

let fastAndFurious = {
  name: "fast and furious 9",
  description: "Fast and Furious est un film d'action, de neuvième édition",
  getImage: () => `<img src="${ff9}"</img>`,
};
const LIBRARIES = [conjuring, fastAndFurious];

for (let i = 0; i < LIBRARIES.length; i++) {
  htmlText += "Film " + (i+1) + " :" + 
    `<li>${LIBRARIES[i].name} </li>
    <li>${LIBRARIES[i].getImage()}</li>
    <li>${LIBRARIES[i].description}</li>
    <br/>`;
}
htmlText += `</ul>`;
page.innerHTML = htmlText;
