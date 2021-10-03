"use strict";
function addDateTime(message){
    const dateTimeNow = new Date();
    return dateTimeNow.toLocaleDateString() + " " + dateTimeNow.toLocaleTimeString() + " " + message;
}

let message = addDateTime("une top heure pour programmer ! :)");
alert(message);