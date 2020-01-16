import * as React from 'react';
import { Text, View, StyleSheet,Image, ImageBackground } from 'react-native';
import HeaderComponent from '../../../Common/HeaderComponent';
import TextInputComponent from '../../../Common/TextInputComponent';
import index from "../../../Utils/Constants/index";
import ButtonComponent from '../../../Common/ButonComponent';
import { widthPercentageToDP, heightPercentageToDP } from 'react-native-responsive-screen';
import { calculateWidth, calculateHeight } from '../../../Common/ResponsiveScreen';
import colors from '../../../Utils/Constants/colors';
import CommonEye from '../../../Common/CommonEye';
import {PersistAction} from "../../../ReduxPersist/PersistAction";
import  {connect} from "react-redux";
import firebase from 'react-native-firebase'

import { ScrollView } from 'react-native-gesture-handler';
import Loader from '../../../Common/loader';

interface LoginProps { }

class Login extends React.Component {
    constructor(props) {
      super(props)
    
      this.state = {
         isSecure:false,
         email: '', 
         password: '',
         errorMessage: null ,
         isloading:false,
      };
    };

    //handle Login
    handleLogin = () => {
        const { email, password } = this.state
        this.setState({isloading:true})
        firebase
          .auth()
          .signInWithEmailAndPassword(email, password)
          .then(
              (res) => {
                  //On successfull login
                let uid=res.user.uid
                this.props.PersistAction(uid)
                  console.log(res.user.uid)
                debugger
                  this.props.navigation.navigate('Home')
                  this.setState({isloading:false})
            }
            )
          .catch(error => this.setState({ errorMessage: error.message,isloading:false },()=>alert(error.message)))
      }
    
    render() {
       // {this.state.isloading ? <Loader/> : }
        return (
            <ImageBackground style={styles.container}>
                <HeaderComponent
                    firstText={"Welocome Back,"}
                    secondText={"Log in"}
                />
                <ScrollView>
                <View style={styles.inputContainer}>
                    <TextInputComponent
                    val={this.state.email} 
                    commonOnChangeText={(val)=>this.setState({email:val})}
                    />
             <View style={styles.inputt}> 
                    <TextInputComponent
                    val={this.state.password}
                     commonSecureTextEntry={this.state.isSecure}
                     commonOnChangeText={(val)=>this.setState({password:val})}

                        extraStyle={{ backgroundColor:"transparent", 
                        width: widthPercentageToDP(calculateWidth(300)),
                        borderRadius:0,
                        borderWidth: 0,
                       
                        borderColor: "transparent",

                    }}
                    />
                    <CommonEye
                    handlePress={()=>this.setState({isSecure:!this.state.isSecure})}
                    isSecureProp={this.state.isSecure}
                    extraStyle={{marginLeft: 320,marginTop:10}}
                    />
                    </View>

                    <Text 
                    onPress={()=>this.props.navigation.navigate('ForgetPassword')}
                    style={[styles.forgotText,{marginLeft: 200, marginBottom:48}]}>{index.strings.forgot} </Text>
                    <ButtonComponent
                    name={"Log In"}
                    onButtonPress={()=>this.handleLogin()}

                    />
                    <Text style={[styles.forgotText, { marginBottom:48}]}>or </Text>
                    <View style={{flexDirection:"row",
                    width:200,
                    justifyContent:"space-around"

                
                  }}>
                        <Image
                        style={styles.fbimg}
                        />
                        <Image
                         style={styles.fbimg}
                        />
                        </View>
                        

                </View>
                </ScrollView>
                <Loader isLoading={this.state.isloading}/>

            </ImageBackground> 


       
        );
               
    }
};



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgb(19,31,52)'

    },
    inputContainer: {
        marginTop: 300,
        // justifyContent:"center"
        alignItems: "center"
    },
    inputt:{ width: widthPercentageToDP(calculateWidth(350)),
        height: heightPercentageToDP(calculateHeight(56)),
        backgroundColor:colors.textInputBGColor,marginTop:30, backgroundColor:colors.textInputBGColor,
        borderColor:colors.textInputBorderColor,
        borderStyle: "solid",
        borderWidth:4,
        borderRadius:1000,
        flexDirection:"row"
        },
    forgotText: {
        opacity: 0.6,
        marginTop: 24,
        fontFamily: "Ubuntu",
        fontSize: 17,
        fontWeight: "500",
        fontStyle: "normal",
        letterSpacing: 0.17,
        color: index.colors.whiteColor
    },
    fbimg:{
        width: 60,
        height: 60,
        borderRadius:widthPercentageToDP(calculateWidth(30)),
        backgroundColor: "#1977f3"
    }
});
const mapStateToProps=(state:any)=>{
    return{
       
    }
}
const mapDispatchToProps={
    PersistAction:PersistAction

}


export default connect(mapStateToProps,mapDispatchToProps)(Login);