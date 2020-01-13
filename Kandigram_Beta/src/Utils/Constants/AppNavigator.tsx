import { createAppContainer} from 'react-navigation';
import { createStackNavigator, } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Splash from "../../Screens/Authentications/Splash";
import SignUp from '../../Screens/Authentications/SignIn/SignUp';
import WelcomeSplash from "../../Screens/Authentications/WelcomeSplash";
import Profile from "../../Screens/Profile/Profile";
import  Details from "../../Screens/Profile/Details";
import Login from "../../Screens/Authentications/Login/Login"
import Home from "../../Screens/Home/Home";
import ResetPassword from '../../Screens/Authentications/Login/ResetPassword';
import ForgetPassword from '../../Screens/Authentications/Login/ForgetPassword';
import CreateKandi from '../../Screens/Home/CreateKandi';

const SplashContainer = createStackNavigator({

  Splash: {
    screen: Splash,
  },
},
  {
    headerMode: "none",
    navigationOptions: {
      gesturesEnabled: false,
      header: null
  },
  },
)
//
const WelcomeSplashContainer = createStackNavigator({
  WelcomeSplash: {
    screen: WelcomeSplash,
  },
},
  {
    headerMode: "none",
    navigationOptions: {
      gesturesEnabled: false,
      header: null
  },
  },
)
//
const SignUPContainer = createStackNavigator({
  SignUp: {
    screen: SignUp,
  }
},
  {
    headerMode: "none",
    navigationOptions: {
      gesturesEnabled: false,
      header: null
  },

  },
)

//
const LoginContainer=createStackNavigator({
  Login:{
    screen:Login
  },
  ResetPassword:{
    screen:ResetPassword
  },
  ForgetPassword:{
    screen:ForgetPassword
  }
},{
  headerMode:"none", navigationOptions: {
    gesturesEnabled: false,
    header: null
},
})
//
const ProfileContainer=createStackNavigator({
  profile:{
    screen:Profile,
  },
  Details:{
    screen:Details
  }
},
{
  headerMode:'none', 
  navigationOptions: {
    gesturesEnabled: false,
    header: null
},
}
)
//
const HomeContainer=createStackNavigator({
Home:{
  screen:Home,
},CreateKandi:{screen:CreateKandi},
},{
  headerMode:"none",
  navigationOptions: {
    gesturesEnabled: false,
    header: null
},
})
// craete tab navigator  
const tabs=createBottomTabNavigator(
  { 
    Home:{screen:Home},
   // secondTab: {screen: secondTab},
  //  scan: {screen: Scan},
  //  Notifications: {screen: NotificationStack},
   // Settings: {screen: SettingsStack},

},
{
  

})

const AppNavigator = createStackNavigator({
  Splash: {
    screen: SplashContainer,
  },
  SignUp: {
    screen: SignUPContainer
  },
  WelcomeSplash:{
    screen:WelcomeSplashContainer
  },
  Profile:{
    screen:ProfileContainer
  },
  Login:{
    screen:LoginContainer
  },
  Home:{
    screen:HomeContainer
  }
 
},
  {
    headerMode: "none",
    initialRouteName: 'Splash',
  }
);

export default createAppContainer(AppNavigator);