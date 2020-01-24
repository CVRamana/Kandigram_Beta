import actionTypes from '../../Utils/Constants/actionTypes';
export const ChatAction=(param:any,successcallback:Function,errorCallback:Function)=>{
    return function (dispstch:Function,getSate:Function) {
        dispstch({
            type:actionTypes.chatAction,
            contacts:param
        })
    }
}
//chat
export const ChatDataAction=(param:any,successcallback:Function,errorCallback:Function)=>{
    return function (dispstch:Function,getSate:Function) {
       // debugger
        dispstch({
            type:actionTypes.chatDataAction,
            chatData:param
        })
    }
}