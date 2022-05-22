import {
    REGISTER_FAIL,
    REGISTER_SUCCESS,
    CLEAR_ERROR,
    AUTH_ERROR,
    LOAD_USER,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    FORGOT,
    FORGOT_FAIL,
    RESET,
    RESET_FAIL
} from '../types'


export default (state, action) => {
    switch (action.type) {
        case LOAD_USER:
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload,
                loading: false
            }

        case FORGOT:
            return {
                ...state,
                isForgot: true
            }
        case RESET:
            return {
                ...state,
                resetInfo: true
            }

        case RESET_FAIL:
        case FORGOT_FAIL:
            return {
                ...state,
                resetInfo: null,
                isForgot: null,
                error: action.payload
            }
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                loading: false,
            }
        case REGISTER_FAIL:
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT:
            localStorage.removeItem('token');
            return {
                ...state,
                isAuthenticated: false,
                loading: true,
                user: null,
                toekn: null,
                error: action.payload
            }
        case CLEAR_ERROR:
            return {
                ...state,
                error: null
            }
        default:
            return;
    }
}