import {iotPath} from "../constants/Links";
import {postRequest} from "./standardRequestFunc";

const ctrlActionService = {
    sendAction: function (deviceCode, ownerId, command) {
        return new Promise((resolve, reject) => {
            let data = {
                identifier: deviceCode,
                owner: ownerId,
                command: command
            };
            postRequest(iotPath.ctrl, data)
                .then(() => {
                    resolve(true);
                })
                .catch((error) => {
                    reject(error);
                })
        })
    }
};

export default ctrlActionService;