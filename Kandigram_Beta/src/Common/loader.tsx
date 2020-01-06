import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
const Spinner = require('react-native-spinkit');
import NetInfo from "@react-native-community/netinfo";

interface LoaderProps {
    
}

class Loader extends React.PureComponent {
    constructor(props) {
      super(props)
      this.state = { 
      };
    }; 
    componentDidMount(){
       this.checkInternet()
    }
   checkInternet=()=> {
       NetInfo.addEventListener(state => {
        //state.type
         // alert("Is connected?"+state.isConnected);
      });}

    render(){
    if(this.props.isLoading ){ 
        return (
        <View style={styles.container}>
        <Spinner
        isVisible={true} 
        size={100} 
        type={'ChasingDots'}
        color={"green"}
        />
          </View>)
          }else{
              return(
                  <View>
    </View> 
    )
          }
 }
};


export default Loader;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    height: "100%",
    width: "100%",
    zIndex: 20
  }
});
