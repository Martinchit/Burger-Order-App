import React from 'react';
import classes from './Order.css';

const Order = (props) => {

    const ingredients = [];

    for (let i in props.ingredients) {
        ingredients.push({name: i, amount: props.ingredients[i]})
    }

    const ingredientsOutput = ingredients.map((ig) => {
        return <span 
                    style={{textTransform: 'capitalize', display: 'inline-block', margin: '0px 8px', border: '1px solid #ccc', padding: '5px ' }}
                    key={ig.name}>{ig.name} ({ig.amount})</span>
    })
    
    return (
        <div className={classes.Order}>
            <p>Ingredients: Salad {ingredientsOutput}</p>
            <p>Price: <strong>USD {Number(props.price).toFixed(2)}</strong></p>
        </div>
    )
    
}

export default Order;