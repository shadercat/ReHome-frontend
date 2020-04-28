import * as types from '../constants/ActionTypes';

const initialState = {devices: []};

export default function machineDataSet(state = initialState, action) {
    switch (action.type) {
        case types.SET_DEVICE_DATA:
            return {machines: action.data};
        case types.UNSET_DEVICE_DATA:
            return {machines: []};
        case types.UPDATE_DEVICE_DATA:
            return {
                machines: state.map(function (item) {
                    return (item.deviceCode !== action.data.deviceCode) ? (item) : (action.data);
                })
            };
        default:
            return state;
    }
}