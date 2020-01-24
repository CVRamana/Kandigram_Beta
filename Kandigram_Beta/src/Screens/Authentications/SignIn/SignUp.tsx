import * as React from 'react';
import { Text, View, StyleSheet, ImageBackground, ScrollView, TouchableOpacity, Button, Image } from 'react-native';
import { widthPercentageToDP, heightPercentageToDP } from 'react-native-responsive-screen';
import { calculateHeight, calculateWidth, vh, vw } from "../../../Common/ResponsiveScreen";
import DeviceInfo from 'react-native-device-info'
import { SignUpAction, UpdateInputAction } from './SignInAction'
import { PersistAction } from '../../../ReduxPersist/PersistAction'
import AsyncStorage from '@react-native-community/async-storage'
import { connect } from "react-redux";
import { LoginManager, AccessToken, GraphRequest, GraphRequestManager } from 'react-native-fbsdk';
import Loader from '../../../Common/loader';
import index from "../../../Utils//Constants/index";
import firebase from "react-native-firebase";
import { db } from '../../../Utils/FirebaseConfig'
import image from '../../../Utils/Constants/image';
import TextInputComponent from '../../../Common/TextInputComponent';
import colors from '../../../Utils/Constants/colors';
import ButtonComponent from '../../../Common/ButonComponent';
import CommonEye from '../../../Common/CommonEye';
import HeaderComponent from '../../../Common/HeaderComponent';
import { validate } from '../../../Common/validate';

interface Props {
  UpdateInputAction: Function
  email: string
  password: string
  name: string
  mobile: string
  username: string
  navigation: any
  PersistAction: Function
  SignUpAction: Function


  val: string
  commonPlaceholder: string
  commonReturnKeyType: string
  commonOnChangeText: Function


}
interface State {
  isloading: boolean
  isSigninInProgress: boolean
  txt: string
  isSecure: boolean
  isChecked: boolean
  isSecureText: boolean
  errorMessage: string
  beColor: string
  teColor: string
  b2Color: string
  t2Color: string
  bnColor: string
  tnColor: string
  bmColor: string
  tmColor: string
  buColor: string
  tuColor: string


}

