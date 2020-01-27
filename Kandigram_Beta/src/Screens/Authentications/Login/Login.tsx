import * as React from 'react';
import { Text, View, StyleSheet, Image, ImageBackground } from 'react-native';
import HeaderComponent from '../../../Common/HeaderComponent';
import TextInputComponent from '../../../Common/TextInputComponent';
import index from "../../../Utils/Constants/index";
import ButtonComponent from '../../../Common/ButonComponent';
import { widthPercentageToDP, heightPercentageToDP } from 'react-native-responsive-screen';
import { calculateWidth, calculateHeight, vw, vh } from '../../../Common/ResponsiveScreen';
import colors from '../../../Utils/Constants/colors';
import CommonEye from '../../../Common/CommonEye';
import { PersistAction } from "../../../ReduxPersist/PersistAction";
import { connect } from "react-redux";
import firebase from 'react-native-firebase'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Loader from '../../../Common/loader';
import Snackbar from '../../../Common/Snackbar';


interface LoginProps {
    PersistAction: Function
    navigation: any
    isInternet: boolean


}
interface State {
    isSecure: boolean
    email: string
    password: string
    errorMessage: string
    isloading: boolean
    bColor: string
    tColor: string
    b2Color: string
    t2Color: string

}

class Login extends React.Component<LoginProps, State> {
    constructor(props: LoginProps) {
        super(props)

        this.state = {
            isSecure: false,
            email: '',
            bColor: index.colors.textInputBorderColor,
            tColor: index.colors.whiteColor,
            b2Color: index.colors.textInputBorderColor,
            t2Color: index.colors.whiteColor,
            password: '',
            errorMessage: '',
            isloading: false,
        };
    };


    componentDidMount() {
        //  alert(this.props.isInternet)
    }


    //validation
    validateEmail = () => {
        // alert("called")
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.state.email)) {
            // this.refs.fourth.refs.commonInputRef.focus()
            this.setState({ bColor: index.colors.textInputBorderColor, tColor: index.colors.whiteColor })
            return (true)
        }
        this.setState({ bColor: "red", tColor: "red" })
        alert("You have entered an invalid email address!")
        return (false)
    }
    //password validation
    validatePassword = () => {
        var passw = /^[A-Za-z]\w{7,14}$/;
        if (this.state.password.match(passw) && this.state.password === "") {
            this.setState({ b2Color: index.colors.textInputBorderColor, t2Color: index.colors.whiteColor })
            this.handleLogin()
            return true;
        }
        else {
            this.setState({ b2Color: "red", t2Color: "red" })
            // alert('Wrong...!')
            return false;
        }
    }

    //handle Login
    handleLogin = () => {
        const { email, password } = this.state
        this.setState({ isloading: true })
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(
                (res) => {
                    //On successfull login
                    let uid = res.user.uid
                    this.props.PersistAction(uid)
                    console.log(res.user.uid)
                 //   debugger
                    this.props.navigation.navigate('Home')
                    this.setState({ isloading: false })
                }
            )
            .catch(error => this.setState({ errorMessage: error.message, isloading: false }, () => alert(error.message)))
    }

    render() {
        // {this.state.isloading ? <Loader/> : }
        return (
            <ImageBackground
                source={{}}

                style={styles.container}>
                <HeaderComponent
                    firstText={"Welocome Back,"}
                    secondText={"Log in"}
                    handleClick={() => this.props.navigation.navigate('AppintroSlider')}
                />
                <ScrollView>
                    <View style={styles.inputContainer}>
                    <View style={{backgroundColor:colors.textInputBGColor,borderRadius:1000}}>
                        <TextInputComponent
                            commonPlaceholder={"Name/Email"}
                            val={this.state.email}
                            commonOnChangeText={(val: any) => this.setState({ email: val })}
                            commonOnBlur={() => this.validateEmail()}
                            extraStyle={{ borderColor: this.state.bColor, color: this.state.tColor }}
                        />
                         </View>
                        <View style={[styles.inputt, { borderColor: this.state.b2Color }]}>
                          
                            <TextInputComponent
                                val={this.state.password}
                                commonPlaceholder={"Password"}
                                commonSecureTextEntry={this.state.isSecure}
                                commonOnChangeText={(val: any) => this.setState({ password: val })}
                                commonOnSubmitEditing={() => this.validatePassword()}
                                extraStyle={{
                                    backgroundColor: "transparent",
                                    borderWidth: 0, width: vw(280),
                                     color: this.state.t2Color
                                }}
                            />
                           
                            <View
                                style={styles.eye}
                            >
                                <CommonEye
                                    handlePress={() => this.setState({ isSecure: !this.state.isSecure })}
                                    isSecureProp={this.state.isSecure}

                                    extraStyle={{}}
                                />
                            </View>
                        </View>

                        <Text
                            onPress={() => this.props.navigation.navigate('ForgetPassword')}
                            style={[styles.forgotText, { marginLeft: vw(200), marginBottom:vh(48) }]}>{index.strings.forgot} </Text>
                        <ButtonComponent
                            name={"Log In"}
                            onButtonPress={() => this.handleLogin()}
                        />
                        <Text style={[styles.forgotText, { marginBottom:vh(48)  }]}>or </Text>
                        <View style={{
                            flexDirection: "row",
                            width: vw(200),
                            justifyContent: "space-around"


                        }}>
                            <TouchableOpacity

                            >
                                <Image
                                    source={{}}
                                    style={styles.fbimg}
                                />
                            </TouchableOpacity>
                            <Image
                                source={{}}
                                style={styles.fbimg}
                            />
                        </View>

                    </View>

                </ScrollView>
                <Loader isLoading={this.state.isloading} />
                {!this.props.isInternet ?
                    <View style={styles.snack}>
                       <Snackbar
                           /> 
                    </View> :
                    <View style={styles.snack}>
                     <Snackbar
                         
                        /> 
                    </View>
                }
            </ImageBackground>



        );

    }
};



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgb(19,31,52)'

    },
    snack: {
        justifyContent: "center",
        alignItems: "center",
        //backgroundColor:"red"
    },
    eye: {
        height: vh(50),
        width: vw(50),
        justifyContent: "center",
        alignItems: "center",

    },
    inputContainer: {
        marginTop: 300,
        // justifyContent:"center"
        alignItems: "center"
    },
    inputt: {
        width: widthPercentageToDP(calculateWidth(343)),
        height: heightPercentageToDP(calculateHeight(50)),
        backgroundColor: colors.textInputBGColor,
         marginTop: vh(30),

        borderColor: colors.textInputBorderColor,
        borderStyle: "solid",
        borderWidth: vw(2),
        borderRadius: 1000,
        flexDirection: "row"
    },
    forgotText: {
        opacity: 0.6,
        marginTop: vh(24),
        fontFamily: "Ubuntu-Medium",
        fontSize: vw(17),
        fontWeight: "500",
        fontStyle: "normal",
        letterSpacing: 0.17,
        color: index.colors.whiteColor
    },
    fbimg: {
        width: vw(60),
        height: vh(60),
        borderRadius: widthPercentageToDP(calculateWidth(30)),
        backgroundColor: "#1977f3"
    }
});
const mapStateToProps = (state: any) => {
    return {
        isInternet: state.GlobalReducer.isInternet
    }
}
const mapDispatchToProps = {
    PersistAction: PersistAction

}


export default connect(mapStateToProps, mapDispatchToProps)(Login);