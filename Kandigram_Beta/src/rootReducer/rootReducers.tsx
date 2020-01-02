import {combineReducers} from "redux";
import SignInReducer from "../Screens/Authentications/SignIn/SignInReducer";
import PersistReducer from "../ReduxPersist/PersistReducer";
import GlobalReducer from '../GlobalRedux/GlobalReducer'
const RootReducers=combineReducers({
    SignInReducer,
    PersistReducer,
    GlobalReducer,
})
export default RootReducers