import * as React from 'react';
import { Text, View, Image, StyleSheet, ImageBackground } from 'react-native';
import image from "../../Utils/Constants/image";
import colors from "../../Utils/Constants/colors";
import { widthPercentageToDP, heightPercentageToDP } from 'react-native-responsive-screen';
import { calculateHeight, calculateWidth } from '../../Common/ResponsiveScreen';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ButtonComponent from '../../Common/ButonComponent';

interface WelocmeSplashProps { }

class WelocmeSplash extends React.Component {
    render() {
        return (
            <ImageBackground
                source={image.welcome_bg}
                style={styles.container}>

                <Image
                    resizeMethod={'resize'}
                    resizeMode={'contain'}
                    source={image.KandiSnap_Final_logo}
                    style={styles.final_logo}
                />
                <Text style={styles.textt}>
                    KandiSnap</Text>
                <Text style={[styles.textt, { fontSize: widthPercentageToDP(calculateWidth(18)) }]}>
                    Share your kandi</Text>
                <ButtonComponent
                name={"Discover Kandi"}
               // top={15}
             
                onButtonPress={()=>alert("called")}
                />
             <View style={styles.loginContainer}>
                <TouchableOpacity style={styles.loginStyle}>
                    <Text style={styles.textt11}>Login </Text>
                </TouchableOpacity>

                <TouchableOpacity 
                style={styles.loginStyle}
                //onPress={()=>this.props.navigation.navigate("SignUP")}
                 onPress={()=>alert(JSON.stringify(this.props.navigation.navigate("SignUp")))}
                >
                <Text style={styles.textt11}>Sign Up </Text>
                </TouchableOpacity>
                </View>

            </ImageBackground>
        );
    }
};

export default WelocmeSplash;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent:"center",
        // alignItems:"center"
    },
    textt: {
        fontFamily: "Ubuntu-Medium",
        fontSize: 36,
        fontWeight: "500",
        fontStyle: "normal",
        marginTop: heightPercentageToDP(calculateHeight(10)),
        marginLeft: widthPercentageToDP(calculateWidth(20)),
        letterSpacing: 0.43,
        color: colors.whiteColor,
    },
    final_logo: {
        height: heightPercentageToDP(calculateHeight(86)),
        width: widthPercentageToDP(calculateWidth(86)),
        marginTop: heightPercentageToDP(calculateHeight(362)),
        marginLeft: widthPercentageToDP(calculateWidth(20))

    }, buttonStyle: {
        marginTop: heightPercentageToDP(calculateHeight(60)),
        marginLeft: widthPercentageToDP(calculateWidth(20)),
        width: widthPercentageToDP(calculateWidth(335)),
        height: heightPercentageToDP(calculateHeight(54)),
        borderRadius: 1000,
        backgroundColor: 'red'
    },
    loginContainer:{
        flexDirection:"row",
        marginTop:heightPercentageToDP(calculateHeight(15)),
        marginLeft:widthPercentageToDP(calculateWidth(10)),
        justifyContent:"space-around"
      
    },
    loginStyle:{
        width: widthPercentageToDP(calculateWidth(156)),
        height: heightPercentageToDP(calculateHeight(54)),
        borderWidth:3,
        borderColor:colors.whiteColor,
        borderRadius:widthPercentageToDP(calculateWidth(78)),
        justifyContent:"center",
        alignItems:"center"
      

    },
    textt11:{
        fontFamily: "Ubuntu-Medium",
  fontSize: 16,
  fontWeight: "bold",
  fontStyle: "normal",
  letterSpacing: 0.19,
  color: colors.whiteColor
    }
   
});