class SignUp extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      isSigninInProgress: true,
      txt: "",
      isSecure: true,
      isSecureText: false,
      isChecked: false,
      isloading: false,
      errorMessage: "",
      beColor: index.colors.textInputBorderColor,
      teColor: index.colors.whiteColor,
      b2Color: index.colors.textInputBorderColor,
      t2Color: index.colors.whiteColor,
      bnColor: index.colors.textInputBorderColor,
      tnColor: index.colors.whiteColor,
      bmColor: index.colors.textInputBorderColor,
      tmColor: index.colors.whiteColor,
      buColor: index.colors.textInputBorderColor,
      tuColor: index.colors.whiteColor,
    };
  };

  handleInput(key: any, val: any) {
    this.props.UpdateInputAction(key, val)
    // this.setState({})
  }
  // Sign UP Action 
  handleSignUp = () => {
    this.setState({ isloading: !this.state.isloading })
    //  alert(this.props.password)
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.props.email, this.props.password)
      .then((res) => {
        let values = {
          name: this.props.name,
          email: this.props.email,
          mobile: this.props.mobile,
          username: this.props.username,
          password: this.props.password,
        }
        this.setNewUserToFireBase(values, res.user.uid)
        // this.props.navigation.navigate('Profile')
      })
      .catch(error => this.setState({ errorMessage: error.message, isloading: false }, () => alert(error)))
  }

  //save to firebase the info
  setNewUserToFireBase = (res: any, uid: string) => {
    //alert(JSON.stringify(res))
    console.warn("save =>", res)
    var obj = res;
    obj["uid"] = uid
    console.warn("save object_1=>", obj)
    db.ref('/Users').child(uid).set(res, (val) => {
      console.warn("val", val, "if null means success")
      if (val === null) {
        this.setState({ isloading: !this.state.isloading })
        this.props.navigation.navigate('Login')
        console.warn("sucess")
      }
    })
  }
  componentDidMount() {
    //this.clearAsyncStorage()
  }
  // fb login
  fblogin = () => {
    LoginManager.logInWithPermissions(['email', 'public_profile']).then
      (result => {
        if (result.isCancelled) { console.log('Login cancelled'); return; }
        else {
          console.log('Login success with permissions: ' + result.grantedPermissions.toString());
          this.setState({ isloading: true })
        } {
          AccessToken.getCurrentAccessToken().then(data => {
            let accessToken = data.accessToken;
            console.log(data.accessToken.toString());
            // login with the firebase Facebook
            const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);
            firebase.auth().signInWithCredential(credential)
              .then((res) => {
                console.warn("suucess save in the firebase facebook: ", res)
              })
              .catch((err) => {
                console.log(err)
              })
           // debugger
            //console.warn(JSON.stringify(firebaseUserCredential.user.toJSON()))
            console.log(data.accessToken.toString())
            const responseInfoCallback = (error: any, result: any) => {
              if (error) {
                console.log(error);
                alert('Unable to Login, Please try again!')
                this.setState({ isloading: false })
              } else {
                console.log('Success fetching data: ' + JSON.stringify(result));
                console.warn('FB PIC', result.picture.data.url);
                //   this.props.setProfileData(result.name, result.email, result.picture.data.url, 'fb')
                alert('res ' + JSON.stringify(result))
                //  console.log('redux res ', this.props.profileData);
                // this.setState({ isLoading: false })
                // this.props.navigation.navigate('CreateProfile', { "profile_pic": result.picture.data.url })
              }
            }
            const infoRequest = new GraphRequest('/me',
              { accessToken: accessToken, parameters: { fields: { string: 'email,name,first_name,middle_name,last_name,picture.type(large)', }, }, },
              responseInfoCallback); new GraphRequestManager().addRequest(infoRequest).start();
          });
        }
      }, function (error: any) { console.log('Login fail with error: ' + error); });


  }
  // fb logout 
  fblogout = () => {
    let current_access_token = '';
    AccessToken.getCurrentAccessToken()
      .then((data:any) => {
        alert(JSON.stringify(data))
        current_access_token = data.accessToken.toString();
      }).then(() => {
        let logout = new GraphRequest(
          "me/permissions/",
          {
            accessToken: current_access_token,
            httpMethod: 'DELETE'
          },
          (error: any, result: any) => {
            if (error) {
              console.warn('Error fetching data: ' + error.toString());
            } else {
              LoginManager.logOut();
              alert("loout")

            }
          });
        new GraphRequestManager().addRequest(logout).start();
      })
      .catch((error:any) => {
        console.warn("error in logout: ", error)
      });
  }
  clearAsyncStorage = () => {
    AsyncStorage.clear();
  }

  // validate all
  validation = (type: any) => {
    switch (type) {
      case "name":
        let flag = validate({ type: "name", val: this.props.name })
        if (flag) {
          this.setState({ bnColor: index.colors.textInputBorderColor, tnColor: index.colors.whiteColor })
          this.refs.second.refs.commonInputRef.focus()
        }
        else {
          this.setState({ bnColor: "red", tnColor: "red" })
        
        }
     
        break
      case "mobile":
        let flag1 = validate({ type: "mobile", val: this.props.mobile })
        if (flag1) {
          this.setState({ bmColor: index.colors.textInputBorderColor, tmColor: index.colors.whiteColor })
          this.refs.third.refs.commonInputRef.focus()
        }
        else {
          this.setState({ bmColor: "red", tmColor: "red" })
        }
        break

      case "email":
        let flag2 = validate({ type: "email", val: this.props.email })
        if (flag2) {
          this.setState({ beColor: index.colors.textInputBorderColor, teColor: index.colors.whiteColor })
          this.refs.fourth.refs.commonInputRef.focus()
          alert(flag2)
        } else {
          this.setState({ beColor: "red", teColor: "red" })
        }

        break
      case "username":
        let flag3 = validate({ type: "username", val: this.props.username })
        if (flag3) {
          this.setState({ buColor: index.colors.textInputBorderColor, tuColor: index.colors.whiteColor })
          this.refs.fifth.refs.commonInputRef.focus()
          alert(flag3)
        }
        else {
          this.setState({ buColor: "red", tuColor: "red" })
          alert(flag3)
        }

        break;
      case "password":
        let flag4 = validate({ type: "password", val: this.props.password })
        if (flag4) {
          this.setState({ b2Color: index.colors.textInputBorderColor, t2Color: index.colors.whiteColor })
        }
        else {
          this.setState({ b2Color: "red", t2Color: "red" })
        }
        break
    }

  }

 
  onPress = () => {
   // debugger
    this.props.SignUpAction()
  }
  onPersist = () => {
    this.props.PersistAction()
  }
  render() {

    return (
      <ImageBackground
        source={{}}
        style={{ flex: 1, backgroundColor: 'rgb(19,31,52)' }}>
        {/* <ImageBackground
          source={image.signup_bg}
          style={styles.container}>
          <Loader
            isLoading={false}
          />
          
          <Text style={styles.helloStyle}> {index.strings.helloText}</Text>
          <Text style={styles.signUpstyle}>{index.strings.signUpText} </Text>

        </ImageBackground> */}
        <View style={{ position: "absolute", top: 0, zIndex: 300 }}>
          <HeaderComponent
            firstText={index.strings.helloText}
            secondText={index.strings.signUpText}
            //   page="WelcomeScreen"
            handleClick={() => this.props.navigation.navigate("AppintroSlider")}
          />
        </View>
        {/* <Text> {DeviceInfo.getDeviceId}</Text>
          <Button onPress={() => this.onPress()} title={"Redux"} />
          <Button onPress={() => this.onPersist()} title={"Redux Persist"} />
          */}
        <ScrollView>
          <View style={{

            width: widthPercentageToDP(calculateWidth(375)),
            paddingBottom: vh(100),
            paddingLeft: vw(16),

            paddingTop: vh(270),

          }}>

            <View style={[styles.inputBox,{borderColor: this.state.bnColor, }]}>
              <TextInputComponent
                ref="first"
                //   val={this.state.name}
                commonPlaceholder={"Name*"}
                commonReturnKeyType={"next"}
                commonOnSubmitEditing={() =>this.validation("name")}
                commonOnChangeText={(val: any) => this.handleInput('name', val)}
                commonSecureTextEntry={false}
                extraStyle={{ borderColor: "transparent", color: this.state.tnColor,borderWidth: vw(0) }}
              />
            </View>
            {/* mobileNumber */}
            <View style={[styles.inputBox, { marginTop: vh(30), borderColor: this.state.bmColor,}]}>
              <TextInputComponent
                ref="second"
                //  val={this.state.mobile}
                commonPlaceholder={"Mobile Number*"}
                commonReturnKeyType={"next"}
                commonOnSubmitEditing={() => this.validation("mobile")}
                commonOnChangeText={(val: any) => this.handleInput('mobile', val)}
                commonSecureTextEntry={false}
                extraStyle={{ borderColor: "transparent", borderWidth: vw(0),color:this.state.tmColor }}
              />
            </View>
            {/* Email */}
            <View style={[styles.inputBox, { marginTop: vh(30), borderColor: this.state.beColor, }]}>
              <TextInputComponent
                ref="third"
                //  val={this.state.email}
                commonPlaceholder={"Email Address*"}
                commonReturnKeyType={"next"}
                commonOnSubmitEditing={() => this.validation("email")}
                commonOnChangeText={(val: any) => this.handleInput('email', val)}
                commonSecureTextEntry={false}
                //  commonOnBlur={()=>this.validateEmail()}
                extraStyle={{ borderColor: "transparent", color: this.state.teColor, borderWidth: vw(0) }}
              />
            </View>
            {/* username */}
            <View style={[styles.inputBox, { marginTop: vh(30),borderColor: this.state.buColor, }]}>
              <TextInputComponent
                ref="fourth"
                // val={this.state.username}
                commonPlaceholder={"UseraName*"}
                commonReturnKeyType={"next"}
                commonOnSubmitEditing={() => this.validation("username")}
                commonOnChangeText={(val: any) => this.handleInput('username', val)}
                commonSecureTextEntry={false}
                extraStyle={{ borderColor: "transparent", color: this.state.tuColor, borderWidth: vw(0) }}
              />
            </View>
            {/* password */}
            <View style={[styles.pwd, { borderColor: this.state.b2Color, }]} >
              <TextInputComponent
                ref="fifth"
                // val={this.state.password}
                commonPlaceholder={"password*"}
                commonReturnKeyType={"next"}
                commonOnSubmitEditing={() => this.validation("password")}
                commonOnChangeText={(val: any) => this.handleInput('password', val)}
                commonSecureTextEntry={this.state.isSecureText}
                extraStyle={{
                  backgroundColor: "transparent",
                  // borderColor: this.state.b2Color,
                  color: this.state.t2Color,
                  width: vw(280),
                  borderWidth: 0,
                  borderColor: "transparent",
                  height: vh(50)
                }}
              />


              <View style={styles.secure11}>
                <CommonEye
                  isSecureProp={this.state.isSecure}
                  handlePress={() => this.setState({
                    isSecure: !this.state.isSecure,
                    isSecureText: !this.state.isSecureText
                  })}
                />
              </View>

            </View>

            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                onPress={() => this.setState({ isChecked: !this.state.isChecked })}>
                {this.state.isChecked ?
                  <Image
                    source={image.check}
                    style={styles.check}
                  /> :
                  <Image
                    source={image.uncheck}
                    style={styles.check}
                  />
                }

              </TouchableOpacity>

              <Text style={styles.termText}>{index.strings.terms} </Text>
            </View>


            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", marginTop: vh(48) }}>

              <View style={{ flexDirection: "row", justifyContent: "space-between", width: vw(148) }}>
                <TouchableOpacity
                  onPress={() => this.fblogin()}
                  style={styles.fbimg}
                >
                  <Image
                    style={styles.fbimg}
                    source={index.image.fb}
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => this.fblogout()}
                  style={styles.fbimg}
                >
                  <Image
                    style={styles.fbimg}
                    source={index.image.fb}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ marginTop: heightPercentageToDP(calculateHeight(48)), marginBottom: vh(50), }}>
              <ButtonComponent
                myStyle={{ width: widthPercentageToDP(calculateWidth(340)), backgroundColor: "red" }}
                name={"Sign Up"}
                onButtonPress={() => this.handleSignUp()}
              />
            </View>


          </View>
        </ScrollView>
        <Loader isLoading={this.state.isloading} />
      </ImageBackground>
    );
  }
};

