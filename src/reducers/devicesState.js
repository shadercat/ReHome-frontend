import * as types from '../constants/ActionTypes';

const initialState = {devices: []};

export default function devicesDataSet(state = initialState, action) {
    switch (action.type) {
        case types.SET_DEVICE_DATA:
            return {devices: action.data};
        case types.UNSET_DEVICE_DATA:
            return {devices: []};
        case types.UPDATE_DEVICE_DATA:
            return {
                devices: state.map(function (item) {
                    return (item.deviceCode !== action.data.deviceCode) ? (item) : (action.data);
                })
            };
        default:
            return state;
    }
}