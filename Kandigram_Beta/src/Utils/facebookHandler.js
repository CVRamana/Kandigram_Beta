import React, { Component } from 'react';
import { View, Text, ImageBackground, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Images, Dimension, vh, vw, Colors } from '../../Constants'
import styles from '../LogInScreen/Styles'
import TextLabel from '../FunctionalComponent/TextLabelClass'
import MyButton from '../FunctionalComponent/Button'
import InstagramLogin from 'react-native-instagram-login'
import firebase from 'react-native-firebase'
import { saveFormData } from '../../Actions/action';
import { connect } from 'react-redux'
import { LoginManager, AccessToken, GraphRequest, GraphRequestManager } from 'react-native-fbsdk';
import { db } from '../firebaseConfig/firebaseConfig';



export  class SignupScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mobileno: '', mobilenocon: true, mobile_error: '',
      password: '', passwordcon: true, password_error: '',
      token: '',

    };
    this.regx = /^[7-9]\d{9}$/;
  }
  handle_Password_Validate = () => {

    if (this.state.password.toString().trim().length > 0) {
      this.setState({
        passwordcon: true, password_error: '',
      })
    } else {
      //  console.warn("password else")
      this.setState({
        passwordcon: false, password_error: 'cannot be blank',
      })
    }


  }

  _responseInfoCallback(error, result) {
    // console.warn("error", error)
    console.log("result", JSON.stringify(result))
    if (error) {
      //  console.warn('Error fetching data: ' + error.toString());
    } else {
      //console.warn('Success fetching data: ' + result.toString());
    }
  }

  //  infoRequest = new GraphRequest(
  //   '/me',
  //   null,
  //   this._responseInfoCallback,
  // );

  // new GraphRequestManager().addRequest(infoRequest).start();

  buttonPressed = () => {
    console.warn("call")
    if (this.state.mobileno.toString().trim().length > 0 && this.state.password.toString().trim().length > 0) {
      this.handleLogin(this.state.mobileno,this.state.password)
    } else {

    }
  }


  handleLogin = (email,password) => {
    console.warn(email,password);
    firebase.auth().signInWithEmailAndPassword(email, password).
    then(res=>{ console.warn("coming res=>",res)
      this.getLoginDataInformation(res.user.uid)})
    .catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(error.message)
        console.warn(error.message)
      });
  }



  getLoginDataInformation=(uid)=>{
    console.warn("incoming uid=>",uid)
    db.ref('/Users').child(uid).once('value',(snap)=>{
      console.warn("gettng",snap)
      if(uid.toString().trim!='')
      this.props.addUser(snap)
      if(this.props.userlogin)
      this.props.navigation.navigate('CreateProfile')
    })

  }




  gotoForget = () => {
    this.props.navigation.navigate('ForgetPassword')
  }
  gotoCreateProfileScreen = () => {

    this.props.navigation.navigate('CreateProfile')
  }

  profileRequestParams = {
    fields: {
      string: 'id, name, email, first_name, last_name, gender,phone_no'
    }
  }
   responseInstagram = (response) => {
    console.log(response);
  }

  fblogin = () => {
    // console.warn("call")
    LoginManager.logInWithPermissions(['email','public_profile']).then
      (result => {
        if (result.isCancelled) { console.log('Login cancelled'); return; }
        else {
          console.log('Login success with permissions: ' + result.grantedPermissions.toString());
          this.setState({ isLoading: true })
        } {
          AccessToken.getCurrentAccessToken().then(data => {
            let accessToken = data.accessToken; console.log(data.accessToken.toString());
            const responseInfoCallback = (error, result) => {
              if (error) {
                console.log(error);
                Alert.alert('Unable to Login, Please try again!')
                this.setState({ isLoading: false })
              } else {
                console.log('Success fetching data: ' + JSON.stringify(result));
                console.warn('FB PIC', result.picture.data.url);
                //   this.props.setProfileData(result.name, result.email, result.picture.data.url, 'fb')
                alert('res '+JSON.stringify(result))
                console.log('redux res ', this.props.profileData);
                // this.setState({ isLoading: false })
                this.props.navigation.navigate('CreateProfile', { "profile_pic": result.picture.data.url })
              }
            }
            const infoRequest = new GraphRequest('/me',
              { accessToken: accessToken, parameters: { fields: { string: 'email,name,first_name,middle_name,last_name,picture.type(large)', }, }, },
              responseInfoCallback); new GraphRequestManager().addRequest(infoRequest).start();
          });
        }
      }, function (error) { console.log('Login fail with error: ' + error); });
  };

  handle_emailPhone = () => {
    let zeroregx = '/[1-9]/g';
    let regxphone = /^[7-9]\d{9}$/;
    let regexemail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (this.state.mobileno.toString().trim().length > 0) {
      if (regexemail.test(this.state.mobileno)) {
        //   console.warn("email no")
        this.setState({
          mobilenocon: true, mobile_error: '',
        })

      }
      else if (regxphone.test(this.state.mobileno)) {
        this.setState({
          mobilenocon: true, mobile_error: '',
        })
      } else {
        this.setState({
          mobilenocon: false, mobile_error: 'invalid no',
        })
      }


    } else {
      this.setState({
        mobilenocon: false, mobile_error: 'invalid  Data',
      })
    }
  }
  handle_phone = (val) => {

    this.setState({
      mobileno: val
    }, () => {

    })

  }
  // initUser(token) {
  //   console.log("token",token)
  //   fetch('https://graph.facebook.com/v2.5/me?fields=email,name,friends&access_token=' + token)
  //   .then((response) => response.json())
  //   .then((json) => {
  //     // Some user object has been set up somewhere, build that user here
  //     console.warn("final result",JSON.stringify(json))   
  //   })
  //   .catch((val) => {
  //     console.warn("#error",val)
  //     reject('ERROR GETTING DATA FROM FACEBOOK')
  //   })
  // }

  profileRequestConfig = {
    httpMethod: 'GET',
    version: 'v2.5',
    parameters: this.profileRequestParams,
    accessToken: this.token
  }

  onSubmitEditing = () => {

  }

  handle_passsword = (val) => {
    this.setState({
      password: val
    })

  }
  render() {
    return (
      <ImageBackground
        source={Images.welcome}
        style={styles.containner} >
        <ImageBackground

          resizeMode="stretch"
          source={Images.signUpHeader}
          style={styles.signHeaderStyle}>
          <TouchableOpacity onPress={() => {
            this.props.navigation.goBack()
          }}>
            <Image style={styles.backicon} source={Images.signUpBack} />
          </TouchableOpacity>
          <Text style={styles.textStyle2} >share Your Story</Text>
          <Text style={styles.textStyle} >Log In</Text>
        </ImageBackground>
        <TextLabel
          onSubmitEditing={this.onSubmitEditing}
          onfocus={this.handle_emailPhone}
          securetext={false}
          customStyle={this.state.mobilenocon ? { ...styles.textStyle4, marginTop: vh(30), marginLeft: vw(16) } : { ...styles.textStyle3, marginTop: vh(30), marginLeft: vw(16) }}
          onChangeText={this.handle_phone}
          mobile_error={this.state.mobile_error}

          mobileno={this.state.mobilenocon}
          left={20} top={54.9} text={"Mobile Number/Email"} />
        <TextLabel
          onSubmitEditing={this.onSubmitEditing}
          securetext={true}
          mobile_error={this.state.password_error}
          onfocus={this.handle_Password_Validate}

          customStyle={this.state.passwordcon ? { ...styles.textStyle4, marginTop: vh(30), marginLeft: vw(16) } : { ...styles.textStyle3, marginTop: vh(30), marginLeft: vw(16) }}
          onChangeText={this.handle_passsword}
          password={this.state.passwordcon}
          left={20} top={28} text={"Password"} />
        <Text onPress={this.gotoForget} style={styles.forgetPassword}>Forget password ?</Text>
        <MyButton
          handleSubmit={this.buttonPressed}
          StartColor={Colors.thirdColor}
          EndColor={Colors.fourthColor}
          top={"40"}
          text={"Login"} />
        <Text style={{ marginTop: vh(30), color: 'white', marginLeft: vw(180), fontSize: vw(16) }} >or</Text>
        <View style={styles.LoginLayout}>
          <TouchableOpacity onPress={this.fblogin}>
            <Image source={Images.Facebookimage}
              style={{ marginRight: vh(50) }} />
          </TouchableOpacity>
          <TouchableOpacity onPress={()=> this.instagramLogin.show()}>
            <Image source={Images.Facebookimage}
               />
          </TouchableOpacity>
          <InstagramLogin
        ref={ref => (this.instagramLogin = ref)}
        appId='520999375181627'
        appSecret='9b5a932e396e5944d6a08afab5cf3989'
        redirectUrl='https://www.google.co.in/'
        scopes={['user_profile', 'user_media']}
        onLoginSuccess={ (data)=>console.warn("success=>",data) }
        onLoginFailure={(data) => console.warn("failure=>",data)}
    />

  
        </View>



        {/* <LoginButton
          style={{ borderRadius: vw(20), height: vh(60), width: vw(60), text: null }}
          publishPermissions={['publish_actions']}
          readPermissions={['public_profile']}
          onLoginFinished={
            (error, result) => {
              if (error) {
                console.warn("login has error: " + error);
              } else if (result.isCancelled) {
                console.warn("login is cancelled.");
              } else {
                AccessToken.getCurrentAccessToken().then(
                  (data) => {
                    const { accessToken } = data
                    this.token = accessToken
                    console.warn("data", data);
                    const infoRequest = new GraphRequest(
                      '/me',
                      {
                        accessToken: accessToken,
                        parameters: {
                          fields: {
                            string: 'email,name,first_name,middle_name,last_name,picture.type(large)',
                          },
                        },
                      },
                      this._responseInfoCallback
                    );
                    // Start the graph request.
                    new GraphRequestManager().addRequest(infoRequest).start();
                  }
                )
              }
            }
          }
          onLogoutFinished={() => console.log("logout.")} /> */}



      </ImageBackground>
        );
      }
    }
    const mapStateToProps = state => {
      console.warn("incoming state in redux=>",state)
      const { userlogin } = state.SaveFormDataReducer;
      return {
        userlogin
      }
    };
    
    const mapDispatchToProps = dispatch => ({
    
      addUser: (payload) => dispatch(saveFormData(payload)),
    
    });
  
    export default connect(
      mapStateToProps,
      mapDispatchToProps
    )(SignupScreen);