import actionTypes from "../Utils/Constants/actionTypes";

export const PersistAction=(params:any,successCallback:Function,errorCallback:Function)=>{
    return function(dispatch:Function,getState:Function){
        debugger
    
      debugger
        dispatch({
            type:actionTypes.offlineAction,
            uid:params
        })
    }

}