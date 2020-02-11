import axios from 'axios'
import index from "./Constants/index";
//import {showSnackBar} from "./utils";

//Utils, Common,Api
const postApiCall = (endPoint: string, params: object, successCallback: Function, errorCallBAck: Function,) => {
    debugger
    index.common.axiosInstance.post(endPoint, params).then((response: any) => {
        debugger
        if (response.data.code == 200) {
            successCallback(response);
        } else {
            errorCallBAck(response);
        }
    }).catch((error: any) => {
       // showSnackBar("Something went wrong. Please try again")
        errorCallBAck()
    })
}

const getApiCall = (endPoint: any, paramsData: string, successCallback: Function, errorCallBAck: Function) => {
    debugger
    index.common.axiosInstance.get(endPoint + paramsData).then((response: any) => {
      //  console.log(JSON.stringify(response))
        debugger
        if (response.data.code == 200) {

            successCallback(response)
        } else {
            debugger
            errorCallBAck(response);
        }
    }).catch((error: any) => {
      //  showSnackBar("Something went wrong. Please try again")
        errorCallBAck(error)

    })
}

const putApiCall = (endPoint: any, paramsData: any, successCallback: Function, errorCallBack: Function) => {
    debugger
    index.common.axiosInstance.put(endPoint, paramsData).then((response: any) => {
        debugger
        if (response.data.code == 200) {
            successCallback(response);
        } else {
            errorCallBack(response);
        }
    }).catch((error: any) => {

       // showSnackBar("Something went wrong. Please try again")
        errorCallBack()
    })
}

const deleteApiCall = (endPoint: string, paramsData: string = "", successCallback: Function, errorCalback: Function) => {
    console.log("endPoint", endPoint + paramsData);
    index.common.axiosInstance.delete(Common + endPoint + paramsData, {}).then((response: any) => {
       // console.log(response);
        successCallback(response);
    }).catch((error: any) => {
       // console.log(error.response)
        if (error.code === "ECONNABORTED") {
            let payload = {
                data: {
                    statusCode: 408
                }
            }
            errorCalback(payload);
        } else if (error.response) {
            errorCalback(error.response)
        } else if (!error.response) {
            let payload = {
                data: {
                    statusCode: ""
                }
            }
            errorCalback(payload);
        }
    })
}

const instaApiCall = (endPoint: string, token: string, successCallback: Function, errorCalback: Function) => {
    // GET request for remote image
    axios({
        method: 'get',
        url: endPoint + token,
        baseURL: Common.Common.apiUrl,
        timeout: 30000,
    })
        .then(function (response) {
            successCallback(response)
        })
        .catch(function (error) {
            errorCalback(error)
        });
}

const patchApiCall = (endPoint: string, params: object, successCallback: Function, errorCalback: Function) => {
    console.log("Endpoint: ", endPoint);
    console.log("Request: ", index.common.axiosInstance.defaults.headers);
    console.log("Params: ", params);

    index.common.axiosInstance.patch(endPoint, params)
        .then((response: any) => {
          //  console.log("response: ", response)
            successCallback(response);
        })
        .catch((error: any) => {
            console.log("Params: ", error);
            if (error.code === "ECONNABORTED") {
                let payload = {
                    data: {
                        statusCode: 408
                    }
                }
                errorCalback(payload);
            } else if (error.response) {
                console.log("Error: ", error.response);
                errorCalback(error.response)
            } else if (!error.response) {
                let payload = {
                    data: {
                        statusCode: ""
                    }
                }
                errorCalback(payload);
            }
        });
}

const getInstaLoginData = (paramsData: any, successCallback: Function) => {
    let instaApi = index.common.instaBaseURl + paramsData;
    index.common.axiosInstance.get(instaApi).then((response: any) => {
       // console.log(response);
        successCallback(response);
    }).catch((error: any) => {

    })
}

export default {
    postApiCall,
    getApiCall,
    instaApiCall,
    putApiCall,
    patchApiCall,
    deleteApiCall,
    getInstaLoginData
}


