"use strict";
let btn = window.document;
let message = document.getElementById("message");

function clicker(){
    document.getElementById("count").innerHTML = parseInt(document.getElementById("count").innerHTML) + 1;
    if(document.getElementById("count").innerHTML >= 5 && document.getElementById("count").innerHTML < 10){
        document.getElementById("message").innerHTML = " Bravo, bel échauffement !";
    }
    else if(document.getElementById("count").innerHTML >= 10){
        document.getElementById("message").innerHTML = "Vous êtes passé maître en l’art du clic !";
    }
    
}

btn.addEventListener("click", clicker);

