import React, {Component} from 'react';
import {connect} from 'react-redux'
import {saveRecipe} from '../../ducks/recipeReducer'
import axios from 'axios';
import './Recipes.css';

class Recipes extends Component {

    componentDidMount(){
        this.getRecipes()
    }

    getRecipes = () => {
        axios.get('/api/recipes')
        .then(res => this.props.saveRecipe(res.data))
        .catch(err => console.log(err))
    }

    saveRecipe = (recipeId, recipeImg, title, ingredients, instructions) => {
        axios.post(`/api/recipes/${recipeId}`, {recipeImg, title, ingredients, instructions})
        .then(() => {this.props.history.push('/my-cookbook')})
        .catch(err => console.log(err))
    }

    render () {
        console.log(this.props)
        const mappedRecipes = this.props.recipeReducer.savedRecipes.map((recipe) => (
            <div className='recipe-card'>
                <img className='recipe-img' key={recipe.recipe_id} src={recipe.recipe_img} alt='LullyLemon Recipe'/>
                <section className='title'>
                    <h1>{recipe.title}</h1>
                    <button onClick={() => this.saveRecipe(recipe.ur_id, recipe.recipe_img, recipe.title, recipe.ingredients, recipe.instructions)}>Save</button>
                </section>
                <section className='ingredients'>
                    <h3>Ingredients</h3>
                    <p>{recipe.ingredients}</p>
                </section>
                <section className='instructions'>
                    <h3>Instructions</h3>
                    <p>{recipe.instructions}</p>
                </section>
            </div>
        ))
        return (
            <div>
                {mappedRecipes}
            </div>
        )
    }
}

const mapStateToProps = reduxState => reduxState

export default connect(mapStateToProps, {saveRecipe})(Recipes);