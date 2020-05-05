import axios from 'axios';
import queryString from 'query-string';
import _ from 'lodash'
import {Config} from '../constants/Config';
import {NETWORK_ERROR} from "../constants/FailReasons";

const getRequest = function (url, options) {
    let opt = _.defaults(Config, options);
    return new Promise((resolve, reject) => {
        axios.get(url, opt)
            .then((result) => {
                if (result.data.success === true) {
                    resolve(result.data.data);
                } else {
                    reject(result.data.reason);
                }
            })
            .catch((error) => {
                if (error.response) {
                    reject(error.response.data.reason);
                } else {
                    reject(NETWORK_ERROR);
                }
            })
    })
};

const postRequest = function (url, args, options) {
    let opt = _.defaults(Config, options);
    return new Promise((resolve, reject) => {
        axios.post(url, queryString.stringify(args), opt)
            .then((result) => {
                if (result.data.success === true) {
                    resolve(result.data.data);
                } else {
                    reject(result.data.reason);
                }
            })
            .catch((error) => {
                if (error.response) {
                    reject(error.response.data.reason);
                } else {
                    reject(NETWORK_ERROR);
                }
            })
    })
};

const putRequest = function (url, args, options) {
    let opt = _.defaults(Config, options);
    return new Promise((resolve, reject) => {
        axios.put(url, queryString.stringify(args), opt)
            .then((result) => {
                if (result.data.success === true) {
                    resolve(result.data.data);
                } else {
                    reject(result.data.reason);
                }
            })
            .catch((error) => {
                if (error.response) {
                    reject(error.response.data.reason);
                } else {
                    reject(NETWORK_ERROR);
                }
            })
    })
};


const deleteRequest = function (url, options) {
    let opt = _.defaults(Config, options);
    return new Promise((resolve, reject) => {
        axios.delete(url, opt)
            .then((result) => {
                if (result.data.success === true) {
                    resolve(result.data.data);
                } else {
                    reject(result.data.reason);
                }
            })
            .catch((error) => {
                if (error.response) {
                    reject(error.response.data.reason);
                } else {
                    reject(NETWORK_ERROR);
                }
            })
    })
};

export {getRequest, postRequest, putRequest, deleteRequest};