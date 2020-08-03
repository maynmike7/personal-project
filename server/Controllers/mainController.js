module.exports = {

    getRecipes:  (req, res) => {
        const db = req.app.get('db')

        db.recipes.get_recipes()
        .then(recipes => res.status(200).send(recipes))
        .catch(err => res.status(500).send(err))
    },

    getUserRecipes: (req, res) => {
        const {id} = req.params,
              db = req.app.get('db')

        db.recipes.get_user_recipes(id)
        .then(recipe => res.status(200).send(recipe))
        .catch(err => res.status(500).send(err))
    },

    addRecipe:  (req, res) => {
        const {id, recipeImg, title, ingredients, instructions} = req.body,
              db = req.app.get('db')

        db.recipes.add_recipe(id, recipeImg, title, ingredients, instructions)
        .then(() => res.sendStatus(200))
        .catch(err => res.status(500).send(err))
    }
}