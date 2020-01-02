import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Splash from "../../Screens/Authentications/Splash";
import SignUp from '../../Screens/Authentications/SignIn/SignUp';

const SplashContainer = createStackNavigator({
  Splash: {
    screen: Splash,
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
  }
},
  {
    headerMode: "none",
    initialRouteName: 'Splash',
  }
);

export default createAppContainer(AppNavigator);