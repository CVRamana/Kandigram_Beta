import actionTypes from "../Utils/Constants/actionTypes";

const initialState={
    isInternet:false,
    userInfo:'hgdfh'
}
const GlobalReducer=(state=initialState,action:any )=>{
switch(action.type){
    case actionTypes.isInternet:
     //   debugger
        return (Object as any).assign({},state,{isInternet:action.isInternet})
    default:
       return state
}
}
export default GlobalReducer