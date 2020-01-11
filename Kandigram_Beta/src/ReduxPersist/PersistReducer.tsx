import  actionTypes from "../Utils/Constants/actionTypes";
const initialState={
    uid:""
}
const PersistReducer=(state=initialState,action:any)=>{
    switch(action.type){
        case actionTypes.offlineAction:
            return (Object as any).assign({},state,{uid:action.uid})

        default:
            return state
    }
}
export default PersistReducer