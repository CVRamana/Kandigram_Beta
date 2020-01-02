import  actionTypes from "../Utils/Constants/actionTypes";
const initialState={
    offlineData:[]
}
const PersistReducer=(state=initialState,action:any)=>{
    switch(action.type){
        case actionTypes.offlineAction:
            return (Object as any).assign({},state,{offlineData:action.offlineData})

        default:
            return state
    }
}
export default PersistReducer