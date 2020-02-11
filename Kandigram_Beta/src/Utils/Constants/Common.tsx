//@ts-ignore
import {Platform} from 'react-native';
//@ts-ignore
const axios = require('axios');
import {getApiUrlAccordingToEnvironment} from "../Utils";
import DeviceInfo from 'react-native-device-info';

const $http = axios.create({
    //@ts-ignore
    baseURL: getApiUrlAccordingToEnvironment(),
    timeout: 30000,
    headers: {
        'Content-Type': 'application/json'
    }
});

export default {
    BaseURl: "https://14f63a2b.ngrok.io",
    instaBaseURl: "https://api.instagram.com/v1/users/self/?access_token=",
    success: "success",
    isIOS: Platform.OS === "ios",
    deviceType: Platform.OS == "ios" ? "IOS" : "ANDROID",
    axiosInstance: $http,
    deviceId: DeviceInfo.getUniqueId(),
    currentCountryCode: DeviceInfo.getDeviceType(),
    phonenumer: '/^[0-9]+$/',
}
