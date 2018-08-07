import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const burgerPurchaseSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    }
}

export const burgerPurchaseFail = (err) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: err
    }
}

export const purchaseBurgerStart = (orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    };
}

export const purchaseBurger = (orderData, token) => {
    return dispatch => {
        dispatch(purchaseBurgerStart());
        token = token === undefined? localStorage.getItem('token') : token;
        axios.post('/orders.json?auth=' + token, orderData).then(res => {
            dispatch(burgerPurchaseSuccess(res.data.name, orderData))
        }).catch(err => {
            dispatch(burgerPurchaseFail(err))
        });
    }
}

export const pusrchseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    }
}

export const fetchOrdersSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    }
}

export const fetchOrdersFail = (err) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL
    }
}

export const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START
    }
}

export const fetchOrders = (token, userId) => {
    return dispatch => {
        token = token === undefined? localStorage.getItem('token') : token;
        userId = userId === undefined? localStorage.getItem('userId') : userId;
        dispatch(fetchOrdersStart());
        const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"'; 
        axios.get('/orders.json' + queryParams).then((res) => {
            const fetchedData = []
            for (let key in res.data) {
                fetchedData.push({...res.data[key], id: key});
            }
            dispatch(fetchOrdersSuccess(fetchedData));
        }).catch((err) => {
            dispatch(fetchOrdersFail(err));
        })
    }
}