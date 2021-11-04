import conjuringImage from "./img/conjuring3.jpg";
import fastAndFuriousImage from "./img/fastAndFurious9.jpg";
// Import Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";


// This is the entry point to your app : add all relevant import and custom code

const homePage = `
<div class="text-center">
  <h3>Welcome to myMoovies !</h3>

  <p>Here you can find a selection of our favorite moovies ; )</p>
  <div class="pb-3">
    <img 
        class="img-thumbnail w-50" 
        src="${conjuringImage}" 
        alt="Conjuring 3" />
  </div>

  <div>
    <img
      class="img-thumbnail w-50"
      src="${fastAndFuriousImage}"
      alt="Fast and Furious 9"
    />
  </div>
</div>`;

const main = document.querySelector("main");

main.innerHTML = homePage;


