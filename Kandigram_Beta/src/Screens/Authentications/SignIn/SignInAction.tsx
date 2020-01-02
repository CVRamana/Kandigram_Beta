import ActionTypes from "../../../Utils/Constants/actionTypes";

export const SignUpAction = (params: any, successCallback: Function, errorCallback: Function) => {
    return function (dispatch: Function, getState: Function) {
        debugger
        let data = getState().SignInReducer.arr
        data.push("Raman Verma ")
        debugger
        dispatch({
            type: ActionTypes.dummy,
            arr: Array.from(data)
        })

    }

}