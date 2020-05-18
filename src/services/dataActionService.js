import {Paths, ParameterizedPaths} from "../constants/Links";
import {deleteRequest, postRequest} from "./standardRequestFunc";


const dataActionService = {
    createDevice: function (data) {
        return new Promise((resolve, reject) => {
            postRequest(Paths.registerDevice, data)
                .then(() => {
                    resolve(true);
                })
                .catch((error) => {
                    reject(error);
                })
        });
    },
    deleteDevice: function (deviceCode) {
        return new Promise((resolve, reject) => {
            deleteRequest(ParameterizedPaths.deleteDevice(deviceCode))
                .then(() => {
                    resolve(true);
                })
                .catch((error) => {
                    reject(error);
                })
        });
    },
    createGroup: function (data) {
        return new Promise((resolve, reject) => {
            postRequest(Paths.createResGroup, data)
                .then(() => {
                    resolve(true);
                })
                .catch((error) => {
                    reject(error);
                })
        });
    },
    deleteDeviceFromGroup: function (groupId, deviceCode) {
        return new Promise((resolve, reject) => {
            deleteRequest(ParameterizedPaths.deleteDeviceFromResGroup(groupId, deviceCode))
                .then(() => {
                    resolve(true);
                })
                .catch((error) => {
                    reject(error);
                })
        });
    },
    deleteResourceGroup: function (id) {
        return new Promise((resolve, reject) => {
            deleteRequest(ParameterizedPaths.deleteResourceGroup(id))
                .then(() => {
                    resolve(true);
                })
                .catch((error) => {
                    reject(error);
                })
        })
    },
    addDeviceToResGroup: function (resId, deviceCode) {
        let params = {
            deviceCode: deviceCode
        };
        return new Promise((resolve, reject) => {
            postRequest(ParameterizedPaths.addDeviceToResGroup(resId), params)
                .then(() => {
                    resolve(true);
                })
                .catch((error) => {
                    reject(error)
                })
        })
    },
    editUserData: function (data) {
        return new Promise((resolve, reject) => {
            postRequest(Paths.editUserData, data)
                .then(() => {
                    resolve(true);
                })
                .catch((error) => {
                    reject(error)
                })
        })
    }
};

export default dataActionService