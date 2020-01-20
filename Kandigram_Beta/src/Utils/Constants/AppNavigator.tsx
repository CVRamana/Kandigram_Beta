import { createAppContainer} from 'react-navigation';
import React from "react";
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
import ChatApp from "../../Screens/Home/ChatApp";
import ChatRoom from "../../Screens/Home/ChatRoom";
import LayoutAnimation from "../../Screens/Home/LayoutAnimation";
import Offlinekandies from "../../Screens/Home/OfflineKandies";
import {Image,StyleSheet} from "react-native";
import { vh, vw } from '../../Common/ResponsiveScreen';
import index from "../../Utils/Constants/index";
import AddEvent from '../../Screens/Home/AddEvent';
import Discover from '../../Screens/Home/Discover';
import AppintroSlider from "../../Common/IntroSlider/AppIntroSlider";
import Scanner from "../../Common/Scanner";

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
  AppintroSlider:{screen:AppintroSlider}
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
const ScannerContainer=createStackNavigator({
Scanner:{screen:Scanner}
},
{
  headerMode: "none",
  navigationOptions: {
    gesturesEnabled: false,
    header: null
}
})

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
Home:{screen:Home,},
CreateKandi:{screen:CreateKandi},
ChatApp:{screen:ChatApp},
ChatRoom:{screen:ChatRoom},
LayoutAnimation:{screen:LayoutAnimation},
Offlinekandies:{screen:Offlinekandies},
AddEvent:{screen:AddEvent},
Discover:{screen:Discover}
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
    Profile: {screen: Profile},

},

{

  defaultNavigationOptions: ({navigation}) => ({
      tabBarIcon: ({focused, tintColor}) => {
          const {routeName} = navigation.state;
          if (routeName === 'Home') {
              return focused ? <Image resizeMode={'contain'} source={index.image.homeIconEn} style={styles.iconImg}/> : <Image resizeMode={'contain'} source={index.image.homeIconDis}
                         style={styles.iconImg}/>
          } else if (routeName === 'navigation') {
              return focused ? <Image resizeMode={'contain'} source={index.image.DiscIconEn}
                                      style={styles.iconImg}/> :
                  <Image resizeMode={'contain'} source={index.image.DiscIconDis}
                         style={styles.iconImg}/>
          } else if (routeName === 'scan') {
              return <Image resizeMode={'contain'} source={index.image.scancon}
                            style={[styles.iconImg,{ marginBottom: vw(50)}]}/>
          } else if (routeName === 'createProfile') {
              return focused ? <Image resizeMode={'contain'} source={index.image.NotIcon}
                                      style={{height: vh(25), width: vw(25)}}/> :
                  <Image resizeMode={'contain'} source={index.image.NotIconDis}
                         style={styles.iconImg}/>
          } else if (routeName === 'Profile') {
              return focused ? <Image resizeMode={'contain'} source={index.image.profileEn}
                                      style={styles.iconImg}/> :
                  <Image resizeMode={'contain'} source={index.image.profileDis}
                         style={styles.iconImg}/>
          }
          return null;
      }
  }),
  // tabBarComponent: props => <SafeAreaMaterialTopTabBar {...props} />,
  tabBarOptions: {
      style: {
          height: vh(100),
          backgroundColor: 'rgb(38,55,90)',
          borderTopColor: 'transparent    '
      },
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
      showIcon: true,
      showLabel: false,
      scrollEnabled: true
  },
  tabBarPosition: 'bottom',
  animationEnabled: true,
 swipeEnabled: true
}
)

const AppNavigator = createStackNavigator({

  tabs:{screen:tabs},
  Scanner:{screen:Scanner},

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
    initialRouteName: 'WelcomeSplash',
  }
);
const styles=StyleSheet.create({
  iconImg:{
    height: vh(25), 
    width: vw(25)
  }

})

export default createAppContainer(AppNavigator);