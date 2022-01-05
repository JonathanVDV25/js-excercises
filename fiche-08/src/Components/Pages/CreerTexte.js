/**
 * Render the HomePage
 */

 const CreerTexte = () => { 
    const pageDiv = document.querySelector("#page");
    const creer = document.getElementById("creer");

    function afficherFormulaireCreerTexte(){
        pageDiv.innerHTML = ` <h2> Ajout d'un texte à dactylographier </h2>
                            <div id="textArea"><textarea name="texte" rows="20" cols="60"></textarea></div>
                            <select name="niveau">
                                <option value="">Veillez choissir un niveau</option>
                                <option value="facile" class="s">Facile</option>
                                <option value="moyen" class="s">Moyen</option>
                                <option value="difficile" class="s">Difficile</option>
                            </select>
                            <br /><button id="btnSubmit"> Envoyer </button>
                            <p> Statut opération </p>
        `;
    }

    creer.addEventListener("click", afficherFormulaireCreerTexte);

  };
  
  export default CreerTexte;
  