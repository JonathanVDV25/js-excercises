import tab_texts from "./default_texts";
/**
 * Render the HomePage
 */

 const Dactylographier = () => { 
    //console.log(tab_texts.filter(t => t.id === 1).map(t => t.content).toString());
    const pageDiv = document.querySelector("#page");

    const dac = document.getElementById("dactylo");

    let btnSelectNiveau;
    function afficherFormulaireDactylographier(){
        pageDiv.innerHTML = `<h2> Texte à dactylographier </h2>
                        <form>
                        <select name="niveau">
                            <option value="no">Veillez choissir un niveau</option>
                            <option value="facile" class="s">Facile</option>
                            <option value="moyen" class="s">Moyen</option>
                            <option value="difficile" class="s">Difficile</option>
                        </select>
                        <p id="texteDactylographier"> Le texte à dactylographier sera repris ici une fois le niveau sélectionné.</p>
                        <div id="textArea"><textarea name="texte" disabled="true" rows="20" cols="60"></textarea></div>
                        </form>`;
                        
    btnSelectNiveau = document.querySelector("select");
    btnSelectNiveau.addEventListener("change", afficherTexte);
                                         
    }

    async function afficherTexte(){ //Mettre async
        let choix = btnSelectNiveau.options[btnSelectNiveau.selectedIndex].value;
        if(choix === "no") return;

        const response = await fetch("/api/texts/" + choix); // fetch return a promise => we wait for the response

        if (!response.ok) {
            // status code was not 200, error status code
            throw new Error(
              "fetch error : " + response.status + " : " + response.statusText
            );
        }
        const texts = await response.json(); // json() returns a promise => we wait for the data

        let texte = document.getElementById("texteDactylographier");
        let texteArea = document.getElementById("textArea").innerHTML = `<textarea name="texte" rows="20" cols="60"></textarea>`;
        console.log(texts);
        console.log(texts[0].content);
        texte.innerText = texts[0].content;
        //texts.foreach(t => texte.innerText = "zalut");
    }

    dac.addEventListener("click", afficherFormulaireDactylographier);

  };
  
  export default Dactylographier;
  