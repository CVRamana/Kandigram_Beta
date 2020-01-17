import * as React from 'react';
import { Text, View, StyleSheet,TouchableOpacity,Image } from 'react-native';
import index from "../Utils/Constants/index";
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import { calculateHeight, calculateWidth, vh, vw } from './ResponsiveScreen';

interface CommonEyeProps {
  handlePress:Function
  extraStyle:Function
  isSecureProp:boolean
}

const CommonEye = (props: CommonEyeProps) => {
  return (
   
     <TouchableOpacity
              onPress={props.handlePress}
              style={[styles.secure]}>
              {props.isSecureProp ?
                <Image
                resizeMode={'contain'}
                resizeMethod={'resize'}
                  style={{ tintColor: "white", height: vh(20), width: vw(20) }}
                  source={index.image.closeEye}
                /> :
                 <Image
                 resizeMode={'contain'}
                 resizeMethod={'resize'}
                  style={{ tintColor: "white", height: vh(20), width: vw(20) }}
                  source={index.image.openEye}
                />}
            </TouchableOpacity>

 
  );
};

export default CommonEye;

const styles = StyleSheet.create({
  container: {
  height:vh(50),
  width:vw(50),
  
  
 
},
  
 secure: {
    height: heightPercentageToDP(calculateHeight(60)),
    width: widthPercentageToDP(calculateWidth(50)),
    justifyContent:"center",
  alignItems:"center"
  
  

  }
});
