const jwt = require("jsonwebtoken")
const jwtConfig = require("../config/jwt")

module.exports = (req, res, next) => {
    try {
        if(req.url === "/logout") {
            const {token} = req.cookies

            jwt.verify(token, "logout")
            next()
        }
        if(req.url !== "/login" && req.url !== "/registration") {
            const {token} = req.cookies

            jwt.verify(token, jwtConfig.JWT_SECRET_KEY)
            next()
        } else {
            next()
        }
    } catch (error) {
        console.log(error)
        res.status(403).redirect("/login")
    }
}