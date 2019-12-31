import * as React from 'react';

import { Text, View, StyleSheet } from 'react-native';
import {widthPercentageToDP , heightPercentageToDP } from 'react-native-responsive-screen';
import { calculateHeight,calculateWidth } from "../../Common/ResponsiveScreen";

interface SignUpProps {}

class SignUp extends React.Component{
    render(){
  return (
    <View style={styles.container}>
      <Text>SignUp</Text>
    </View>
  );
    }
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
      paddingTop:widthPercentageToDP(calculateWidth(50)),
      justifyContent:"center",
      alignItems:"center",
      backgroundColor:"pink"
}
});
