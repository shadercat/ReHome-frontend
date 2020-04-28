import * as types from '../constants/ActionTypes';

const initialState = {
    _id: "1278389",
    email: "username@electromail.com",
    name: "USERNAME",
    subscriptionType: "default",
    createdAt: "2020-04-20T22:03:52.983Z"
};

export default function userDataSet(state = initialState, action) {
    switch (action.type) {
        case types.SET_USER_DATA:
            return action.data;
        case types.UNSET_USER_DATA:
            return {};
        default:
            return state;
    }
}