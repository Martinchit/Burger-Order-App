import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    {label: 'Salad', type: 'salad'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Meat', type: 'meat'}
]

const BuildControls = (props) => {
    return (
        <div className={classes.BuildControls}>
            <p>Current Price: HK$<strong>{props.currentPrice}</strong></p>
            {controls.map((element) => {
                return <BuildControl 
                            key={element.label}
                            label={element.label} 
                            added={() => props.ingredientAdded(element.type)}
                            removed={props.ingredientRemoved.bind(this, element.type)}
                            disabled={props.disabled[element.type]}
                        />
            })}
            <button className={classes.OrderButton} disabled={!props.purchaseable} onClick={props.ordered}>
            {props.isAuth? 'ORDER NOW' : 'PlEASE SIGN IN / SIGN UP'}</button>
        </div>
    )
}

export default BuildControls