"use strict";
let btn = window.document;
/*let compteur = document.getElementById("count").innerHTML;*/


document.getElementById("message").innerHTML = "Êtes vous bon en clickage ?";

function clicker(){
    /*compteur = parseInt(compteur) + 1;    MARCHE PAS ???*/
    document.getElementById("count").innerHTML = parseInt(document.getElementById("count").innerHTML) + 1;
    if(document.getElementById("count").innerHTML >= 5 && document.getElementById("count").innerHTML < 10){
        document.getElementById("message").innerHTML = " Bravo, bel échauffement !";
    }
    else if(document.getElementById("count").innerHTML >= 10){
        document.getElementById("message").innerHTML = "Vous êtes passé maître en l’art du clic !";
    } 
        
}

btn.addEventListener("click", clicker);

