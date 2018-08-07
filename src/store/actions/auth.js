import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (authData) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: authData.idToken,
        userId: authData.localId
    };
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000)
    }
}

export const authFail = (err) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: err
    };
};

export const auth = (email, pw, method) => {
    const authData = {
        email: email,
        password: pw,
        returnSecureToken: true
    };
    let url = method? 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyD90WtopFQCdhr8X9a2sYIsD8ASKL84TG0': 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyD90WtopFQCdhr8X9a2sYIsD8ASKL84TG0';
    return dispatch => {
        dispatch(authStart());
        axios.post(url, authData).then(res => {
            const expirationDate = new Date(new Date().getTime() + res.data.expiresIn * 1000);
            localStorage.setItem('token', res.data.idToken);
            localStorage.setItem('expirationDate', expirationDate);
            localStorage.setItem('userId', res.data.localId);
            dispatch(authSuccess(res.data));
            dispatch(checkAuthTimeout(res.data.expiresIn));
        }).catch(err => {
            dispatch(authFail(err.response.data.error));
        });
    };
};

export const setAuthRedirect = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT,
        path: path
    }
}

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if(!token) {
            dispatch(logout());
        } else {
            const expiration = new Date(localStorage.getItem('expirationDate'));
            if(expiration > new Date()) {
                const userId = localStorage.getItem('userId')
                dispatch(authSuccess(token, userId));
                dispatch(checkAuthTimeout((expiration.getTime() - new Date().getTime())/ 1000));
            } else {
                dispatch(logout());
            }
        }
    }
}