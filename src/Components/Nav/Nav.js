import React from 'react';
import {withRouter, Link} from 'react-router-dom'

const Nav = props => {
        console.log(props)
    return (
        <div>
            {props.location.pathname !== '/login' || props.location.pathname !== '/new-recipe'
            ? (<nav>
                <ul className = 'nav'>
                    <Link to='/'>Home</Link>
                    <Link to='/recipes'>Recipes</Link>
                    <Link to='/my-cookbook'>My Cookbook</Link>
                    <Link to='/login'>Login</Link>
                </ul>
               </nav>)
            : null}
        </div>
    )
}

export default withRouter(Nav);