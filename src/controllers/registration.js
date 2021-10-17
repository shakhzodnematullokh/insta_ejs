const jwt = require("jsonwebtoken")
const jwtConfig = require("../config/jwt")
const IO = require("../utils/io")
const path = require("path")
const { v4 : uuid } = require("uuid")

module.exports = {
    GET: (_, res) => {
        try {
            res.status(200).render("registration.ejs")
        } catch (error) {
            res.status(500).json({
                error
            })
        }
    },

    POST: async (req, res) => {
        const {fname, lname, username, password} = req.body
        const { avatar } = req.files

        
        try {
            const uniqueId = uuid()
            const regToken = jwt.sign({ userId: `${uniqueId}` }, jwtConfig.JWT_SECRET_KEY)
            
            const usersIO = new IO(path.resolve(__dirname, "../../db/users.json"))
            const users = await usersIO.read()

            const avatarName = `${uuid()}.${avatar.mimetype.split("/")[1]}`
    
            const dir = path.resolve(__dirname, "../uploads/users/", avatarName)
            
            avatar.mv(dir, (_) => {})

            const user = {
                fname,
                lname,
                username,
                password,
                token: `${regToken}`,
                avatarName
            }

            if(!users) {
                usersIO.write([user])
            } else {
                const users = JSON.parse(await usersIO.read())
                usersIO.write([user, ...users])
            }
            res.cookie("token", `${regToken}`)
            res.status(202).redirect("/")
        } catch (error) {
            console.log(error)
            res.status(500).json({
                error
            })
        }
    }
}