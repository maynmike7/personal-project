import React, {Component} from 'react';
import {withRouter, Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {clearUser} from '../../ducks/usersReducer';
import axios from 'axios';
import './Nav.css';

class Nav extends Component {
    constructor(props){
        super(props)
        this.state = {
            dropdownView: false
        }
    }

    handleLogout = () => {
        axios.get('/api/logout')
        .then(() => {
            this.props.clearUser()
            this.props.history.push('/')
        })
        .catch(err => console.log(err))
    }

    render() {
        // console.log(this.props)
        // console.log(this.state)
        return (
            <div className = 'nav'>
                <div className='nav-logo'>
                    {/* <img src='https://rlv.zcache.com/cute_lemon_slice_fun_citrus_fruit_foodie_paperweight-r7da948128d0a4e6db33ad0953a5f744f_bz43a_630.jpg?rlvnet=1&view_padding=%5B285%2C0%2C285%2C0%5D' alt='lemon' className='logo'/> */}
                    <h1>LullyLemon</h1>
                </div>
                {this.props.location.pathname !== '/login' && this.props.location.pathname !== '/new-recipe'
                ? (<nav>
                    <ul className = 'nav-bar'>
                        <Link to='/' className='nav-links'>Home</Link>
                        <Link to='/recipes' className='nav-links'>Recipes</Link>
                        <Link to='/my-cookbook'className='nav-links'>My Cookbook</Link>
                        {!this.props.usersReducer.user.email
                        ? (<nav>
                            <Link to='/login' className='nav-links'>Login</Link>                            
                            </nav>)
                        : <span className='nav-links' onClick={this.handleLogout}>Logout</span>}
                    </ul>
                    </nav>)
                : null}
                <span className='greeting'>Hi {this.props.usersReducer.user.username}</span>
            </div>
        )
    }
}

const mapStateToProps = reduxState => reduxState

export default withRouter(connect(mapStateToProps, {clearUser})(Nav));