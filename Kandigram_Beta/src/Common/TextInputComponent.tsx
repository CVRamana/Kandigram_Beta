import * as React from 'react';
import { Text, View, StyleSheet,ImageBackground,TextInput} from 'react-native';
import colors from '../Utils/Constants/colors';
import { widthPercentageToDP, heightPercentageToDP } from 'react-native-responsive-screen';
import { calculateWidth, calculateHeight } from './ResponsiveScreen';

interface TextInputProps {}

class TextInputComponent extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
       value:""
    };
  };
  
  
    render(){
  return (
    <View style={styles.container}>
      <TextInput
       ref={"commonInputRef"}
       placeholder={this.props.commonPlaceholder}
       returnKeyType={this.props.commonReturnKeyType}
       onSubmitEditing={this.props.commonOnSubmitEditing}
       style={styles.textInput}
      />
   
    
    </View>
  );
    }
};

export default TextInputComponent;

const styles = StyleSheet.create({
  container: {},
  textInput:{
  width: widthPercentageToDP(calculateWidth(350)),
  height: heightPercentageToDP(calculateHeight(56)),
  marginTop:widthPercentageToDP(calculateWidth(20)),
  borderRadius: 1000,
  paddingLeft: 20,
  fontSize:heightPercentageToDP(calculateHeight(16)),
  backgroundColor:colors.textInputBGColor,
  borderColor:colors.textInputBorderColor,
  borderStyle: "solid",
  fontWeight: "bold",
  fontStyle: "normal",
  letterSpacing: 0.19,
  color:colors.whiteColor,
  borderWidth: 4,
  }
});
