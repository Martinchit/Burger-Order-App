import authReducer from './auth';
import * as actionTypes from '../actions/actionTypes';

describe('authReducer', () => {
    it('Should return the initial state', () => {
        expect(authReducer(undefined, {})).toEqual({
            token: null,
            userId: null,
            error: null,
            loading: false,
            authRedirect: '/'
        })
    });

    it('Should store token upon login', () => {
        expect(authReducer({
            token: null,
            userId: null,
            error: null,
            loading: false,
            authRedirect: '/'
        }, {type: actionTypes.AUTH_SUCCESS,idToken: '1',userId: '1123'})).toEqual({
            token: '1',
            userId: '1123',
            error: null,
            loading: false,
            authRedirect: '/'
        })
    });
});