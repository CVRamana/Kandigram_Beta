import * as React from 'react';
import { Text, View, StyleSheet, TextInput, Image, ImageBackground } from 'react-native';
import HeaderComponent from '../../../Common/HeaderComponent';
import TextInputComponent from '../../../Common/TextInputComponent';
import index from "../../../Utils/Constants/index";
import ButtonComponent from '../../../Common/ButonComponent';
import { widthPercentageToDP, heightPercentageToDP } from 'react-native-responsive-screen';
import { calculateWidth, calculateHeight, vw, vh } from '../../../Common/ResponsiveScreen';
import colors from '../../../Utils/Constants/colors';
import CommonEye from '../../../Common/CommonEye';
import firebase from 'react-native-firebase';


interface ForgetProps {
    navigation: any
}
interface State {
    isSecure: Boolean
    email: String
}

class ForgetPassword extends React.Component<ForgetProps, State> {
    constructor(props: ForgetProps) {
        super(props)
        this.state = {
            isSecure: false,
            email: ''
        };
    };

    sendCode = async () => {
        try {
            await firebase.auth().sendPasswordResetEmail(this.state.email)
            console.warn('Password reset email sent successfully')
            this.props.navigation.navigate('Login')
        } catch (error) {
            console.warn(error.message)
        }
    }


    render() {
        return (
            <ImageBackground style={styles.container}>
                <HeaderComponent
                    firstText={"Forget"}
                    secondText={"Password ?"}
                    handleClick={() => this.props.navigation.navigate('Login')}
                />
                <View style={styles.inputContainer}>
                    <Text style={styles.forgotText}> {index.strings.resetting}
                    </Text>
                </View>
                <View style={styles.textInput}>
                    <View style={styles.v2}>
                        <Text style={styles.forgotText}> +1 </Text>
                    </View>
                    <View style={styles.v3}>
                    </View>
                    <TextInput
                        onChangeText={(txt: any) => this.setState({ email: txt })}
                        style={[styles.textInput, {
                            marginTop: 0,
                            marginLeft: 0,
                            width: widthPercentageToDP(calculateWidth(260)),
                            paddingLeft: vw(32),
                            paddingRight: vw(10),
                            borderWidth: 0, fontFamily: "Ubuntu-Medium",
                            fontSize: vw(20),
                            fontWeight: "500",
                            fontStyle: "normal",
                            letterSpacing: 5.12,
                            color: index.colors.whiteColor,
                            // backgroundColor:"red"
                        }]} />
                </View>
                <View style={styles.bttn}>
                    <ButtonComponent
                        name={"Send Code"}
                        onButtonPress={() => this.sendCode()}
                    />

                </View>

            </ImageBackground>
        );
    }
};

export default ForgetPassword;

const styles = StyleSheet.create({
    v2: { height: vh(55), width: 71, justifyContent: "center", alignItems: "center" },
    container: {
        flex: 1,
        backgroundColor: 'rgb(19,31,52)'

    },
    v3: { height: vh(45), width: 3, backgroundColor: "#213d79", marginTop: 6 },
    bttn: {
        marginTop: heightPercentageToDP(calculateHeight(48)),
        marginLeft: widthPercentageToDP(calculateWidth(20))
    },
    inputContainer: {
        width: widthPercentageToDP(calculateWidth(269)),
        height: heightPercentageToDP(calculateHeight(78)),
        marginTop: heightPercentageToDP(calculateHeight(255)),
        marginLeft: widthPercentageToDP(calculateWidth(20))
    },
    textInput: {
        width: widthPercentageToDP(calculateWidth(343)),
        height: heightPercentageToDP(calculateHeight(56)),
        marginLeft: widthPercentageToDP(calculateWidth(16)),
        marginTop: heightPercentageToDP(calculateHeight(20)),
        flexDirection: "row",
        borderRadius: 1000,
        backgroundColor: colors.textInputBGColor,
        borderStyle: "solid",
        borderWidth: 2,
        borderColor: "#213d79"

    },

    forgotText: {
        fontFamily: "Ubuntu-Medium",
        fontSize: widthPercentageToDP(calculateWidth(16)),
        fontWeight: "normal",
        fontStyle: "normal",
        lineHeight: 26,
        letterSpacing: 0.19,
        //color: colors.white
        color: index.colors.whiteColor
    },

});