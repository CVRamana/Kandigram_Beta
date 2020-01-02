import * as React from 'react';
import { Component } from "react";
import NetInfo from "@react-native-community/netinfo";
import {connect} from 'react-redux'
import {GlobalAction} from '../../GlobalRedux/GlobalAction'
import { Text, View, StyleSheet, Animated, Image, Easing } from 'react-native';

interface SplashProps { }

class Splash extends Component {

  constructor(props) {
    super(props)
    this.spinValue = new Animated.Value(0)
    this.state = {
    };
  };

  componentDidMount() {
    this.spin()
   this.checkInternet()
  }
  checkInternet=()=> {
    NetInfo.addEventListener(state => {
     
      this.props.GlobalAction(state.isConnected);
   });
  }

  spin = () => {
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
      inputRange: [0,0.5,1],
      outputRange: ['0deg','360deg','0deg']
    })
    return (
      <View style={styles.container}>
        <Animated.Image
          style={{
            width: 227,
            height: 200,
            transform: [{ rotate: spin }]
          }}
          source={{ uri: 'https://s3.amazonaws.com/media-p.slid.es/uploads/alexanderfarennikov/images/1198519/reactjs.png' }}
        />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
const mapStateToProps=(state:any)=>{
  return{
//define the states here
  }
}
const mapDispatchToProps={
  GlobalAction:GlobalAction
}

export default connect(mapStateToProps,mapDispatchToProps)(Splash);
