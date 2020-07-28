import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {getUser} from '../../ducks/reducer'

class Auth extends Component {
    constructor (props) {
        super (props) 
        this.state = {
            email: '',
            username: '',
            password: '',
            verPassword: '',
            registerView: false
        }
    }

    handleInput = (event) => {
        this.setState({[event.target.name]: event.target.value})
    }

    handleToggle = () => {
        this.setState({registerView: !this.state.registerView})
    }  
    
    handleRegister = () => {
        const {email, username, password, verPassword} = this.state
        if(password && password === verPassword){
            axios.post('/api/register', {email, username, password})
            .then(res => {
                this.props.getUser(res.data)
                this.props.history.push('/my-cookbook')
            })
            .catch(err => console.log(err)) 
        } else {
            alert('Passwords do not match')
        }
    }

    handleLogin = () => {
        const {email, password} = this.state
        axios.post('/api/login', {email, password})
        .then(res => {
            this.props.getUser(res.data)
            this.props.history.push('/my-cookbook')
        })
        .catch(err => console.log(err))
    }

    render () {
        // console.log(this.state)
        return (
            <div>
                <section>
                    <h1>Welcome to LullyLemon</h1>
                    {this.state.registerView
                    ? (<>
                        <h3>Register Below</h3>
                        <input 
                            value={this.state.username}
                            name='username'
                            placeholder='Username'
                            onChange={(e) => this.handleInput(e)}/>
                       </>)
                    : <h3>Login Below</h3>}
                    <input 
                        value={this.state.email}
                        name='email'
                        placeholder='Email'
                        onChange={(e) => this.handleInput(e)}/>
                    <input 
                        type='password'
                        value={this.state.password}
                        name='password'
                        placeholder='Password'
                        onChange={(e) => this.handleInput(e)}/>
                    {this.state.registerView
                    ? (<>
                        <input 
                            type='password'
                            value={this.state.verPassword}
                            name='verPassword'
                            placeholder='Verify Password'
                            onChange={(e) => this.handleInput(e)}/>
                        <button onClick={this.handleRegister}>Register</button>
                        <p>Have an account? <span onClick={this.handleToggle}>Login Here</span></p>
                       </>)
                    : (<>
                        <button onClick={this.handleLogin}>Login</button>
                        <p>Don't have an account? <span onClick={this.handleToggle}>Register Here</span></p>
                       </>)}
                </section>
            </div>
        )
    }
}

export default connect(null, {getUser})(Auth);