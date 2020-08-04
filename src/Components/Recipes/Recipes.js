import React, {Component} from 'react';
import {connect} from 'react-redux'
import {saveRecipe} from '../../ducks/recipeReducer'
import axios from 'axios';
import './Recipes.css';

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
        console.log(this.props)
        const mappedRecipes = this.state.recipes.map((recipe) => (
            <div className='recipe-card'>
                <img className='recipe-img' key={recipe.recipe_id} src={recipe.recipe_img} alt='LullyLemon Recipe'/>
                <section className='title'>
                    <h1>{recipe.title}</h1>
                    <button onClick={() => this.props.saveRecipe(recipe.ur_id)}>Save</button>
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