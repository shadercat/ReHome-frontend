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
            parameters.params = {
                page: page
            }
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
            parameters.params = {
                page: page
            }
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
    },
    getResourceGroupInfo: function (id) {
        return new Promise((resolve, reject) => {
            getRequest(ParameterizedPaths.getResGroup(id))
                .then((data) => {
                    resolve(data);
                })
                .catch((error) => {
                    reject(error);
                })
        })
    },
    getResourceGroupDevices: function (id, page) {
        let parameters = {};
        if (page) {
            parameters.params = {
                page: page
            }
        }
        return new Promise((resolve, reject) => {
            getRequest(ParameterizedPaths.getDevicesFromResGroup(id), parameters)
                .then((data) => {
                    resolve(data);
                })
                .catch((error) => {
                    reject(error);
                })
        })
    },
    getRecommendations: function (page, lang) {
        let parameters = {};
        if (page && lang) {
            parameters.params = {
                page: page,
                lang: lang
            }
        }
        return new Promise((resolve, reject) => {
            getRequest(Paths.getRecommendations, parameters)
                .then((data) => {
                    resolve(data);
                })
                .catch((error) => {
                    reject(error);
                })
        })
    }
};

export default dataAccessService;