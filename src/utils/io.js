const fs = require("fs")
const util = require("util")

const readFile = util.promisify(fs.readFile)
const writeFile = util.promisify(fs.writeFile)

class IO {
    dir

    constructor(dir) {
        this.dir = dir
    }

    read() {
        return new Promise((res, rej) => {
            try {
                const data = readFile(this.dir, "utf-8")
                res(data.length ? JSON.parse(data) : data)
            } catch (error) {
                rej(error)
            }
        })
    }

    write(data) {
        writeFile(this.dir, JSON.stringify(data, null, 2))
    }
}

module.exports = IO