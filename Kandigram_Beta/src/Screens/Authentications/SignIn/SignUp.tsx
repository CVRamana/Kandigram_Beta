import * as React from 'react';
import { Text, View, StyleSheet, ImageBackground, ScrollView, TouchableOpacity, Button, Image } from 'react-native';
import { widthPercentageToDP, heightPercentageToDP } from 'react-native-responsive-screen';
import { calculateHeight, calculateWidth } from "../../../Common/ResponsiveScreen";
import DeviceInfo from 'react-native-device-info'
import { SignUpAction,UpdateInputAction } from './SignInAction'
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

interface Props{
  UpdateInputAction:Function
  email:string
  password:string
  name:string
  mobile:string
  username:string
  navigation:any
  PersistAction:Function
  SignUpAction:Function
  
  
  val:string
  commonPlaceholder:string
  commonReturnKeyType:string
  commonOnChangeText:Function


}
interface State{
isloading:boolean
isSigninInProgress:boolean
txt:string
isSecure:boolean
isChecked:boolean
isSecureText:boolean
errorMessage:string
SignUpAction:Function

}

class SignUp extends React.Component<Props,State> {
  constructor(props:Props) {
    super(props)

    this.state = {
      isSigninInProgress: true,
      txt:"",
      isSecure: true,
      isSecureText: false,
      isChecked: false,
      isloading:false,
      errorMessage:""
      


    };
  };

  handleInput(key:any,val:any) {
   this.props.UpdateInputAction(key,val)
  }
  // Sign UP Action 
  handleSignUp = () => {
    this.setState({isloading:!this.state.isloading})
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
      .catch(error => this.setState({ errorMessage: error.message }, () => alert(error)))
  }

