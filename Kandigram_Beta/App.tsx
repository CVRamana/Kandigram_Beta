import React, { Component } from 'react';
import { View, Text } from 'react-native';
import AppNavigator from "./src/Utils/Constants/AppNavigator";
import store from './src/Store/ConfigureStore'
import {Provider} from 'react-redux'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <Provider store={store}>
            <AppNavigator/>
            </Provider>
    );
  }
}

export default App;
