import ActionTypes from "../../../Utils/Constants/actionTypes";
const initialState={
    arr:[]
};
const SignInReducer=(state=initialState,action:any)=>{
    switch(action.type){
        case ActionTypes.dummy:
            return (Object as any).assign({},state,{arr:action.arr})
            break
        default:
        return state
    }
}
export default SignInReducer