  //save to firebase the info
  setNewUserToFireBase = (res:any, uid:string) => {
    //alert(JSON.stringify(res))
    console.warn("save =>", res)
    var obj = res;
    obj["uid"] = uid
    console.warn("save object_1=>", obj)
    db.ref('/Users').child(uid).set(res, (val) => {
      console.warn("val", val, "if null means success")
      if (val === null) {
        this.setState({isloading:!this.state.isloading})
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
          AccessToken.getCurrentAccessToken().then(data=> {
            let accessToken = data.accessToken;
             console.log(data.accessToken.toString());
             // login with the firebase Facebook
             const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);
             firebase.auth().signInWithCredential(credential)
             .then((res)=>{
              console.warn("suucess asve in the firebase facebook: ",res)
             })
             .catch((err)=>{
               console.log(err)
             })
             debugger
             //console.warn(JSON.stringify(firebaseUserCredential.user.toJSON()))
             console.log(data.accessToken.toString())
            const responseInfoCallback = (error:any, result:any) => {
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
      }, function (error:any) { console.log('Login fail with error: ' + error); });


  }
// fb logout 
fblogout=()=>{
  let current_access_token = '';
  AccessToken.getCurrentAccessToken()
  .then((data) => {
    alert(JSON.stringify(data))
    current_access_token = data.accessToken.toString();
  }).then(() => {
    let logout = new GraphRequest(
      "me/permissions/",
      {
          accessToken: current_access_token,
          httpMethod: 'DELETE'
      },
      (error:any, result:any) => {
          if (error) {
              console.warn('Error fetching data: ' + error.toString());
          } else {
              LoginManager.logOut();
              alert("loout")

          }
      });
    new GraphRequestManager().addRequest(logout).start();
  })
  .catch(error=> {
    console.warn("error in logout: ",error)
  }); 
}
  clearAsyncStorage =  () => {
    AsyncStorage.clear();
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
      <ImageBackground style={{ flex: 1, backgroundColor: 'rgb(19,31,52)' }}>
        {/* <ImageBackground
          source={image.signup_bg}
          style={styles.container}>
          <Loader
            isLoading={false}
          />
          
          <Text style={styles.helloStyle}> {index.strings.helloText}</Text>
          <Text style={styles.signUpstyle}>{index.strings.signUpText} </Text>

        </ImageBackground> */}
        <HeaderComponent
          firstText={index.strings.helloText}
          secondText={index.strings.signUpText}
          //   page="WelcomeScreen"
          handleClick={() => this.props.navigation.navigate("WelcomeScreen")}
        />

        {/* <Text> {DeviceInfo.getDeviceId}</Text>
          <Button onPress={() => this.onPress()} title={"Redux"} />
          <Button onPress={() => this.onPersist()} title={"Redux Persist"} />
          */}

        <View style={{
          height: heightPercentageToDP(calculateHeight(1100)),
          width: widthPercentageToDP(calculateWidth(375)),
          paddingBottom: 400,
          paddingLeft: 16,
          marginTop: 50,
          paddingTop: 200,
          // backgroundColor:"pink"
        }}>
          <ScrollView>
            <TextInputComponent
              ref="first"
           //   val={this.state.name}
              commonPlaceholder={"Name*"}
              commonReturnKeyType={"next"}
              commonOnSubmitEditing={() => this.refs.second.refs.commonInputRef.focus()}
              commonOnChangeText={(val: any) => this.handleInput('name',val)}
              commonSecureTextEntry={false}
              extraStyle={{ marginTop: 30, }}
            />

            <TextInputComponent
              ref="second"
            //  val={this.state.mobile}
              commonPlaceholder={"Mobile Number*"}
              commonReturnKeyType={"next"}
              commonOnSubmitEditing={() => this.refs.third.refs.commonInputRef.focus()}
              commonOnChangeText={(val: any) =>  this.handleInput('mobile',val)}
              commonSecureTextEntry={false}
              extraStyle={{ marginTop: 30, }}
            />
            <TextInputComponent
              ref="third"
            //  val={this.state.email}
              commonPlaceholder={"Email Address*"}
              commonReturnKeyType={"next"}
              commonOnSubmitEditing={() => this.refs.fourth.refs.commonInputRef.focus()}
              commonOnChangeText={(val: any) =>  this.handleInput('email',val)}
              commonSecureTextEntry={false}
              extraStyle={{ marginTop: 30, }}
            />
            <TextInputComponent
              ref="fourth"
             // val={this.state.username}
              commonPlaceholder={"UseraName*"}
              commonReturnKeyType={"next"}
              commonOnSubmitEditing={() => this.refs.fifth.refs.commonInputRef.focus()}
              commonOnChangeText={(val: any) =>  this.handleInput('username',val)}
              commonSecureTextEntry={false}
              extraStyle={{ marginTop: 30, }}
            />
            <TextInputComponent
              ref="fifth"
             // val={this.state.password}
              commonPlaceholder={"password*"}
              commonReturnKeyType={"next"}
              commonOnSubmitEditing={() => alert("Submit action")}
              commonOnChangeText={(val: any) =>  this.handleInput('password',val)}
              commonSecureTextEntry={this.state.isSecureText}
              extraStyle={{ marginTop: 30, }}
            />

            {/* 
            <TouchableOpacity
              onPress={() => this.setState({ isSecure: !this.state.isSecure,
              isSecureText: !this.state.isSecureText })}
              style={styles.secure11}>
              {this.state.isSecure ?
                <Image
                  style={{ tintColor: "white", height: 30, width: 45 }}
                  source={index.image.closeEye}
                /> : <Image
                  style={{ tintColor: "white", height: 30, width: 45 }}
                  source={index.image.openEye}
                />}
            </TouchableOpacity> 
            */}

            <View style={styles.secure11}>
              <CommonEye
                isSecureProp={this.state.isSecure}
                handlePress={() => this.setState({
                  isSecure: !this.state.isSecure,
                  isSecureText: !this.state.isSecureText
                })}
              />
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

              <Text style={{ marginTop: heightPercentageToDP(calculateHeight(35)) }}>{index.strings.terms} </Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", marginTop: 48 }}>
            
                <View style={{flexDirection:"row"}}>
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
            <View style={{ marginTop: heightPercentageToDP(calculateHeight(48)), marginBottom: 20, }}>
              <ButtonComponent
                myStyle={{ width: widthPercentageToDP(calculateWidth(340)), backgroundColor: "red" }}
                name={this.props.name}
                onButtonPress={() => this.handleSignUp()}
              />
            </View>

          </ScrollView>
        </View>
        <Loader isLoading={this.state.isloading}/>
      </ImageBackground>
    );
  }
};

const mapStateToProps = (state: any) => {
  return {
    arr: state.SignInReducer.arr,
    uid: state.PersistReducer.uid,
    offlineData: state.PersistReducer.offlineData,
    name:state.SignInReducer.name,
    username:state.SignInReducer.username,
    mobile:state.SignInReducer.mobile,
  email:state.SignInReducer.email,
  password:state.SignInReducer.password,
  }
}

const mapDispatchToProps = {
  SignUpAction: SignUpAction,
  PersistAction: PersistAction,
  UpdateInputAction:UpdateInputAction,
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
  },

  secure11: {
    position: "absolute",
    // backgroundColor:"red",
    height: heightPercentageToDP(calculateHeight(30)),
    width: widthPercentageToDP(calculateWidth(50)),
    justifyContent: "center",
    alignItems: "center",
    bottom: heightPercentageToDP(calculateHeight(268)),
    right: widthPercentageToDP(calculateWidth(40)),
  },
  fbimg: {
    height: 50, width: 50
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);