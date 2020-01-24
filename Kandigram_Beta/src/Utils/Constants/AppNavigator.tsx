import { createAppContainer } from 'react-navigation';
import React from "react";
import { createStackNavigator, } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Splash from "../../Screens/Authentications/Splash";
import SignUp from '../../Screens/Authentications/SignIn/SignUp';
import WelcomeSplash from "../../Screens/Authentications/WelcomeSplash";
import Profile from "../../Screens/Profile/Profile";
import Details from "../../Screens/Profile/Details";
import Login from "../../Screens/Authentications/Login/Login"
import Home from "../../Screens/Home/Home";
import ResetPassword from '../../Screens/Authentications/Login/ResetPassword';
import ForgetPassword from '../../Screens/Authentications/Login/ForgetPassword';
import CreateKandi from '../../Screens/Home/CreateKandi';
import ChatApp from "../../Screens/Home/ChatApp";
import ChatRoom from "../../Screens/Home/ChatRoom";
import LayoutAnimation from "../../Screens/Home/LayoutAnimation";
import Offlinekandies from "../../Screens/Home/OfflineKandies";
import { Image, StyleSheet } from "react-native";
import { vh, vw } from '../../Common/ResponsiveScreen';
import index from "../../Utils/Constants/index";
import AddEvent from '../../Screens/Home/AddEvent';
import Discover from '../../Screens/Home/Discover';
import AppintroSlider from "../../Common/IntroSlider/AppIntroSlider";
import Scanner from "../../Common/Scanner";
import Settings from "../../Screens/Settings/Settings";

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

const SettingsContainer = createStackNavigator({
  Settings: { screen: Settings }
})
const ScannerContainer = createStackNavigator({
  Scanner: { screen: Scanner }
},
  {
    headerMode: "none",
    navigationOptions: {
      gesturesEnabled: false,
      header: null
    }
  })

//

//

// craete tab navigator  
const TabContainer = createBottomTabNavigator(
  {
    

  },


)

const AppNavigator = createStackNavigator({
  Settings: { screen: SettingsContainer },

  tabs: { screen: TabContainer },

  Scanner: { screen: ScannerContainer },

  Splash: { screen: SplashContainer, },

  Profile: {
    screen: ProfileContainer
  },
 
  Home: {
    screen: HomeContainer
  }

},
  {
    headerMode: "none",
    initialRouteName: 'WelcomeSplash',
  }
);


export default createAppContainer(AppNavigator);