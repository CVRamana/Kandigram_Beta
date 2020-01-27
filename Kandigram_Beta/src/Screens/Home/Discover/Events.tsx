import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';

interface EventsProps {}

class Events extends React.Component {
  render(){
  return (
    <View style={styles.container}>
      <Text>Events</Text>
    </View>
  );
  }
};

export default Events;

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:"#131f34"
  }
});
