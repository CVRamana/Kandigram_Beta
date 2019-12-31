import * as React from 'react';
import { Component } from "react";
import NetInfo from "@react-native-community/netinfo";
import { Text, View, StyleSheet,Animated,Image ,Easing} from 'react-native';

interface SplashProps { }

class Splash extends Component {

    constructor(props) {
      super(props)
      this.spinValue=new Animated.Value(0)
      this.state = {
         
      };
    };

    componentDidMount(){
         this.spin()
       NetInfo.addEventListener(state => {
        //  alert("Connection type"+state.type);
       //  alert("Is connected?"+state.isConnected);
        });
       
        
  
    }
  
    spin=()=>{
        this.spinValue.setValue(0)
        Animated.timing(
          this.spinValue,
          {
            toValue: 1,
            duration: 2000,
            easing: Easing.linear
          }
        ).start(() => this.props.navigation.navigate('SignUp'))
    }
    
    render() {
        const spin = this.spinValue.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '360deg']
          })
        return (
            <View style={styles.container}>

                <Text>Splash</Text>
                <Animated.Image
        style={{
          width: 227,
          height: 200,
          transform: [{rotate: spin}] }}
          source={{uri: 'https://s3.amazonaws.com/media-p.slid.es/uploads/alexanderfarennikov/images/1198519/reactjs.png'}}
      />
            </View>
        );
    }
};

export default Splash;

const styles = StyleSheet.create({
    container: {
      flex:1,
      justifyContent:"center",
      alignItems:"center"

    }
});
