import React from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './auth.css';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';
import { Redirect } from 'react-router-dom';
import { updateObject, checkValidity } from '../../shared/utility';

class Auth extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            controls: {
                email: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'email',
                        placeholder: 'Your Email'
                    },
                    value: '',
                    validation: {
                        required: true,
                        isEmail: true
                    },
                    touched: false
                },
                password: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'password',
                        placeholder: 'Password'
                    },
                    value: '',
                    validation: {
                        required: true,
                        minLength: 6
                    },
                    touched: false
                }
            },
            isSignUp: true
        }
    }
    
    inputChangedHandler = (event, controlName) => {
        const updatedFormData = updateObject(this.state.controls, {
            [controlName]: updateObject(this.state.controls[controlName], {
                value: event.target.value,
                valid: checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            })
        })
        // const updatedFormData = {
        //     ...this.state.controls, 
        //     [controlName]: {
        //         ...this.state.controls[controlName],
        //         value: event.target.value,
        //         valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
        //         touched: true
        //     }
        // };
        this.setState({controls: updatedFormData});
    }

    componentDidMount = () => {
        if(!this.props.buildingBurger && this.props.authRedirectPath !== '/') {
            this.props.onSetRedirect();
        }
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignUp);
        const state = {
            ...this.state.controls,
            email: {
                ...this.state.controls.email,
                value: ''
            },
            password: {
                ...this.state.controls.password,
                value: '',
            }
        };
        this.setState({controls: state});
    }

    switchMethod = () => {
        this.setState(prevState => {
            return {isSignUp: !prevState.isSignUp}
        })
    }

    render() {
        const formElementsArray = [];
        for (let i in this.state.controls) {
            formElementsArray.push({
                id: i,
                config: this.state.controls[i]
            })
        }
        let form = this.props.loading? <Spinner /> : formElementsArray.map((ele) => {
                                                return <Input   key={ele.id} 
                                                                elementType={ele.config.elementType}
                                                                elementConfig={ele.config.elementConfig} 
                                                                value={ele.config.value}
                                                                invalid={!ele.config.valid}
                                                                shouldValidate={ele.config.validation}
                                                                touched={ele.config.touched}
                                                                changed={(event) => this.inputChangedHandler(event, ele.id)}/>
                                            });

        let errMessage = this.props.error? <p>{this.props.error.message}</p> : null;
        let isAuthed = this.props.isAuth? <Redirect to={this.props.authRedirectPath} /> : null;
        return (
            <div className={classes.Auth}>
                {isAuthed}
                {errMessage}
                <form onSubmit={this.submitHandler} >
                    {form}
                    <Button btnType='Success'>Submit</Button>
                </form>
                <Button btnType='Danger' clicked={this.switchMethod}>SWITCH TO {this.state.isSignUp? 'SIGN-IN': 'SIGN-UP'}</Button>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuth: state.auth.token !== null,
        buildingBurger: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirect,
        token: state.auth.token
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAuth: (email, pw, method) => dispatch(actions.auth(email, pw, method)),
        onSetRedirect: () => dispatch(actions.setAuthRedirect('/'))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);