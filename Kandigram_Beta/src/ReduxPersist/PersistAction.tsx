import actionTypes from "../Utils/Constants/actionTypes";


export const PersistAction = (params: any, successCallback: Function, errorCallback: Function) => {
    return function (dispatch: Function, getState: Function) {
        debugger

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
        let arr=getState().PersistReducer.OfflineKandies
        alert("arjgjhr",arr)
        dispatch({
            type:actionTypes.offlineKandies,
            dispatch: param,

        })
        
    }
}