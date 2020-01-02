import actionTypes from "../Utils/Constants/actionTypes";

export const PersistAction=(params:any,successCallback:Function,errorCallback:Function)=>{
    return function(dispatch:Function,getState:Function){
        debugger
       let data=getState().PersistReducer.offlineData
       data.push("offline Setup finished")
    //    console.log(data)  
      debugger
        dispatch({
            type:actionTypes.offlineAction,
            offlineData:Array.from(data)
        })
    }

}