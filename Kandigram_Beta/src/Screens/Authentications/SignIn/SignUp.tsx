import * as React from 'react';
import { Text, View, StyleSheet, ImageBackground, ScrollView, TouchableOpacity, Button, Image } from 'react-native';
import { widthPercentageToDP, heightPercentageToDP } from 'react-native-responsive-screen';
import { calculateHeight, calculateWidth } from "../../../Common/ResponsiveScreen";
import DeviceInfo from 'react-native-device-info'
import { SignUpAction } from './SignInAction'
import { PersistAction } from '../../../ReduxPersist/PersistAction'
import AsyncStorage from '@react-native-community/async-storage'
import { connect } from "react-redux";
import { LoginButton, AccessToken } from 'react-native-fbsdk';
import Loader from '../../../Common/loader';
import index from "../../../Utils//Constants/index";

import {
  GoogleSignin,
  statusCodes,
} from '@react-native-community/google-signin';
import image from '../../../Utils/Constants/image';

import TextInputComponent from '../../../Common/TextInputComponent';
GoogleSignin.configure();

class SignUp extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isSigninInProgress: true,
      txt: "",

    };
  };

  handleInput(val) {
    this.setState({
      txt: val
    })

  }


  signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      alert(JSON.stringify(userInfo))
      this.setState({ userInfo });
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        alert("error")
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };


  componentDidMount() {
    // this.clearAsyncStorage()
  }
  clearAsyncStorage = async () => {
    await AsyncStorage.clear();
  }
  onPress = () => {
    debugger
    this.props.SignUpAction()
  }
  onPersist = () => {
    this.props.PersistAction()
  }
  render() {
    return (
      <View style={{ flex: 1, }}>
        <ImageBackground
          source={image.signup_bg}
          style={styles.container}>
          <Loader
            isLoading={false}
          />

          {/* <Text> {DeviceInfo.getDeviceId}</Text>
          <Button onPress={() => this.onPress()} title={"Redux"} />
          <Button onPress={() => this.onPersist()} title={"Redux Persist"} />
          */}
          <Button
            title="GoogleSignIn "
            onPress={() => this.signIn()}
          />


        </ImageBackground>

        <View style={{
          flex: .70,
          paddingLeft: 16,
          // backgroundColor: "pink"
        }}>

          <TextInputComponent
            ref="first"
            commonPlaceholder={"FirstTextInput"}
            commonReturnKeyType={"next"}
            commonOnSubmitEditing={() => this.refs.second.refs.commonInputRef.focus()}
          />

          <TextInputComponent
            ref="second"
            commonPlaceholder={"secondTextInput"}
            commonReturnKeyType={"next"}
            commonOnSubmitEditing={() => this.refs.third.refs.commonInputRef.focus()}
          />
          <TextInputComponent
            ref="third"
            commonPlaceholder={"secondTextInput"}
            commonReturnKeyType={"next"}
            commonOnSubmitEditing={() => this.refs.fourth.refs.commonInputRef.focus()}
          />
          <TextInputComponent
            ref="fourth"
            commonPlaceholder={"secondTextInput"}
            commonReturnKeyType={"next"}
            commonOnSubmitEditing={() => this.refs.fifth.refs.commonInputRef.focus()}
          />
          <TextInputComponent
            ref="fifth"
            commonPlaceholder={"secondTextInput"}
            commonReturnKeyType={"next"}
            commonOnSubmitEditing={() => alert("Submit action")}
          />
          <View style={{ flexDirection: "row" }}>
            <Image
              source={image.check}
              style={styles.check}
            />
            <Text style={{ marginTop: heightPercentageToDP(calculateHeight(35)) }}>{index.strings.terms} </Text>
          </View>
          <LoginButton
            onLoginFinished={
              (error, result) => {
                if (error) {
                  console.log("login has error: " + result.error);
                } else if (result.isCancelled) {
                  console.log("login is cancelled.");
                } else {
                  AccessToken.getCurrentAccessToken().then(
                    (data) => {
                      console.log(data.accessToken.toString())
                      // alert(JSON.stringify(data))
                    }
                  )
                }
              }
            }
            onLogoutFinished={() => console.log("logout.")} />
          <Button
            title="GoogleSignIn "
            onPress={() => this.signIn()}
          />
        </View>
      </View>
    );
  }
};

const mapStateToProps = (state: any) => {
  return {
    arr: state.SignInReducer.arr,
    offlineData: state.PersistReducer.offlineData,
  }
}

const mapDispatchToProps = {
  SignUpAction: SignUpAction,
  PersistAction: PersistAction
}

const styles = StyleSheet.create({
  container: {
    flex: .3,

  },
  check: {
    marginLeft: 24,
    marginTop: heightPercentageToDP(calculateHeight(30)),
    height: heightPercentageToDP(calculateHeight(28)),
    width: widthPercentageToDP(calculateWidth(28))
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);