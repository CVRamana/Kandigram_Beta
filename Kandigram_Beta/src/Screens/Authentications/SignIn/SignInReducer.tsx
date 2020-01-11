import ActionTypes from "../../../Utils/Constants/actionTypes";
const initialState={
    arr:[],
    name:"",
    mobile:"",
    email:"",
    username:"",
    password:"",

};
const SignInReducer=(state=initialState,action:any)=>{
    switch(action.type){
        case ActionTypes.dummy:
            return (Object as any).assign({},state,{arr:action.arr})
            break
        case ActionTypes.updateInput:
            return (Object as any).assign({},state,{...action.payload})
        default:
        return state

    }
}
export default SignInReducer