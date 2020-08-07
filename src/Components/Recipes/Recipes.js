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

    saveRecipe = (i) => {
        console.log(i)
    axios.post(`/api/recipes/${this.props.recipeReducer.savedRecipes[i].recipe_id}`, {id: this.props.usersReducer.user.user_id, recipeImg: this.props.recipeReducer.savedRecipes[i].recipe_img, title: this.props.recipeReducer.savedRecipes[i].title, ingredients: this.props.recipeReducer.savedRecipes[i].ingredients, instructions: this.props.recipeReducer.savedRecipes[i].instructions})
        .then(() => {this.props.history.push('/my-cookbook')})
        .catch(err => console.log(err))
    }



    render () {
        console.log(this.props)
        const mappedRecipes = this.props.recipeReducer.savedRecipes.map((recipe, index) => (
            <div className='recipe-card'>
                <img className='recipe-img' key={recipe.recipe_id} src={recipe.recipe_img} alt='LullyLemon Recipe'/>
                <section className='title'>
                    <h1>{recipe.title}</h1>
                    <button onClick={() => this.saveRecipe(index)
                        // recipe.ur_id, recipe.recipe_img, recipe.title, recipe.ingredients, recipe.instructions
                        }>Save</button>
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
            <div className='recipes-body'>
                {mappedRecipes}
            </div>
        )
    }
}

const mapStateToProps = reduxState => reduxState

export default connect(mapStateToProps, {saveRecipe})(Recipes);