import {Paths, ParameterizedPaths} from "../constants/Links";
import {postRequest, getRequest} from "./standardRequestFunc";

const authorizationMethods = {
    login: function (args) {

    },
    checkAuthorized: function () {
        return new Promise((resolve, reject) => {
            getRequest(Paths.isAuthorized)
                .then((result) => {
                    resolve(result.success);
                })
                .catch((error) => {
                    reject(error);
                })
        })
    },
    logout: function () {
        return new Promise((resolve, reject) => {
            postRequest(Paths.logout)
                .then((result) => {
                    resolve(result);
                })
                .catch((error) => {
                    reject(error);
                })
        })
    }
};

export default authorizationMethods