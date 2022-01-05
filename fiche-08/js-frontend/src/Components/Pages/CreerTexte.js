/**
 * Render the HomePage
 */

 const CreerTexte = () => { 
    const pageDiv = document.querySelector("#page");
    const creer = document.getElementById("creer");

    let btnSelectLevel;
    let btnSubmit;
    let levelChoosed = null;

    function afficherFormulaireCreerTexte(){
        pageDiv.innerHTML = ` <h2> Ajout d'un texte à dactylographier </h2>
                            <div id="textArea"><textarea id="textEntered" name="texte" rows="20" cols="60"></textarea></div>
                            <select name="niveau">
                                <option value="">Veillez choissir un niveau</option>
                                <option value="facile" class="s">Facile</option>
                                <option value="moyen" class="s">Moyen</option>
                                <option value="difficile" class="s">Difficile</option>
                            </select>
                            <br /><button id="btnSubmit"> Envoyer </button>
                            <div id="statut"> Statut opération </div>
        `;
        btnSelectLevel = document.querySelector("select");
        btnSelectLevel.addEventListener("change", () => {
                                levelChoosed = btnSelectLevel.options[btnSelectLevel.selectedIndex].value;
        })

        btnSubmit = document.getElementById("btnSubmit");
        btnSubmit.addEventListener("click", ajouterTexte);
    }

    creer.addEventListener("click", afficherFormulaireCreerTexte);

    async function ajouterTexte(){
        console.log(levelChoosed);
        let textEntered = document.getElementById("textEntered");
        const status = document.getElementById("statut");
        console.log(textEntered.value);
        if(textEntered.value.length === 0 || levelChoosed == null) {
            status.innerText = "Erreur tous les champs doivent être remplis !";
            return;
        } else {
            try {
                const options = {
                    method: "POST",
                    body: JSON.stringify({
                        content: textEntered.value,
                        level: levelChoosed,
                    }),
                    headers: {
                        "Content-Type": "application/json",
                      },
                };

                const response = await fetch("/api/texts", options); // fetch return a promise => we wait for the response

                if (!response.ok) {
                    throw new Error(
                      "fetch error : " + response.status + " : " + response.statusText
                    );
                }
                status.innerText = "Enregistré";
            } catch (error) {
                console.error("AddText::error: ", error);
              }
        }
        console.log("zizi");
    }

  };
  
  export default CreerTexte;
  