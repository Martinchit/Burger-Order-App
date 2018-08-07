import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    ingredients : null,
    totalPrice : 4,
    purchaseable: false,
    error: false,
    building: false
}

const IngredientPrice = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.6
}

const addIng = (state, action) => {
    const updatedIng = { [action.payload.ingredientsName]: state.ingredients[action.payload.ingredientsName] + 1 }
    const updateIngs = updateObject(state.ingredients, updatedIng);
    const updateState = {
        ingredients: updateIngs,
        totalPrice: Number((state.totalPrice + IngredientPrice[action.payload.ingredientsName]).toFixed(1)),
        purchaseable: Object.values(state.ingredients).reduce((a,b) => a+b) + 1 > 0? true: false,
        building: true
    }
    return updateObject(state, updateState);
}

const removeIng = (state, action) => {
    const updatedIng = { [action.payload.ingredientsName]: state.ingredients[action.payload.ingredientsName] - 1 }
    const updateIngs = updateObject(state.ingredients, updatedIng);
    const updateState = {
        ingredients: updateIngs,
        totalPrice: Number((state.totalPrice - IngredientPrice[action.payload.ingredientsName]).toFixed(1)),
        purchaseable: Object.values(state.ingredients).reduce((a,b) => a+b) + 1 > 0? true: false,
        building: true
    }
    return updateObject(state, updateState);
}

const setIngs = (state, action) => {
    return updateObject(state, {
        ingredients: {
            salad: action.payload.ingredients.salad,
            bacon: action.payload.ingredients.bacon,
            cheese: action.payload.ingredients.cheese,
            meat: action.payload.ingredients.meat
        },
        totalPrice: 4,
        purchaseable: false,
        error: false,
        building: false
    })
}

const fetchIngsFail = (state, action) => {
    return updateObject(state, {error: true});
}

const burgerBuilderReducer = (state=initialState, action) => {
    switch(action.type) {
        case actionTypes.ADD_INGREDIENT:
            return addIng(state, action);
        case actionTypes.REMOVE_INGREDIENT: 
            return removeIng(state, action);
        case actionTypes.SET_INGREDIENTS:
            return setIngs(state, action);
        case actionTypes.FETCH_ING_FAIL:
            return fetchIngsFail(state, action);
        default:
            return state;
    }
}

export default burgerBuilderReducer;