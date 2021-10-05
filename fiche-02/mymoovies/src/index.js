// Import Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';
// Custom styles
import './stylesheets/main.css';
import conjuring3 from './img/conjuring3.jpg';
import ff9 from './img/fastAndFurious9.jpg';



// This is the entry point to your app : add all relevant import and custom code

let page = document.getElementById("page");
let htmlText = `<h1> Mes films </h1> <ul>`;

const LIBRARIES = [
    conjuring3,
    ff9
];
const descriptionFIlms = [
    "Conjuring est un film d'horreur, de troisème édition",
    "Fast and Furious est un film d'action, de neuvième édition"
];

for(let i=0; i<LIBRARIES.length; i++){
    htmlText += `<li><img src='${LIBRARIES[i]}' alt="photo"> ${descriptionFIlms[i]} </li>`
}
htmlText += `</ul>`;
page.innerHTML = htmlText;


