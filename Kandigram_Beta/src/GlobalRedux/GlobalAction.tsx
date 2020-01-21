import actionTypes from "../Utils/Constants/actionTypes";
export const GlobalAction=(params:any,successCallback:Function,errorCallback:Function)=>{
    return function(dispatch:Function, getState:Function){
        debugger
        dispatch({
          //  type:actionTypes.isInternet,
            isInternet:params
        })
    }
}
export const GlobalInternetAction=(params:any,successCallback:Function,errorCallback:Function)=>{
    return function (dispatch:Function,getState:Function) {
        debugger
        dispatch({
            type:actionTypes.isInternet,
            isInternet:params
        })
        
    }
}