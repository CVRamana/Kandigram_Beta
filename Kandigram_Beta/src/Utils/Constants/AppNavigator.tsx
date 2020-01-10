import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Splash from "../../Screens/Authentications/Splash";
import SignUp from '../../Screens/Authentications/SignIn/SignUp';
import WelcomeSplash from "../../Screens/Authentications/WelcomeSplash";
import Profile from "../../Screens/Profile/Profile";
import Login from "../../Screens/Authentications/Login/Login"
import Home from "../../Screens/Home/Home";

const SplashContainer = createStackNavigator({

  Splash: {
    screen: Splash,
  },
},
  {
    headerMode: "none"
  },
)
const WelcomeSplashContainer = createStackNavigator({
  WelcomeSplash: {
    screen: WelcomeSplash,
  },
},
  {
    headerMode: "none"
  },
)
const SignUPContainer = createStackNavigator({
  SignUp: {
    screen: SignUp,
  }
},
  {
    headerMode: "none"
  },
)
const LoginContainer=createStackNavigator({
  Login:{
    screen:Login
  }
},{
  headerMode:"none"
})
const ProfileContainer=createStackNavigator({
  profile:{
    screen:Profile,
  },
},
{
  headerMode:'none'
}
)
const HomeContainer=createStackNavigator({
Home:{
  screen:Home,
}
},{
  headerMode:"none"
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