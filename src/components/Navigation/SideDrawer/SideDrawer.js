import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Aux/Aux'

const SideDrawer = (props) => {
    let attachedClass = props.open ? [classes.SideDrawer, classes.Open] : [classes.SideDrawer, classes.Close];

    return (
        <Aux>
        <Backdrop show={props.open} clicked={props.closed} />
        <div className={attachedClass.join(' ')} onClick={props.closed}>
            <div className={classes.Logo}>
            <Logo />
            </div>
            <nav>
                <NavigationItems isAuth={props.isAuth}/>
            </nav>
        </div>
        </Aux>
    )
}

export default SideDrawer