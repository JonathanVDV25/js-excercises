import tab_texts from "./default_texts";
/**
 * Render the HomePage
 */

 const Dactylographier = () => { 
    console.log(tab_texts.filter(t => t.id === 1).map(t => t.content).toString());
    const pageDiv = document.querySelector("#page");

    const dac = document.getElementById("dactylo");

    let btnSelectNiveau;
    function afficherFormulaireDactylographier(){
        pageDiv.innerHTML = `<h2> Texte à dactylographier </h2>
                        <form>
                        <select name="niveau">
                            <option value="">Veillez choissir un niveau</option>
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

    function afficherTexte(){
        //var choix = niveau.options[niveau.selectedIndex].value;
        let choix = btnSelectNiveau.options[btnSelectNiveau.selectedIndex].value;
        let compteur = 0;
        let nbrTextNiveau = tab_texts.filter(t => t.level === choix).forEach(t => compteur++);
        console.log(compteur);
        let number = Math.floor(Math.random() * compteur); // 0,1, .. compteur
        let texteAAfficher = tab_texts.filter(t => t.level === choix && t.id % compteur === number).map(t => "\n" + t.content).toString();
        //ça ne marche que si y a que 2 textes dispo !!
        
        let texte = document.getElementById("texteDactylographier");
        let texteArea = document.getElementById("textArea").innerHTML = `<textarea name="texte" rows="20" cols="60"></textarea>`;
        texte.innerText = texteAAfficher;
    }

    dac.addEventListener("click", afficherFormulaireDactylographier);

  };
  
  export default Dactylographier;
  