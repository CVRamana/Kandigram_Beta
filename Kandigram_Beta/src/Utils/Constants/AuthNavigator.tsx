import { createAppContainer } from 'react-navigation';
import React from "react";
import { createStackNavigator, } from 'react-navigation-stack';

import  SignUp  from "../../Screens/Authentications/SignIn/SignUp";
import  Login  from "../../Screens/Authentications/Login/Login";
import  ForgetPassword  from "../../Screens/Authentications/Login/ForgetPassword";
import  AppintroSlider  from "../../../src/Common/IntroSlider/AppIntroSlider";

const WelcomeSplashContainer = createStackNavigator({
    AppintroSlider: { screen: AppintroSlider }
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

  const LoginContainer = createStackNavigator({
    Login: {
      screen: Login
    },
    // ResetPassword: {
    //   screen: ResetPassword
    // },
    ForgetPassword: {
      screen: ForgetPassword
    }
  }, {
    headerMode: "none", navigationOptions: {
      gesturesEnabled: false,
      header: null
    },
  })


  const AuthFlowNavigation=createStackNavigator({
    SignUp: { screen: SignUPContainer },

    WelcomeSplash: {
      screen: WelcomeSplashContainer
    },
    Login: {
        screen: LoginContainer
      },
  },
  {
    headerMode: "none",
    initialRouteName: 'WelcomeSplash',
  }
  )

  export default createAppContainer(AuthFlowNavigation);