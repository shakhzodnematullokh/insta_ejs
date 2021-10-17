const IO = require("../utils/io")
const path = require("path")

module.exports = {
    GET: async (req, res) => {
        try {
            const {token} = req.cookies
            const postsIO = new IO(path.resolve(__dirname, "../../db/posts.json"))
            const usersIO = new IO(path.resolve(__dirname, "../../db/users.json"))
    
            const oldPosts = JSON.parse(await postsIO.read())
            const users = JSON.parse(await usersIO.read())
            
            const foundUser = users.find(u => u.token === token)
            const userPosts = []
            oldPosts.forEach(p => {
                if(p.username === foundUser.username) {
                    userPosts.push(p)
                }
            })

            res.status(200).render("profile.ejs", {
                foundUser,
                userPosts
            }) 
        } catch (error) {
            console.log(error)
            res.status(500).json({
                error
            })
        }
    }
}