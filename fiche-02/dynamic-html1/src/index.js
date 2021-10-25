// Import Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';
// Custom styles
import './stylesheets/main.css';

// This is the entry point to your app : add all relevant import and custom code

function createTableWithInitString(
    lineCount = 1,
    columnCount = 1,
    startString = "Cell"
){
    var myTab = [];
    for(let x = 0; x < lineCount; x++){
        myTab.push([]);
        for(let y = 0; y < columnCount; y++){
            myTab[x].push(startString + "[" + x + "][" + y + "]");
        }
    }
    return myTab;
}

function createDynamicHtmlTableWithCreateElement(
    containerSelector,
    arrayToDisplay
){
    const divContainer = document.querySelector(containerSelector);
    divContainer.innerHTML = "";
    const myTable = document.createElement("table");
    myTable.className = "table table-bordered text-nowrap";
    divContainer.appendChild(myTable);

    for(let x = 0; x < arrayToDisplay.length; x++){
        const myLine = document.createElement("tr");
        myTable.appendChild(myLine);
        for(let y = 0; y < arrayToDisplay[0].length; y++){
            const myCell = document.createElement("td");
            myCell.innerHTML = arrayToDisplay[x][y];
            myLine.appendChild(myCell);
        }
    }
}

const createDynamicHtmlTableWithInnerHtml = (
    containerSelector,
    arrayToDisplay
) => {
    const divContainer = document.querySelector(containerSelector);
    let linesHtml = arrayToDisplay
        .map(
            (line) =>
            `<tr>${line.map((column) => `<td>${column}</td>`).join("")}</tr>`
        )
        .join("");
    const tableHtml = `<table class="table table-bordered text-nowrap">
                            ${linesHtml}
                        </table>`;
    divContainer.innerHTML = tableHtml;
};

const myForm = document.querySelector("form");
const btnCreateElement = document.querySelector("#btn1");
const btnInnerHtml = document.querySelector("#btn2");
const linesInput = document.getElementById("lines");
const columnsInput = document.getElementById("columns");
const startStringInput = document.getElementById("startString");

btnCreateElement.addEventListener("click", function(e){
    if(!myForm.checkValidity()) return;
    console.log("submit from ", e.target.dispatchEvent, this.id);
    e.preventDefault();
    const myArr = createTableWithInitString(
        linesInput.value,
        columnsInput.value,
        startStringInput.value
    );
    createDynamicHtmlTableWithCreateElement("#tableContainer", myArr);
});

btnInnerHtml.addEventListener("click", function(e){
    if(!myForm.checkValidity()) return;
    console.log("submit from ", e.target.id, this.id);
    e.preventDefault();
    const myArr = createTableWithInitString(
        linesInput.value,
        columnsInput.value,
        startStringInput.value
    );
    createDynamicHtmlTableWithInnerHtml("#tableContainer", myArr);
});