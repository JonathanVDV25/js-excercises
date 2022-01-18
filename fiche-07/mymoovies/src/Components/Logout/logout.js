import Navbar from "../Navbar/Navbar";
import { Redirect } from "../Router/Router";
import { removeSessionObject } from "../../utils/session";

const Logout = () => {
    console.log("logout");
    removeSessionObject("user");

    Navbar();
    Redirect("/login");
};

export default Logout;