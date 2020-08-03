import React, {Component} from 'react';
import {withRouter, Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {clearUser} from '../../ducks/usersReducer';
import axios from 'axios';
import './Nav.css';

class Nav extends Component {

    handleLogout = () => {
        axios.get('/api/logout')
        .then(() => {
            this.props.clearUser()
            this.props.history.push('/landing')
        })
        .catch(err => console.log(err))
    }

    render() {
        // console.log(this.props)
        // console.log(this.state)
        return (
            <div className = 'nav'>
                {/* <img src='https://rlv.zcache.com/cute_lemon_slice_fun_citrus_fruit_foodie_paperweight-r7da948128d0a4e6db33ad0953a5f744f_bz43a_630.jpg?rlvnet=1&view_padding=%5B285%2C0%2C285%2C0%5D' alt='lemon'/> */}
                <h1>LullyLemon</h1>
                {this.props.location.pathname !== '/login' && this.props.location.pathname !== '/new-recipe'
                ? (<nav>
                    <ul className = 'nav'>
                        <Link to='/'>Home</Link>
                        <Link to='/recipes'>Recipes</Link>
                        <Link to='/my-cookbook'>My Cookbook</Link>
                        {!this.props.usersReducer.user.email
                        ? (<nav>
                            <Link to='/login'>Login</Link>                            
                            </nav>)
                        : <span onClick={this.handleLogout}>Logout</span>}
                    </ul>
                    </nav>)
                : null}
            </div>
        )
    }
}

const mapStateToProps = reduxState => reduxState

export default withRouter(connect(mapStateToProps, {clearUser})(Nav));