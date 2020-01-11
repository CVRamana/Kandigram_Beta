import * as React from 'react';
import { Text, View, StyleSheet, Image, ImageBackground } from 'react-native';
import HeaderComponent from '../../../Common/HeaderComponent';
import TextInputComponent from '../../../Common/TextInputComponent';
import index from "../../../Utils/Constants/index";
import ButtonComponent from '../../../Common/ButonComponent';
import { widthPercentageToDP, heightPercentageToDP } from 'react-native-responsive-screen';
import { calculateWidth, calculateHeight } from '../../../Common/ResponsiveScreen';
import colors from '../../../Utils/Constants/colors';
import CommonEye from '../../../Common/CommonEye';

interface LoginProps { }

class ResetPassword extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isSecure: false
        };
    };

    render() {
        return (
            <ImageBackground style={styles.container}>
                <HeaderComponent
                    // firstText={"Welocome Back,"}
                    secondText={"Reset Password ?"}
                />
                <View style={styles.inputContainer}>
                    <TextInputComponent />
                    <View style={styles.inputt}>
                        <TextInputComponent
                            commonSecureTextEntry={this.state.isSecure}
                            extraStyle={{
                                backgroundColor: "transparent",
                                width: widthPercentageToDP(calculateWidth(300)),
                                borderRadius: 0,
                                borderWidth: 0,

                                borderColor: "transparent",

                            }}
                        />
                        <CommonEye
                            handlePress={() => this.setState({ isSecure: !this.state.isSecure })}
                            isSecureProp={this.state.isSecure}
                            extraStyle={{ marginLeft: 320, marginTop: 10 }}
                        />
                    </View>
                </View>

            </ImageBackground>
        );
    }
};

export default ResetPassword;

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
    inputt: {
        width: widthPercentageToDP(calculateWidth(350)),
        height: heightPercentageToDP(calculateHeight(56)),
        backgroundColor: colors.textInputBGColor, marginTop: 30, backgroundColor: colors.textInputBGColor,
        borderColor: colors.textInputBorderColor,
        borderStyle: "solid",
        borderWidth: 4,
        borderRadius: 1000,
        flexDirection: "row"
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
    fbimg: {
        width: 60,
        height: 60,
        borderRadius: widthPercentageToDP(calculateWidth(30)),
        backgroundColor: "#1977f3"
    }
});
