import {Paths, ParameterizedPaths} from "../constants/Links";
import {getRequest} from "./standardRequestFunc";

const dataAccessService = {
    getUserData: function () {
        return new Promise((resolve, reject) => {
            getRequest(Paths.getUserData)
                .then((result) => {
                    resolve(result);
                })
                .catch((error) => {
                    reject(error);
                })
        });
    },
    getDevices: function (page) {
        let parameters = {};
        if (page) {
            parameters.page = page;
        }
        return new Promise((resolve, reject) => {
            getRequest(Paths.getUserDevices, parameters)
                .then((data) => {
                    resolve(data);
                })
                .catch((error) => {
                    reject(error);
                })
        });
    },
    getResourceGroups: function (page) {
        let parameters = {};
        if (page) {
            parameters.page = page
        }
        return new Promise((resolve, reject) => {
            getRequest(Paths.getUserResGroups, parameters)
                .then((data) => {
                    resolve(data);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },
    getDeviceInfo: function (deviceCode) {
        return new Promise((resolve, reject) => {
            getRequest(ParameterizedPaths.getDeviceInfo(deviceCode))
                .then((data) => {
                    resolve(data);
                })
                .catch((error) => {
                    reject(error);
                })
        });
    }
};

export default dataAccessService;