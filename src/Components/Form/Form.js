import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';

class Form extends Component {
    constructor (props) {
        super (props)
        this.state = {
            recipeImg: '',
            title:'',
            ingredients:'',
            instructions:''
        }
    }

    handleInput = (event) => {
        this.setState({[event.target.name]: event.target.value})
    }

    createPost = () => {
        axios.post('/api/recipes', {id: this.props.usersReducer.user.user_id, recipeImg: this.state.recipeImg, title: this.state.title, ingredients: this.state.ingredients, instructions: this.state.instructions})
        .then(() => {this.props.history.push('/my-cookbook')})
        .catch(err => console.log(err));
    }

    render () {
        console.log(this.state)
        console.log(this.props)
        return (
            <div>
                <h1>Add Recipe</h1>
                <input
                    value={this.state.recipeImg}
                    name='recipeImg'
                    placeholder='Add Image URL'
                    onChange={(e) => this.handleInput(e)}/>
                <input
                    value={this.state.title}
                    name='title'
                    placeholder='Add Title'
                    onChange={(e) => this.handleInput(e)}/>
                <input
                    value={this.state.ingredients}
                    name='ingredients'
                    placeholder='Add Ingredients'
                    onChange={(e) => this.handleInput(e)}/>
                <input
                    value={this.state.instructions}
                    name='instructions'
                    placeholder='Add Insturctions'
                    onChange={(e) => this.handleInput(e)}/>
                <button onClick={this.createPost}>Add</button>
            </div>
        )
    }
}

const mapStateToProps = reduxState => reduxState

export default connect(mapStateToProps)(Form);