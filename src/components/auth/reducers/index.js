import {
    AUTH_LOGIN,
    AUTH_LOGOUT,
    AUTH_REMOVE_ERROR,
    AUTH_SET_ERROR
} from "../constants";

const initialState = {};

export const authReducer = (state = initialState, action) => {

    switch(action.type) {
        case AUTH_LOGIN:
            return {
                uid: action.payload.uid,
                name: action.payload.displayName,
            };

        case AUTH_LOGOUT:
            return {};

        case AUTH_REMOVE_ERROR:
            return {
                ...state,
                errors: undefined,
            };

        case AUTH_SET_ERROR:
            return {
                ...state,
                errors: action.payload,
            };
        default: return state;
    }
}