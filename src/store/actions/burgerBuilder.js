import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const addIngredients = (ingName) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        payload: {
            ingredientsName: ingName
        }
    };
}

export const removeIngredients = (ingName) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        payload: {
            ingredientsName: ingName
        }
    };
}

export const setIngredients = (ing) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        payload: {
            ingredients: ing
        }
    };
}

export const fetchIngFail = () => {
    return {
        type: actionTypes.FETCH_ING_FAIL
    }
}

export const initIngredients = () => {
    return dispatch => {    
        axios.get('/ingredients.json').then((res) => {
            dispatch(setIngredients(res.data))
        }).catch(err => {
            dispatch(fetchIngFail())
        })
    };
}