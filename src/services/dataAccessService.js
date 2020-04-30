import {Paths} from "../constants/Links";
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
        })
    }
};

export default dataAccessService