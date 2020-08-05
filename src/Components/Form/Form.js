import React, {useState} from 'react';
// import {connect} from 'react-redux';
import axios from 'axios';

import {useSelector} from 'react-redux'

const Form = (props) => {

    const userId = useSelector((state) => state.usersReducer.user.user_id)

    let [recipeImg, setRecipeImg] = useState('')
    let [title, setTitle] = useState('')
    let [ingredients, setIngredients] = useState('')
    let [instructions, setInstructions] = useState('')
    // constructor (props) {
    //     super (props)
    //     this.state = {
    //         recipeImg: '',
    //         title:'',
    //         ingredients:'',
    //         instructions:''
    //     }
    // }

    // handleInput = (event) => {
    //     this.setState({[event.target.name]: event.target.value})
    // }

    const addRecipe = () => {
        
        axios.post('/api/recipes', {id: userId, recipeImg, title, ingredients, instructions})
        .then(() => {props.history.push('/my-cookbook')})
        .catch(err => console.log(err));
    }

    // render () {
    //     console.log(this.state)
    //     console.log(this.props)
    console.log(userId)
        return (
            <div>
                <h1>Add Recipe</h1>
                <input
                    value={recipeImg}
                    name='recipeImg'
                    placeholder='Add Image URL'
                    onChange={(e) => setRecipeImg(e.target.value)}/>
                <input
                    value={title}
                    name='title'
                    placeholder='Add Title'
                    onChange={(e) => setTitle(e.target.value)}/>
                <input
                    value={ingredients}
                    name='ingredients'
                    placeholder='Add Ingredients'
                    onChange={(e) => setIngredients(e.target.value)}/>
                <input
                    value={instructions}
                    name='instructions'
                    placeholder='Add Insturctions'
                    onChange={(e) => setInstructions(e.target.value)}/>
                <button onClick={addRecipe}>Add</button>
            </div>
        )
    // }
}

// const mapStateToProps = reduxState => reduxState

// export default connect(mapStateToProps)(Form);
export default Form;