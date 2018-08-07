import React from 'react';
import Button from '../../UI/Button/Button';
import Aux from '../../../hoc/Aux/Aux';

class OrderSummary extends React.Component {
    render() {
        const ingredientSummary = Object.keys(this.props.ingredients).map((ingKey, idx) => {
            return <li key={idx}><span style={{textTransform: 'capitalize'}}>{ingKey} : {this.props.ingredients[ingKey]}</span></li>
        })
        return (
            <Aux>
                <h3>Your Order</h3>
                <p>A delicious burger with the following ingredients:</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p><strong>Total Price: {this.props.price}</strong></p>
                <p>Continue to Checkout?</p>
                <Button btnType='Danger' clicked={this.props.purchaseCanceled}>Cancel</Button>
                <Button btnType='Success' clicked={this.props.purchaseContinued}>Continue</Button>
            </Aux>
        )
    }
}

export default OrderSummary