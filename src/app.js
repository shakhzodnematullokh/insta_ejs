const express = require("express")
const cors = require("cors")
const path = require("path")
const cookie = require("cookie-parser")
const serverConfig = require("./config/server")

// Controllers

const HomeController = require("./controllers/home")
const PostsController = require("./controllers/posts")
const LoginController = require("./controllers/login")
const RegistrationController = require("./controllers/registration")
const ProfileController = require("./controllers/profile")
const DashboardController = require("./controllers/dashboard")

// Middlewares

const AuthMiddleware = require("./middlewares/auth")

const app = express()

app.use(cors())
app.use(express.json())
app.use(require("express-fileupload")())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, "public")))
app.use(cookie())
app.use(AuthMiddleware)

app.set("views engine", "views")
app.set("views", path.join(__dirname, "views"))

app.get("/", HomeController.GET)
app.get("/login", LoginController.GET)
app.get("/registration", RegistrationController.GET)
app.get("/profile", ProfileController.GET)
app.get("/dashboard", DashboardController.GET)
app.get("/images/:posterName", (req, res) => {
    const { posterName } = req.params

    res.sendFile(path.resolve(__dirname, "uploads/posts/", posterName))
})
app.get("/user/:avatarName", (req, res) => {
    const { avatarName } = req.params
    res.sendFile(path.resolve(__dirname, "uploads/users/", avatarName))
})


app.post("/posts", PostsController.POST)
app.post("/registration", RegistrationController.POST)
app.post("/login", LoginController.POST)

app.listen(serverConfig.PORT, console.log("Running on: " + serverConfig.PORT))