import React, {Component} from 'react';
import {connect} from 'react-redux';
import {clearUser} from '../../ducks/usersReducer'
import axios from 'axios';

class Cookbook extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userRecipes: [],
            editView: false,
            title: ''
        }
    }

    componentDidMount(){
        this.getUserRecipes()
    }

    getUserRecipes = () => {
        axios.get(`/api/recipes/${this.props.usersReducer.user.user_id}`)
        .then(res => {
            console.log(res.data)
            this.setState({userRecipes: res.data})
        })
        .catch(err => console.log(err));
    }

    handleAddRecipe = () => {
        this.props.history.push('/new-recipe')
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
            this.getUserRecipes()
            this.handleEditView()
            this.setState({title: ''})
        })
        .catch(err => console.log(err))
    }

    render () {
        console.log(this.state)
        console.log(this.props)
        // const mappedSavedRecipes = this.props.recipeReducer.savedRecipes.map((recipe) => (
        //     <div>
        //         <img key={recipe.recipe_id} src={recipe.recipe_img} alt='LullyLemon Recipe'/>
        //         <h1>{recipe.title}</h1>
        //         <h3>Ingredients</h3>
        //         <p>{recipe.ingredients}</p>
        //         <h3>Instructions</h3>
        //         <p>{recipe.instructions}</p>
        //         <button>Delete</button>
        //     </div>
        // ))
        const mappedUserRecipes = this.state.userRecipes.map((recipe) => (
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
        ))
        return (
            <div>
                <h1>My Cookbook</h1>
                {mappedUserRecipes}
                {/* {mappedSavedRecipes} */}
                <button onClick={() => {this.props.history.push('/new-recipe')}}>Add Recipe</button>
            </div>
        )
    }
}

const mapStateToProps = reduxState => reduxState

export default connect(mapStateToProps, {clearUser})(Cookbook);