module.exports = {

    getRecipes:  (req, res) => {
        const db = req.app.get('db')

        db.recipes.get_recipes()
        .then(recipes => res.status(200).send(recipes))
        .catch(err => res.status(500).send(err))
    }
}