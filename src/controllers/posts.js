const IO = require("../utils/io")
const Posts = require("../patterns/post")
const path = require("path")
const { v4: uuid } = require("uuid")

const POST = async (req, res) => {
    const { content } = req.body
    const {token} = req.cookies
    let fName = null
    let lName = null
    let username = null
    
    try {
        const postsIO = new IO(path.resolve(__dirname, "../../db/posts.json"))
        const usersIO = new IO(path.resolve(__dirname, "../../db/users.json"))
        
        const oldPosts = await postsIO.read()
        const users = JSON.parse(await usersIO.read())
                    
        users.forEach(u => {
            if((u.token == token)) {
                fName = u.fName,
                lName = u.lName,
                username = u.username
            }
        })
        if(req.files) {
            const { poster } = req.files
            const posterName = `${uuid()}.${poster.mimetype.split("/")[1]}`
            
            const foundUser = users.find(u => u.token === token)

            const dir = path.resolve(__dirname, "../uploads/posts/", posterName)
            
            poster.mv(dir, (_) => {})
        
            const posts = new Posts()

            const newPost = posts.makePost(fName, lName, username, content, foundUser.avatarName,  posterName)

            if(!oldPosts) {
                postsIO.write([newPost])
            } else {
                const oldPosts = JSON.parse(await postsIO.read())
                postsIO.write([newPost, ...oldPosts])
            }
            
            res.status(202).redirect("/")
        } else {
            const users = JSON.parse(await usersIO.read())
            const foundUser = users.find(u => u.token === token)
            const posts = new Posts()

            const newPost = posts.makePost(fName, lName, username, content, foundUser.avatarName)
    
            if(!oldPosts) {
                postsIO.write([newPost])
            } else {
                const oldPosts = JSON.parse(await postsIO.read())
                postsIO.write([newPost, ...oldPosts])
            }
            
            res.status(202).redirect("/")
        }
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            error
        })
    }
}

module.exports = {
    POST
}