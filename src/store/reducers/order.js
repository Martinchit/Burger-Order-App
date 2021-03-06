import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initalState = {
    orders: [],
    loading: false,
    purchased: false
}

const purchaseInit = (state, action) => {
    return updateObject(state, { purchased: false }); 
}

const purchaseStart = (state, action) => {
    return updateObject(state , { loading: true });
}

const purchaseSuccess = (state, action) => {
    const newOrder = updateObject(state, { id: action.orderId });
    return updateObject(state, {
        loading: false,
        order: state.orders.concat(newOrder),
        purchased: true
    });
}

const purchaseFail = (state, action) => {
    return updateObject(state, {
        loading: false
    });
}

const fetchStart = (state, action) => {
    return updateObject(state, {loading: true});
}

const fetchSuccess = (state, action) => {
    return updateObject(state,{
        orders: action.orders,
        loading: false
    });
}

const fetchFail = (state, action) => {
    return updateObject(state, { loading: false });
}


const reducer = (state = initalState, action) => {
    switch(action.type){
        case actionTypes.PURCHASE_INIT:
            return purchaseInit(state, action);
        case actionTypes.PURCHASE_BURGER_START:
            return purchaseStart(state, action);
        case actionTypes.PURCHASE_BURGER_SUCCESS:
            return purchaseSuccess(state, action);
        case actionTypes.PURCHASE_BURGER_FAIL:
            return purchaseFail(state, action);
        case actionTypes.FETCH_ORDERS_START:
            return fetchStart(state, action);
        case actionTypes.FETCH_ORDERS_SUCCESS:
            return fetchSuccess(state, action)
        case actionTypes.FETCH_ORDERS_FAIL:
            return fetchFail(state, action);
        default:
            return state;
    }
        
}

export default reducer;