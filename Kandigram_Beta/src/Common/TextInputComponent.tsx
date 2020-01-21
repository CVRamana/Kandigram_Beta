import * as React from 'react';
import { Text, View, StyleSheet,ImageBackground,TextInput} from 'react-native';
import colors from '../Utils/Constants/colors';
import { widthPercentageToDP, heightPercentageToDP } from 'react-native-responsive-screen';
import { calculateWidth, calculateHeight } from './ResponsiveScreen';

interface TextInputProps {
 
  val:any
  commonPlaceholder:string
  commonReturnKeyType:string
  commonOnChangeText:Function


}
interface State{
value:string
}

class TextInputComponent extends React.Component<TextInputProps>{
  constructor(props:TextInputProps) {
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
       value={this.props.val}
       placeholder={this.props.commonPlaceholder}
       placeholderTextColor={"rgba(255,255,255,.3)"}
       returnKeyType={this.props.commonReturnKeyType}
       onSubmitEditing={this.props.commonOnSubmitEditing}
       onChangeText={this.props.commonOnChangeText}
       style={[styles.textInput,this.props.extraStyle]}
       secureTextEntry={this.props.commonSecureTextEntry}
       onBlur={this.props.commonOnBlur}
       
      />
   
    
    </View>
  );
    }
};

export default TextInputComponent;

const styles = StyleSheet.create({
  container: {},
  textInput:{
  width: widthPercentageToDP(calculateWidth(338)),
  height: heightPercentageToDP(calculateHeight(50)),
//  marginTop:widthPercentageToDP(calculateWidth(20)),
  borderRadius: 1000,
  paddingLeft: 20,
  fontSize:heightPercentageToDP(calculateHeight(16)),
  //backgroundColor:colors.textInputBGColor,
  backgroundColor:"transparent",
  borderColor:colors.textInputBorderColor,
  borderStyle: "solid",
  fontWeight: "bold",
  fontStyle: "normal",
  letterSpacing: 0.19,
  color:colors.whiteColor,
  borderWidth: 2,
  }
});
