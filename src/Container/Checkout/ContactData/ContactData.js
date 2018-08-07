import React from 'react';
import axios from '../../../axios-orders';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import { connect } from 'react-redux';
import withErrorHandler from '../../../hoc/WithErrorHandler/WithErrorHandler';
import * as actionTypes from '../../../store/actions/index';
import { updateObject, checkValidity } from '../../../shared/utility';

class ContactData extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            orderForm: {
                name: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Your Name'
                    },
                    value: '',
                    validation: {
                        required: true,
                        minLength: 5,
                        isName: true
                    },
                    touched: false
                },
                street: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Street'
                    },
                    value: '',
                    validation: {
                        required: true
                    },
                    touched: false
                },
                zipCode: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'ZIP Code'
                    },
                    value: '',
                    validation: {
                        required: true,
                        minLength: 5,
                        maxLength: 5
                    },
                    touched: false
                },
                country: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Country'
                    },
                    value: '',
                    validation: {
                        required: true
                    },
                    touched: false
                },
                email: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'email',
                        placeholder: 'Your E-Mail'
                    },
                    value: '',
                    validation: {
                        required: true,
                        isEmail: true
                    },
                    touched: false
                }, 
                deliveryMethod: {
                    elementType: 'select',
                    elementConfig: {
                        options: [{value: 'fastest', displayValue: 'Fastest'},{value: 'cheapest', displayValue: 'Cheapest'}]
                    },
                    value: 'fastest',
                    valid: true
                }
            },
            formIsValid: false,
            loading: false
        }
    }

    orderHandler = (event) => {
        event.preventDefault()
        const formData = {};
        const userId = this.props.token? this.props.token: localStorage.getItem('token');
        for (let i in this.state.orderForm) {
            formData[i] = this.state.orderForm[i].value
        }
        const order = {
            ingredients: this.props.ings,
            price: this.props.price,
            order: formData,
            userId: userId
        }
        this.props.onOrder(order, this.props.token);
    }

    inputChangedHandler = (event, inputIdentifer) => {
        // const updatedFormData = {...this.state.orderForm};
        // const updatedformElement = {...updatedFormData[inputIdentifer]};
        // updatedformElement.value = event.target.value;
        
        // if (updatedformElement.hasOwnProperty('touched') && updatedformElement.hasOwnProperty('validation')) {
        //     updatedformElement.valid = this.checkValidity(updatedformElement.value, updatedformElement.validation)
        //     updatedformElement.touched = true;
        // }   
        // updatedFormData[inputIdentifer] = updatedformElement;

        const updatedformElement = updateObject(this.state.orderForm[inputIdentifer], {
            touched: true,
            value: event.target.value,
            valid: checkValidity(event.target.value, this.state.orderForm[inputIdentifer].validation)
        });

        const updatedFormData = updateObject(this.state.orderForm, {
            [inputIdentifer]: updatedformElement
        })
        let formValid = true;
        for (let i in updatedFormData) {
            formValid = updatedFormData[i].valid && formValid;
        }
        this.setState({orderForm : updatedFormData, formIsValid: formValid})
    }

    render() {
        const formElementsArray = [];
        for (let i in this.state.orderForm) {
            formElementsArray.push({
                id: i,
                config: this.state.orderForm[i]
            })
        }
        let form = (
            <form onSubmit={this.orderHandler}>
                {
                    formElementsArray.map(element => {
                        return <Input 
                                    key={element.id}
                                    elementType={element.config.elementType}
                                    elementConfig={element.config.elementConfig} 
                                    value={element.config.value}
                                    invalid={!element.config.valid}
                                    shouldValidate={element.config.validation}
                                    touched={element.config.touched}
                                    changed={(event) => this.inputChangedHandler(event, element.id)}/>
                    })
                }
                <Button btnType='Success' disabled={!this.state.formIsValid}>ORDER</Button>
            </form>
        );
        if (this.props.loading) {
            form = <Spinner />;
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter Your Contact Data</h4>
                {form}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        price: state.burgerBuilder.totalPrice,
        ings: state.burgerBuilder.ingredients,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onOrder: (orderData, token) => dispatch(actionTypes.purchaseBurger(orderData, token))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));