import conjuringImage from "../../img/conjuring3.jpg";
import ff9Image from "../../img/fastAndFurious9.jpg";

const homePage = `
<div class="text-center">
    <h3> Welcome to myMoovies ! </h3>
    
    <p> Here you can find a selection of our favorite moovies ; ) </p>
    <div class="pb-3">
        <img class="img-thumbnail w-50" src="${conjuringImage}" alt="conjuring 3" />
    </div>
    
    <div>
        <img
            class="img-thumbnail w-50"
            src="${ff9Image}" 
            alt="fast and furious 9"
        />
    </div>
</div>`;

const HomePage = () => {
    const main = document.querySelector("main");
    main.innerHTML = homePage;
};

export default HomePage;
