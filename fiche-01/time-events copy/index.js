let myVar = setInterval(myTimer, 1000);
let btn = document.getElementById("date");
btn.addEventListener("click", increment);

let amountClicked = 0;
function increment(){
    amountClicked++;
    if(amountClicked % 2 == 1){
        myStopFunction();
    } else if(amountClicked % 2 == 0){
        myVar = setInterval(myTimer, 1000);
    }
    
}
function myTimer(){
    let d = new Date();
    let t = d.toLocaleTimeString();
    document.getElementById("date").innerHTML = t;
}
function myStopFunction(){
    clearInterval(myVar);
}