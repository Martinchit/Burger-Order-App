import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';
import { Redirect } from 'react-router-dom'

class Logout extends React.Component {

    componentDidMount = () => {
        this.props.onLogout();
    }
    render() {
        return (<Redirect to='/' />)
    }
}

const mapDispatachToProps = (dispatch) => {
    return {
        onLogout: () => dispatch(actions.logout())
    }
}

export default connect(null, mapDispatachToProps)(Logout);