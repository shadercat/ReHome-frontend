import {Paths} from "../constants/Links";
import {getRequest} from "./standardRequestFunc";

const dataAccessService = {
    getUserData: function () {
        return new Promise((resolve, reject) => {
            getRequest(Paths.getUserData)
                .then((result) => {
                    if (result.success === true) {
                        resolve(result.data);
                    } else {
                        reject(result.reason);
                    }
                })
                .catch((error) => {
                    reject(error);
                })
        })
    }
};

export default dataAccessService