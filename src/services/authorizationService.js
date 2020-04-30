import {Paths, ParameterizedPaths} from "../constants/Links";
import {postRequest, getRequest} from "./standardRequestFunc";

const authorizationMethods = {
    login: function (args) {
        return new Promise((resolve, reject) => {
            postRequest(Paths.login, args)
                .then(() => {
                    resolve(true);
                })
                .catch((error) => {
                    reject(error);
                })
        })
    },
    checkAuthorized: function () {
        return new Promise((resolve, reject) => {
            getRequest(Paths.isAuthorized)
                .then(() => {
                    resolve(true);
                })
                .catch((error) => {
                    reject(error)
                })
        })
    },
    logout: function () {
        return new Promise((resolve, reject) => {
            postRequest(Paths.logout)
                .then(() => {
                    resolve(true);
                })
                .catch((error) => {
                    reject(error);
                })
        })
    },
    register: function (args) {
        return new Promise((resolve, reject) => {
            postRequest(Paths.register, args)
                .then(() => {
                    resolve(true);
                })
                .catch((error) => {
                    reject(error)
                })
        })
    }
};

export default authorizationMethods