import actionTypes from '../../Utils/Constants/actionTypes';
const InitialState = {
   events:[]
}
const HomeReducer = (state = InitialState, action: any) => {

    switch (action.type) {
        case actionTypes.HomeAction:
            return (Object as any).assign({}, state, { events: action.events })
            break
        // case actionTypes.chatDataAction:
        //     debugger
        //     return (Object as any).assign({}, state, { chatData: action.chatData })
        //     break
        default:
            return state

    }
}
export default HomeReducer