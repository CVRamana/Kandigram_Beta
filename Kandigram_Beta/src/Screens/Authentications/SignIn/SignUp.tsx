import * as React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { widthPercentageToDP, heightPercentageToDP } from 'react-native-responsive-screen';
import { calculateHeight, calculateWidth } from "../../../Common/ResponsiveScreen";
import DeviceInfo from 'react-native-device-info'
import { SignUpAction } from './SignInAction'
import {PersistAction} from '../../../ReduxPersist/PersistAction'
import AsyncStorage from '@react-native-community/async-storage'
import { connect } from "react-redux";
import Loader from '../../../Common/loader';

class SignUp extends React.Component {
  componentDidMount() {
   // this.clearAsyncStorage()
  }
  clearAsyncStorage = async () => {
  await AsyncStorage.clear();
}
  onPress = () => {
    debugger
    this.props.SignUpAction()
  }
  onPersist=()=>{
    this.props.PersistAction()
  }
  render() {
    return (
      <View style={styles.container}>
        <Loader
        isLoading={false}
        />
        <Text>SignUp</Text>
        <Text> {DeviceInfo.getDeviceId}</Text>
        <Button onPress={() => this.onPress()} title={"Redux"} />
        <Button onPress={() => this.onPersist()} title={"Redux Persist"} />

        <Text> {this.props.arr}</Text>
        <Text>{this.props.offlineData} </Text>
      </View>
    );
  }
};

const mapStateToProps = (state: any) => {
  return {
    arr: state.SignInReducer.arr,
    offlineData: state.PersistReducer.offlineData,
  }
}

const mapDispatchToProps = {
  SignUpAction: SignUpAction,
  PersistAction:PersistAction
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: widthPercentageToDP(calculateWidth(50)),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "pink"
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);