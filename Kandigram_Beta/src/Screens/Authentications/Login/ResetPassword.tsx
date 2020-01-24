import * as React from 'react';
import { Text, View, StyleSheet, Image, ImageBackground } from 'react-native';
import HeaderComponent from '../../../Common/HeaderComponent';
import TextInputComponent from '../../../Common/TextInputComponent';
import index from "../../../Utils/Constants/index";
import ButtonComponent from '../../../Common/ButonComponent';
import { widthPercentageToDP, heightPercentageToDP } from 'react-native-responsive-screen';
import { calculateWidth, calculateHeight, vw ,vh} from '../../../Common/ResponsiveScreen';
import colors from '../../../Utils/Constants/colors';
import CommonEye from '../../../Common/CommonEye';

interface LoginProps { }
interface State{

}

class ResetPassword extends React.Component<LoginProps,State> {
    constructor(props:LoginProps) {
        super(props)
        this.state = {
            isSecure: false
        };
    };

    render() {
        return (
            <ImageBackground 
            source={{}}
            style={styles.container}>
                <HeaderComponent
                    // firstText={"Welocome Back,"}
                    secondText={"Reset Password ?"}
                />
                <View style={styles.inputContainer}>
                    <TextInputComponent
                    extraStyle={{backgroundColor:index.colors.textInputBGColor}}
                     />
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
                        <View style={{marginTop:-2}}>
                        <CommonEye
                            handlePress={() => this.setState({ isSecure: !this.state.isSecure })}
                            isSecureProp={this.state.isSecure}
                            extraStyle={{ marginLeft:vw(320),
                                // marginTop: vh(0)
                                 }}
                        />
                        </View>
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
        marginTop: vh(300),
        // justifyContent:"center"
        alignItems: "center"
    },
    inputt: {
        width: widthPercentageToDP(calculateWidth(350)),
        height: heightPercentageToDP(calculateHeight(50)),
        backgroundColor: colors.textInputBGColor, marginTop: vh(30), backgroundColor: colors.textInputBGColor,
        borderColor: colors.textInputBorderColor,
        borderStyle: "solid",
        borderWidth: vw(2),
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
        width: vw(60),
        height: vh(60),
        borderRadius: widthPercentageToDP(calculateWidth(30)),
        backgroundColor: "#1977f3"
    }
});
