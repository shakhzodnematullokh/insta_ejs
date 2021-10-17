const IO = require("../utils/io")
const path = require("path")

module.exports = {
    GET: (_, res) => {
        try {
            res.status(200).render("login.ejs") 
        } catch (error) {
            res.status(500).json({
                error
            })
        }
    },

    POST: async (req, res) => {
        const {username, password} = req.body
        const {token} = req.cookies
        
        try {
            const usersIO = new IO(path.resolve(__dirname, "../../db/users.json"))
            const users = JSON.parse(await usersIO.read())

            if(token && username && password) {
                const foundUser = users.find(u => u.token === token)

                if(foundUser) {
                    res.status(200).redirect("/")
                } else {
                    res.status(403).json({
                        message: "User not found. Please register."
                    })
                }
            } else {
                res.status(403).json({
                    message: "User not found. Please register."
                })
            }
        } catch (error) {
            console.log(error)
            res.status(500).json({
                error
            })
        }
    }
}