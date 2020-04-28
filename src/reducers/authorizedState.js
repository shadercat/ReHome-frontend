import * as types from '../constants/ActionTypes';

const initialState = {
    isAuthorized: false,
};

export default function authRed(state = initialState, action) {
    switch (action.type) {
        case types.SET_AUTHORIZED:
            return {isAuthorized: true};
        case types.SET_UNAUTHORIZED:
            return {isAuthorized: false};
        default:
            return state;
    }
}