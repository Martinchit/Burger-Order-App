import React from 'react';
import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

class Burger extends React.Component {
    render() {
        let transformedIngredients = Object.keys(this.props.ingredients).map((ingKey) => {
            return [...Array(this.props.ingredients[ingKey])].map((_,idx) => {
                return <BurgerIngredient type={ingKey} key={ingKey + idx}/>
            })
        }).reduce((arr, element) => {
            return arr.concat(element)
        }, [])
        return (
            <div className={classes.Burger}>
                <BurgerIngredient type='bread-top'/>
                {/* {transformedIngredients > 0 ? transformedIngredients  : <p>Please start adding ingredient!</p>} */}
                {transformedIngredients.length > 0 ? transformedIngredients : transformedIngredients = <p>Please start adding ingredient!</p>}
                <BurgerIngredient type='bread-bottom'/>
            </div>
        )
    }
}

export default Burger