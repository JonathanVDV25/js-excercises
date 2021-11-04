// Import Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Custom styles
import "./stylesheets/main.css";

// This is the entry point to your app : add all relevant import and custom code

function createTableWithInitString(
  lineCount = 1,
  columnCount = 1,
  initString = "CELL"
) {
  var myTab = [];
  for (let x = 0; x < lineCount; x++) {
    myTab.push([]);
    for (let y = 0; y < columnCount; y++) {
      myTab[x].push(initString + "[" + x + "][" + y + "]");
    }
  }
  return myTab;
}

function createDynamicHtmlTableWithCreateElement(
  containerSelector,
  arrayToDisplay
) {
  const divContainer = document.querySelector(containerSelector);
  divContainer.innerHTML = "";
  const myTable = document.createElement("table");
  myTable.className = "table table-bordered text-nowrap";
  divContainer.appendChild(myTable);

  for (let x = 0; x < arrayToDisplay.length; x++) {
    const myLine = document.createElement("tr");
    myTable.appendChild(myLine);

    for (let y = 0; y < arrayToDisplay[x].length; y++) {
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
const linesInput = document.querySelector("#lines");
const columnsInput = document.querySelector("#columns");
const initialString = document.getElementById("initString");

btnCreateElement.addEventListener("click", function (e) {
  if (!myForm.checkValidity()) return;
  console.log("submit from ", e.target.id, this.id);
  e.preventDefault();
  const myArr = createTableWithInitString(
    linesInput.value,
    columnsInput.value,
    initialString.value
  );
  createDynamicHtmlTableWithCreateElement("#tableContainer", myArr);
});

btnInnerHtml.addEventListener("click", function (e) {
    if(!myForm.checkValidity()) return;
    console.log("submit from ", e.target.id, this.id);
    e.preventDefault();
    const myArr = createTableWithInitString(
        linesInput.value,
        columnsInput.value,
        initialString.value
    );
    createDynamicHtmlTableWithInnerHtml("#tableContainer", myArr);
})
