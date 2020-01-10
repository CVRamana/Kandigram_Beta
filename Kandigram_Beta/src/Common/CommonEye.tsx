import * as React from 'react';
import { Text, View, StyleSheet,TouchableOpacity,Image } from 'react-native';
import index from "../Utils/Constants/index";
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import { calculateHeight, calculateWidth } from './ResponsiveScreen';

interface CommonEyeProps {}

const CommonEye = (props: CommonEyeProps) => {
  return (
     <TouchableOpacity

              onPress={props.handlePress}
              style={[styles.secure,props.extraStyle]}>
              {props.isSecureProp ?
                <Image
                  style={{ tintColor: "white", height: 30, width: 45 }}
                  source={index.image.closeEye}
                /> :
                 <Image
                  style={{ tintColor: "white", height: 30, width: 45 }}
                  source={index.image.openEye}
                />}
            </TouchableOpacity>
 
  );
};

export default CommonEye;

const styles = StyleSheet.create({
  container: {},
  secure: {
    position: "absolute",
    height: heightPercentageToDP(calculateHeight(30)),
    width: widthPercentageToDP(calculateWidth(50)),
    justifyContent: "center",
    alignItems: "center",
  

  }
});