const mapStateToProps = (state: any) => {
  return {
    arr: state.SignInReducer.arr,
    uid: state.PersistReducer.uid,
    offlineData: state.PersistReducer.offlineData,
    name: state.SignInReducer.name,
    username: state.SignInReducer.username,
    mobile: state.SignInReducer.mobile,
    email: state.SignInReducer.email,
    password: state.SignInReducer.password,
  }
}

const mapDispatchToProps = {
  SignUpAction: SignUpAction,
  PersistAction: PersistAction,
  UpdateInputAction: UpdateInputAction,
}

const styles = StyleSheet.create({
  container: {
    flex: .3,

  },
  termText:
  {
    marginTop: heightPercentageToDP(calculateHeight(35)),
    marginLeft: vw(15),
    fontFamily: "Ubuntu-Medium",
    fontSize: vw(14),
    fontWeight: "500",
    fontStyle: "normal",
    letterSpacing: 0.17,
    color: colors.whiteColor
  },
  pwd: {
    flexDirection: "row",
    backgroundColor: colors.textInputBGColor,
    borderColor: colors.textInputBorderColor,
    borderStyle: "solid",
    fontWeight: "bold",
    fontStyle: "normal",
    letterSpacing: 0.19,
    color: colors.whiteColor,
    borderWidth: vw(2),
    marginTop: vh(30),
    width: vw(343),
    borderRadius: 1000,
    height: vh(50),

  },
  inputBox: {
    // backgroundColor:"red",
    backgroundColor: colors.textInputBGColor,
    borderColor: colors.textInputBorderColor,
    borderWidth: vw(2),
    width: vw(343),
    borderRadius: 1000,
    height: vh(50),
  },
  check: {
    marginLeft: vw(24),
    marginTop: heightPercentageToDP(calculateHeight(30)),
    height: heightPercentageToDP(calculateHeight(28)),
    width: widthPercentageToDP(calculateWidth(28))
  },

  secure11: {
    height: heightPercentageToDP(calculateHeight(50)),
    width: widthPercentageToDP(calculateWidth(50)),
    justifyContent: "center",
    alignItems: "center",

  },
  fbimg: {
    height: vh(50),
    width: vw(50)
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);