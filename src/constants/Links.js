const Origin = "http://192.168.31.194:3000";
const Paths = {
    isAuthorized: `${Origin}/user/authorized`,
    login: `${Origin}/user/login`,
    register: `${Origin}/user/create`,
    logout: `${Origin}/user/logout`,
    getUserData: `${Origin}/user/`,
    editUserData: `${Origin}/user/edit`,
    getUserDevices: `${Origin}/user/devices`,
    getUserResGroups: `${Origin}/user/resourcegroups`,
    registerDevice: `${Origin}/device/register`,
    createResGroup: `${Origin}/resourcegroup/create`,
    getDeviceTypesInfo: `${Origin}/devices`,
    getRecommendations: `${Origin}/recommendations`,
    getRecommendationsAdv: `${Origin}/recommendations/find`
};
const ParameterizedPaths = {
    getDeviceInfo: function (deviceCode) {
        return `${Origin}/device/${deviceCode}`;
    },
    editDevice: function (deviceCode) {
        return `${Origin}/device/${deviceCode}/edit`;
    },
    deleteDevice: function (deviceCode) {
        return `${Origin}/device/${deviceCode}/delete`;
    },
    getResGroup: function (resId) {
        return `${Origin}/resourcegroup/${resId}`;
    },
    getDevicesFromResGroup: function (resId) {
        return `${Origin}/resourcegroup/${resId}/devices`
    },
    editResGroup: function (resId) {
        return `${Origin}/resourcegroup/${resId}/edit`;
    },
    deleteResGroup: function (resId) {
        return `${Origin}/resourcegroup/${resId}/devices/delete`;
    },
    addDeviceToResGroup: function (resId) {
        return `${Origin}/resourcegroup/${resId}/devices/add`;
    },
    deleteDeviceFromResGroup: function (resId, deviceCode) {
        return `${Origin}/resourcegroup/${resId}/devices/${deviceCode}/delete`
    },
    deleteResourceGroup: function (resId) {
        return `${Origin}/resourcegroup/${resId}/delete`
    },
    getRecommendation: function (codeString, lang) {
        return `${Origin}/recommendation/${codeString}/${lang}`;
    },
    getRecommendationById: function (recId) {
        return `${Origin}/recommendation/${recId}`;
    }
};
export {Paths, ParameterizedPaths};