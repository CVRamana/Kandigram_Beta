import * as React from 'react';
import { Text, View, StyleSheet,ImageBackground, TouchableOpacity,Image } from 'react-native';
import index from "../Utils/Constants/index";
import { calculateHeight,calculateWidth, vh, vw } from './ResponsiveScreen';
import { heightPercentageToDP,widthPercentageToDP } from 'react-native-responsive-screen';

import colors from '../Utils/Constants/colors';

interface HeaderComponentProps {
  navigation: any
  firstText:string
  secondText:string
  lastName:string
  //passingpropo
}
 
class HeaderComponent extends React.Component<HeaderComponentProps> {
  constructor(props:HeaderComponentProps) {
    super(props)
    this.state = {
       
    };
  };
  
  render(){
 // props.passingPropo
  return (
    <ImageBackground 
    source={index.image.signup_bg}
    style={styles.container}>
      <View style={{marginTop:50}}>
  <TouchableOpacity
  style={{marginTop:vh(20),
     marginLeft: vw(16),}}
     onPress={this.props.goBack}
  >
    <Image
    resizeMethod={"resize"}
    resizeMode={"contain"}
    source={index.image.back}
    style={{height:vh(18),width:vw(13),}}
    />
    </TouchableOpacity>
      <Text style={styles.helloStyle}>{this.props.lastName}</Text>
      <Text style={styles.helloStyle}>{this.props.firstText}</Text>
      <Text style={styles.signUpstyle}> {this.props.secondText} </Text>
      </View>
      
    </ImageBackground>
  );
  }
};

export default HeaderComponent;
const styles = StyleSheet.create({
  container: {
    position:'absolute',
    backgroundColor:'transparent',
    zIndex:300,
    top:0,
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
