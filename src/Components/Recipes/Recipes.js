import React, {Component} from 'react';
import axios from 'axios';

class Recipes extends Component {
    constructor(props) {
        super(props)
        this.state = {
            recipes: []
        }
    }

    componentDidMount(){
        this.getRecipes()
    }

    getRecipes = () => {
        axios.get('/api/recipes')
        .then(res => this.setState({recipes: res.data}))
        .catch(err => console.log(err))
    }

    render () {
        console.log(this.state)
        const mappedRecipes = this.state.recipes.map((recipe) => (
            <div>
                <img key={recipe.recipe_id} src={recipe.recipe_img} alt='LullyLemon Recipe'/>
                <h1>{recipe.title}</h1>
                <h3>Ingredients</h3>
                <p>{recipe.ingredients}</p>
                <h3>Instructions</h3>
                <p>{recipe.instructions}</p>
            </div>
        ))
        return (
            <div>
                {mappedRecipes}
            </div>
        )
    }
}

export default Recipes;