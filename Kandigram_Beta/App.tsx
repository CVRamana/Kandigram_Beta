import React, { Component } from 'react';

import { View, Text } from 'react-native';

//import AppNavigator from "./src/Utils/Constants/AppNavigator";
import store from './src/Store/ConfigureStore'
import {Provider} from 'react-redux'
import RootNavigator from './src/Utils/Constants/SwitchNavigator';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    return (
      <Provider store={store}>
            <RootNavigator/>
            </Provider>
    );
  }
}

export default App;
