import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { widthPercentageToDP, heightPercentageToDP } from 'react-native-responsive-screen';
import { calculateWidth, calculateHeight } from './ResponsiveScreen';
import colors from '../Utils/Constants/colors';
import { LinearGradient } from 'react-native-linear-gradient'

interface ButtonComponentProps { }

class ButtonComponent extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity
                    style={styles.bttn}
                    onPress={this.props.onButtonPress}
                >
                        <Text>{this.props.name} </Text>
                </TouchableOpacity>

            </View>
        );
    };
}

export default ButtonComponent;

const styles = StyleSheet.create({
    container: {},
    bttn: {
        width: widthPercentageToDP(calculateWidth(340)),
        height: heightPercentageToDP(calculateHeight(54)),
        borderWidth:3,
        marginLeft:widthPercentageToDP(calculateWidth(16)),
        borderColor:colors.whiteColor,
        borderRadius:widthPercentageToDP(calculateWidth(78)),
        justifyContent:"center",
        alignItems:"center"
      
    },
    gradientt:{
        flex: 1,
   height:100,width:200
    }
});
