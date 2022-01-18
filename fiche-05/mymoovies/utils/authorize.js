const jwt = require("jsonwebtoken");
const jwtSecret = "ilovejavascript!";

const { Users } = require("../models/users");
const UserModel = new Users();

/**
 * Authorize middleware to be used on the routes to be secured/
 * This middleware authorize only user that have a valid JWT
 * and which are still present in the list of potential authenticated users
 */
const authorize = (req, res, next) => {
    let token = req.get("authorization");
    if(!token) return res.status(401).end();

    try {
        const decoded = jwt.verify(token, jwtSecret);
        //Check if decoded.username exists in users
        const userfound = UserModel.getOneByUsername(decoded.username);

        if(!userfound) return res.status(403).end();

        //we could load the user in the request.user object so that it is available by all
        //other middleware
        req.user = userfound;
        next(); // call the next Middleware
    } catch (err){
        console.log("authorize: ", err);
        return res.status(403).end();
    }
};

module.exports = { authorize };