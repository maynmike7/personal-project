import React, {Component} from 'react';
import {connect} from 'react-redux';

class Cookbook extends Component {

    render () {
        console.log(this.props)
        return (
            <div>My Cookbook</div>
        )
    }
}

const mapStateToProps = reduxState => reduxState

export default connect(mapStateToProps)(Cookbook);