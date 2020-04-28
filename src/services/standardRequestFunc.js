import axios from 'axios';
import queryString from 'query-string';
import _ from 'lodash'
import {Config} from '../constants/Config';

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
                reject(error.response.data.reason);
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
                reject(error.response.data.reason);
            });
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
                reject(error.response.data.reason);
            });
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
                reject(error.response.data.reason);
            })
    })
};

export {getRequest, postRequest, putRequest, deleteRequest};