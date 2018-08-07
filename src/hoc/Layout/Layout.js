import React from 'react';
import Aux from '../Aux/Aux'
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import { connect } from 'react-redux';

class Layout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showSideDrawer: false
        }
    }
    sideDrawerClosedHandler = () => {
        this.setState({showSideDrawer: false})
    }

    sideDrawerToggleHandler = () => {
        this.setState((oldState) => {
            return {showSideDrawer: !oldState.showSideDrawer}
        })
    }

    render() {
        return (
            <Aux>
                <Toolbar isAuth={this.props.isAuth} drawerToggleClicked={this.sideDrawerToggleHandler}/>
                <SideDrawer isAuth={this.props.isAuth} closed={this.sideDrawerClosedHandler} open={this.state.showSideDrawer}/>
                <main className={classes.Content}>{this.props.children}</main>
            </Aux>
        )
    }
}

const mapStateToProps = (state) => {
    return { 
        isAuth: state.auth.token !== null
    }
}

export default connect(mapStateToProps)(Layout);