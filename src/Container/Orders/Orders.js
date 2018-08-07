import React from 'react';

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

import { connect } from 'react-redux';

class Orders extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            orders: [],
            loading: true
        }
    }
    componentDidMount = () => {
        this.props.onFetchOrders(this.props.token, this.props.userId);
    }
    render() {
        let orders = this.props.loading? <Spinner /> : (this.props.orders.map((order) => (
            <Order key={order.id} ingredients={order.ingredients} price={order.price}/>
        )))
        return (
            <div>
                {orders}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    };
}
const mapDisptachToProps = dispatch => {
    return {
        onFetchOrders: (token, userId) => dispatch(actions.fetchOrders(token, userId))
    };
}

export default connect(mapStateToProps, mapDisptachToProps)(withErrorHandler(Orders, axios));