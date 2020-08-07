import React, {useState} from 'react';
import axios from 'axios';
import {useDispatch} from 'react-redux'
import './Auth.css'
// import {connect} from 'react-redux';
// import {getUser} from '../../ducks/usersReducer'

const Auth = (props) => {
    // constructor (props) {
    //     super (props) 
    //     this.state = {
    //         email: '',
    //         username: '',
    //         password: '',
    //         verPassword: '',
    //         registerView: false
    //     }
    // }

    // const handleInput = (event) => {
    //     this.setState({[event.target.name]: event.target.value})
    // }

    const getUser = useDispatch()
    
    let [email, setEmail] = useState('')
    let [username, setUsername] = useState('')
    let [password, setPassword] = useState('')
    let [verPassword, setVerPassword] = useState('')
    let [registerView, setRegisterView] = useState(false)
    
    const handleToggle = () => {
        setRegisterView(!registerView)
    }  
    
    const handleRegister = () => {
        // const {email, username, password, verPassword} = this.state
        if(password && password === verPassword){
            axios.post('/api/register', {email, username, password})
            .then(res => {
                getUser({type: 'GET_USER', payload: res.data})
                props.history.push('/my-cookbook')
            })
            .catch(err => console.log(err)) 
        } else {
            alert('Passwords do not match')
        }
    }

    const handleLogin = () => {
        // const {email, password} = this.state
        axios.post('/api/login', {email, password})
        .then(res => {
            getUser({type: 'GET_USER', payload: res.data})
            props.history.push('/my-cookbook')
        })
        .catch(err => console.log(err))
    }

    // render () {
        // console.log(this.state)
        return (
            <div>
                <section>
                    {registerView
                    ? (<>
                        <h3>Register Below</h3>
                        <input 
                            value={username}
                            name='username'
                            placeholder='Username'
                            onChange={(e) => setUsername(e.target.value)}/>
                       </>)
                    : <h3>Login Below</h3>}
                    <input 
                        value={email}
                        name='email'
                        placeholder='Email'
                        onChange={(e) => setEmail(e.target.value)}/>
                    <input 
                        type='password'
                        value={password}
                        name='password'
                        placeholder='Password'
                        onChange={(e) => setPassword(e.target.value)}/>
                    {registerView
                    ? (<>
                        <input 
                            type='password'
                            value={verPassword}
                            name='verPassword'
                            placeholder='Verify Password'
                            onChange={(e) => setVerPassword(e.target.value)}/>
                        <button onClick={handleRegister}>Register</button>
                        <p>Have an account? <span onClick={handleToggle}>Login Here</span></p>
                       </>)
                    : (<>
                        <button onClick={handleLogin}>Login</button>
                        <button onClick={() => {props.history.push('/')}}>Cancel</button>
                        <p>Don't have an account? <span className='register' onClick={handleToggle}>Register Here</span></p>
                       </>)}
                </section>
            </div>
        )
    // }
}

// export default connect(null, {getUser})(Auth);
export default Auth;