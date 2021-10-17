class Post {
    fName
    lName
    username
    content
    avatarName
    posterName

    constructor(fName, lName, username, content, avatarName, posterName) {
        this.fName = fName,
        this.lName = lName,
        this.username = username,
        this.content = content,
        this.avatarName = avatarName,
        this.posterName = posterName
    }
}

class Posts {

    constructor() {}

    makePost(fName, lName, username, content, avatarName, posterName) {
        return new Post(fName, lName, username, content, avatarName, posterName)
    }
}

module.exports = Posts