import actionTypes from '../../Utils/Constants/actionTypes';
const InitialState = {
    contacts: [],
    chatData: [],
}
const ChatReducer = (state = InitialState, action: any) => {

    switch (action.type) {
        case actionTypes.chatAction:
            return (Object as any).assign({}, state, { contacts: action.contacts })
            break
        case actionTypes.chatDataAction:
           // debugger
            return (Object as any).assign({}, state, { chatData: action.chatData })
            break
        default:
            return state

    }
}
export default ChatReducer