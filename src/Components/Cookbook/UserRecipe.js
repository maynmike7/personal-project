import React, {Component}from 'react';
import axios from 'axios';

export default class UserRecipe extends Component {
    constructor(props) {
        super(props)
        this.state = {
            editView: false,
            title: ''
        }
    }

    deleteRecipe = (id) => {
        axios.delete(`api/recipes/${id}`)
        .then(() => {
            this.getUserRecipes()
        })
        .catch(err => console.log(err))
    }

    handleInput = (val) => {
        this.setState({title: val})
    }

    handleEditView = () => {
        this.setState({editView: !this.state.editView})
    }

    editTitle = (id) => {
        const {title} = this.state
        axios.put(`/api/recipes/${id}`, {title})
        .then(() => {
            this.props.getUserRecipes()
            this.handleEditView()
            this.setState({title: ''})
        })
        .catch(err => console.log(err))
    }

    render() {
        const {recipe} = this.props
        return (
            (
                <div className='recipe-card'>
                    <img className='recipe-img' key={recipe.ur_id} src={recipe.recipe_img} alt='LullyLemon Recipe'/>
                    <section className='title'>
                        {!this.state.editView
                        ? <h2>{recipe.title} <button onClick={this.handleEditView}>Edit</button></h2>
                        : (<div>
                            <input 
                                value={this.state.title}
                                placeholder='New Title'
                                onChange={(e) => this.handleInput(e.target.value)}/>
                            <button onClick={() => this.editTitle(recipe.ur_id)}>Submit</button>
                        </div>)}
                        <button onClick={() => this.deleteRecipe(recipe.ur_id)}>Remove</button>
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
            )
        )
    }
}