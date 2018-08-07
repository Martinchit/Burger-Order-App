import React from 'react';
import burgerLogo from '../../assets/Image/burger-logo.png';
import classes from './Logo.css';

const Logo = (props) => (
    <div className={classes.Logo} style={{height: props.height}}>
        <img src={burgerLogo} alt='Burger' />
    </div>
)

export default Logo