module.exports = {
    
    getRecipes:  (req, res) => {
        const db = req.app.get('db')

        db.recipes.get_recipes()
        .then(recipe => res.status(200).send(recipe))
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
    },

    editRecipeTitle: (req, res) => {
        const {id} = req.params,
              {title} = req.body,
              db = req.app.get('db')

        db.recipes.edit_recipe_title(title, id)
        .then(recipe => res.status(200).send(recipe))
        .catch(err => console.log(err))
    },

    deleteRecipe: (req, res) => {
        const {id} = req.params,
              db = req.app.get('db')

        db.recipes.delete_recipe(id)
        .then(() => res.sendStatus(200))
        .catch(err => res.status(500).send(err))
    },

    saveRecipe: (req, res) => {
        const {id, recipeImg, title, ingredients, instructions} = req.body,
              db = req.app.get('db')

        db.recipes.save_recipe(id, recipeImg, title, ingredients, instructions)
        .then(() => res.sendStatus(200))
        .catch(err => res.status(500).send(err))
    }
}