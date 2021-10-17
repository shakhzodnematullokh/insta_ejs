require("dotenv").config()

const { env } = process

module.exports = {
    JWT_SECRET_KEY: env.JWT_SECRET_KEY
}