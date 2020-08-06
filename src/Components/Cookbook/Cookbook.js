import React, {Component} from 'react';
import UserRecipe from './UserRecipe';
import {connect} from 'react-redux';
import {clearUser} from '../../ducks/usersReducer'
import axios from 'axios';

class Cookbook extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userRecipes: []
        }
    }

    componentDidMount(){
        if(!this.props.usersReducer.user.email){
            this.props.history.push('/login')
        }
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
        const mappedUserRecipes = this.state.userRecipes.map((recipe) => <UserRecipe getUserRecipes={this.getUserRecipes} recipe={recipe}/>)
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