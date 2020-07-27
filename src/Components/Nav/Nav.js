import React from 'react';
import {withRouter, Link} from 'react-router-dom'

const Nav = props => {
        console.log(props)
    return (
        <div>
            {props.location.pathname !== '/login' || this.props.location.pathname !== '/new-recipe'
            ? (<nav>
                {/* <div>
                    <img className='profile-picture'
                        src={props.user.profile_picture}
                        alt={props.user.username}/>
                    <h2>{props.user.username}</h2>
                </div> */}
                <ul className = 'nav'>
                    <Link to='/'>Home</Link>
                    <Link to='/recipes'>Recipes</Link>
                    <Link to='/'>Logout</Link>
                    <Link to='/my-cookbook'>My Cookbook</Link>
                </ul>
               </nav>)
            : null}
        </div>
    )
}

export default withRouter(Nav);