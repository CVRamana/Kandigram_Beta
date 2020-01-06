import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Splash from "../../Screens/Authentications/Splash";
import SignUp from '../../Screens/Authentications/SignIn/SignUp';
import WelcomeSplash from "../../Screens/Authentications/WelcomeSplash";

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

const AppNavigator = createStackNavigator({
  Splash: {
    screen: SplashContainer,
  },
  SignUp: {
    screen: SignUPContainer
  },
  WelcomeSplash:{
    screen:WelcomeSplashContainer
  }
},
  {
    headerMode: "none",
    initialRouteName: 'Splash',
  }
);

export default createAppContainer(AppNavigator);