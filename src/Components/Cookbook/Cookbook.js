import React, {Component} from 'react';
import {connect} from 'react-redux';
import {clearUser} from '../../ducks/reducer'
import axios from 'axios';

class Cookbook extends Component {

    handleLogout = () => {
        axios.get('/api/logout')
        .then(() => {
            this.props.clearUser()
            this.props.history.push('/landing')
        })
        .catch(err => console.log(err))
    }

    render () {
        // console.log(this.props)
        return (
            <div>My Cookbook</div>
        )
    }
}

const mapStateToProps = reduxState => reduxState

export default connect(mapStateToProps, {clearUser})(Cookbook);