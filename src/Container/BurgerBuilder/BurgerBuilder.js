import React from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import WithErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

export class BurgerBuilder extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            purchasing: false,
        }
    }

    componentDidMount = () => {
        this.props.onInitIngredients()
    }

    updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients).map((element) => {return ingredients[element]}).reduce((sum, element) => {return sum + element}, 0);
        return sum > 0;
    }

    purchaseHandler = () => {
        if(this.props.isAuth) {
            this.setState({purchasing: true});
        } else {
            this.props.onSetRedirect('/checkout')
            this.props.history.push('/auth');
        }
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false})
    }

    purchaseContinueHandler = () => {
        this.props.onInitPurchase();
        this.props.history.push('/checkout');
    }

    render() {
        const disabledInfo = {...this.props.ings}
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        };

        let orderSummary = null;
        
        let burger = this.state.errorState? <p style={{textAlign: 'center'}}>Ingredients cannot be shown</p> : <Spinner />

        if (this.props.ings) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings}/>
                    <BuildControls 
                        ingredientAdded={this.props.addedIngredient}
                        ingredientRemoved={this.props.removedIngredient}
                        disabled={disabledInfo}
                        purchaseable={this.props.purchaseable}
                        ordered={this.purchaseHandler}
                        currentPrice={this.props.price}
                        isAuth={this.props.isAuth}
                    />
                </Aux>
            )
            orderSummary = <OrderSummary 
                                ingredients={this.props.ings} 
                                purchaseCanceled={this.purchaseCancelHandler} 
                                purchaseContinued={this.purchaseContinueHandler}
                                price={this.props.price}/>
        }
        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        )
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        purchaseable: state.burgerBuilder.purchaseable,
        isAuth: state.auth.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addedIngredient: (ingName) => dispatch(actions.addIngredients(ingName)),
        removedIngredient: (ingName) => dispatch(actions.removeIngredients(ingName)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onInitPurchase: () => dispatch(actions.pusrchseInit()),
        onSetRedirect: (path) => dispatch(actions.setAuthRedirect(path))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(WithErrorHandler(BurgerBuilder, axios));