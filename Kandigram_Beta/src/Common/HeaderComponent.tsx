import * as React from 'react';
import { Text, View, StyleSheet,ImageBackground } from 'react-native';
import index from "../Utils/Constants/index";
import { calculateHeight,calculateWidth } from './ResponsiveScreen';
import { heightPercentageToDP,widthPercentageToDP } from 'react-native-responsive-screen';
import CommonBackButton from './CommonBackButton';
import colors from '../Utils/Constants/colors';

interface HeaderComponentProps {}
 
const HeaderComponent = (props: HeaderComponentProps) => {
  return (
    <ImageBackground 
    source={index.image.signup_bg}
    style={styles.container}>
      <CommonBackButton
      myStyle={{paddingTop:100, paddingLeft: 30}}
      handleClick={()=>props.navigation.navigate('SignUp')}
      />
      <Text style={styles.helloStyle}>{props.firstText}</Text>
      <Text style={styles.signUpstyle}> {props.secondText} </Text>
        
    </ImageBackground>
  );
};

export default HeaderComponent;
const styles = StyleSheet.create({
  container: {
    position:'absolute',
    backgroundColor:'transparent',
    zIndex:300,
      height:heightPercentageToDP(calculateHeight(238)),
      width:widthPercentageToDP(calculateWidth(375)),
     
      
  },
  helloStyle: {
    marginTop: heightPercentageToDP(calculateHeight(10)),
    marginLeft: widthPercentageToDP(calculateWidth(16)),
    fontFamily: "Ubuntu-Medium",
    fontSize: widthPercentageToDP(calculateWidth(20)),
    fontWeight: "500",
    fontStyle: "normal",
    letterSpacing: 0.24,
    color: colors.whiteColor
  },
  signUpstyle: {
    marginTop: heightPercentageToDP(calculateHeight(10)),
    marginLeft: widthPercentageToDP(calculateWidth(3)),
    fontFamily: "Ubuntu-Medium",
    fontSize: widthPercentageToDP(calculateWidth(40)),
    fontWeight: "bold",
    fontStyle: "normal",
    letterSpacing: 0.48,
    color: colors.whiteColor
  },
});
