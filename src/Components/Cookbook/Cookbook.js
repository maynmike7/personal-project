import React, {Component} from 'react';
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
        this.getUserRecipes()
    }

    getUserRecipes = () => {
        axios.get(`/api/recipes/${this.props.usersReducer.user.user_id}`)
        .then(res => this.setState({userRecipes: res.data}))
        .catch(err => console.log(err));
    }

    handleLogout = () => {
        axios.get('/api/logout')
        .then(() => {
            this.props.clearUser()
            this.props.history.push('/landing')
        })
        .catch(err => console.log(err))
    }

    render () {
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
                <img className='recipe-img' key={recipe.recipe_id} src={recipe.recipe_img} alt='LullyLemon Recipe'/>
                <section className='title'>
                    <h1>{recipe.title}</h1>
                    <button>Remove</button>
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
                {/* <button onClick={this.props.history.push('/new-recipe')}>Add Recipe</button> */}
            </div>
        )
    }
}

const mapStateToProps = reduxState => reduxState

export default connect(mapStateToProps, {clearUser})(Cookbook);