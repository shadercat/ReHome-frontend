import * as types from '../constants/ActionTypes';

const initialState = {groups: []};

export default function devicesDataSet(state = initialState, action) {
    switch (action.type) {
        case types.SET_RESOURCE_GROUPS:
            return {groups: action.data};
        case types.UNSET_RESOURCE_GROUPS:
            return {groups: []};
        default:
            return state;
    }
}