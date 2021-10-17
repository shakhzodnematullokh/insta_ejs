module.exports = {
    GET: async (req, res) => {
        try {
            res.status(200).render("dashboard.ejs") 
        } catch (error) {
            console.log(error)
            res.status(500).json({
                error
            })
        }
    }
}