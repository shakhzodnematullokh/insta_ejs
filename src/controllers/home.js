const IO = require("../utils/io")
const path = require("path")

module.exports = {
    GET: async (_, res) => {
        try {
            const postsIO = new IO(path.resolve(__dirname, "../../db/posts.json"))
    
            const oldPosts = JSON.parse(await postsIO.read())

            res.status(200).render("index.ejs", {
                oldPosts
            }) 
        } catch (error) {
            console.log(error)
            res.status(500).json({
                error
            })
        }
    }
}