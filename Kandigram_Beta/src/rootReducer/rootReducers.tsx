import {combineReducers} from "redux";
import SignInReducer from "../Screens/Authentications/SignIn/SignInReducer";
import PersistReducer from "../ReduxPersist/PersistReducer";
import GlobalReducer from '../GlobalRedux/GlobalReducer'
import ChatReducer from "../Screens/Home/ChatReducer";
const RootReducers=combineReducers({
    SignInReducer,
    PersistReducer,
    GlobalReducer,
    ChatReducer,
})
export default RootReducers