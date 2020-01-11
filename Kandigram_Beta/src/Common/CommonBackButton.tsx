import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { widthPercentageToDP, heightPercentageToDP } from 'react-native-responsive-screen';
import { calculateWidth, calculateHeight } from './ResponsiveScreen';

interface CommonBackButtonProps {
    myStyle: StyleProp<ViewStyle>;
}

const CommonBackButton = (props: CommonBackButtonProps) => {
  return (
    //  console.warn()
    <View style={styles.container}>
      <TouchableOpacity
      style={[styles.container,props.myStyle]}
      onPress={()=>props.handleClick()}
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
      marginTop: 100,
      marginLeft: 16,
     
    
  }
});
