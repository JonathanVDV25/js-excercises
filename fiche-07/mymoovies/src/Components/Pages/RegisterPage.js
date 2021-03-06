import { Redirect } from "../Router/Router";
import { setSessionObject } from "../../utils/session";
import Navbar from "../Navbar/Navbar";
/**
 * View the Register form :
 * render a register page into the main
 */
function RegisterPage(){
    //reset main
    const main = document.querySelector("main");
    main.innerHTML = "";
    //Create a login form
    const form = document.createElement("form");
    form.className = "p-5";
    const username = document.createElement("input");
    username.type = "text";
    username.id = "username";
    username.placeholder = "username";
    username.required = true;
    username.className = "form-control mb-3";
    const password = document.createElement("input");
    password.type = "password";
    password.id = "password";
    password.required = true;
    password.placeholder = "password";
    password.className = "form-co ntrol mb-3";
    const submit = document.createElement("input"); 
    submit.value = "Register";
    submit.type = "submit";
    submit.className = "btn btn-danger";
    form.appendChild(username);
    form.appendChild(password);
    form.appendChild(submit);

    form.addEventListener("submit", onSubmit);
    main.appendChild(form);

    async function onSubmit(e) {
        e.preventDefault();
        const username = document.getElementById("username")
        const password = document.getElementById("password");
        console.log("credentials:", username.value, password.value);
        try {
            const options = {
                method: "POST",
                body: JSON.stringify({
                    username: username.value,
                    password: password.value,
                }), // body data type must match "Content-Type" header
                headers: {
                    "Content-Type": "application/json",
                },
            };

            const response = await fetch("/api/auths/register", options);

            if(!response.ok){
                throw new Error(
                    "fetch error : " + response.status + " : " + response.statusText
                  );
            }
            const user = await response.json();
            console.log("user authenticated:", user);
            // save the user into lacalStorage
            setSessionObject("user", user);

            //Render the navbar for an authenticated user
            Navbar();

            //call the HomePage via the Router
            Redirect("/");
        } catch(err){
            console.error("RegisterPage::error: ", error);
        }
    }
}

export default RegisterPage;