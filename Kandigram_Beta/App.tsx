import React, { Component } from 'react';
import { View, Text } from 'react-native';
import AppNavigator from "./src/Utils/Constants/AppNavigator";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
            <AppNavigator/>
    );
  }
}

export default App;
