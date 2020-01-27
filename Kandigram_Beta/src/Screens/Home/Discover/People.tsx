import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';

interface PeopleProps {}

class People extends React.Component{
  render(){
  return (
    <View style={styles.container}>
      <Text>People</Text>
    </View>
  );
}

};

export default People;

const styles = StyleSheet.create({
  container: {
    backgroundColor:"#131f34",
   
  }
});
