function addDateTime(message){ 
    let dateTimeNow = new Date();
    return message + dateTimeNow.toLocaleDateString() + " et il est " + dateTimeNow.toLocaleTimeString();
}
let message = addDateTime("On est le ");
alert(message);