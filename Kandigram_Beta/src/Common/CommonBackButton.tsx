import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { widthPercentageToDP, heightPercentageToDP } from 'react-native-responsive-screen';
import { calculateWidth, calculateHeight } from './ResponsiveScreen';

interface CommonBackButtonProps {
  navigation: any
  myStyle:any
  firstText?:string
  name:string
  passingpropo:any
}

const CommonBackButton = (props: CommonBackButtonProps) => {
  console.warn(props.firstText);
  
  return (
    //  console.warn()
    <View style={styles.container}>
      <TouchableOpacity
      style={[styles.container,props.myStyle]}
      onPress={()=>props.navigation.navigate('WelcomeSplash')}
      > 
          </TouchableOpacity>
    </View>
  );
};

export default CommonBackButton;

const styles = StyleSheet.create({
  container: {
      width:widthPercentageToDP(calculateWidth(11)),
      height:heightPercentageToDP(calculateHeight(18)),
      backgroundColor:"blue",
      marginTop: 70,
      marginLeft: 16,
     
    
  }
});
