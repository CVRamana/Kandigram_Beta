import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions, Platform } from 'react-native';
import { vw } from '../ResponsiveScreen';

export default class DefaultSlide extends React.PureComponent {
  render() {
    const { item, dimensions, bottomButton } = this.props;
    const style = {
      flex: 1,
      backgroundColor: item.backgroundColor,
      width: dimensions.width,
      paddingBottom: bottomButton ? 132 : 64,
    };
    return (
      <View style={[styles.mainContent]}>
        <Image source={item.image} style={{height:"100%",width:"100%"}}  />
        <Text style={[styles.text, item.textStyle]}>{item.text}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContent: {
    flex: 1,
  },
  text: {
    color: 'rgba(255, 255, 255, .7)',
    fontSize: vw(16),
    textAlign: 'center',
    fontWeight: '300',
    paddingHorizontal: vw(16),
  },
  title: {
    fontSize: vw(26),
    color: 'rgba(255, 255, 255, .7)',
    fontWeight: '300',
    paddingHorizontal: vw(16),
  },
});