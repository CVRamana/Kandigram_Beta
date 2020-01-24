import actionTypes from "../Utils/Constants/actionTypes";
import { func } from "prop-types";


export const PersistAction = (params: any, successCallback: Function, errorCallback: Function) => {
    return function (dispatch: Function, getState: Function) {
       // debugger

        dispatch({
            type: actionTypes.offlineAction,
            uid: params
        })
    }

}
export const PersistCoverImgAction = (param: any, successCallback: Function, errorCallback: Function) => {
    return function (dispatch: Function, getState: Function) {
        dispatch({
            type: actionTypes.offlineCoverImg,
            coverImg: param
        })
    }
}


export const PersistProfileImgAction = (param: any, successCallback: Function, errorCallback: Function) => {
    return function (dispatch: Function, getState: Function) {
        dispatch({
            type: actionTypes.offlineProfileImg,
            profileImg: param
        })
    }
}
export const PersistOfflinekandiAction=(param:any,successCallback:Function,errorCallback:Function)=>{
    return function (dispatch:Function,getState:Function) {
        let offlineKandi=getState().PersistReducer.OfflineKandies
      
       // debugger
        dispatch({
            type:actionTypes.offlineKandies,
            OfflineKandies: param,

        })
        
    }
}

export const PersistDelete=(param:any,successCallback:Function,errorCallback:Function)=>{
    return function (dispatch:Function,getState:Function) {
        dispatch({
            type:actionTypes.Delete_PersistAction,
            uid:"",
            coverImg:'',
            profileImg:"",
        })
        
    }

}