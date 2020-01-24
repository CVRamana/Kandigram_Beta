import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { vw, vh } from './ResponsiveScreen';
import colors from '../Utils/Constants/colors';
import index from "../Utils/Constants/index";

interface SettingDataRenderProps { }

class SettingDataRender extends React.Component<SettingDataRenderProps> {
  constructor(props: SettingDataRenderProps) {
    super(props)
    this.state = {

    };
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={{ flexDirection: "row", }}>
          <Image
            source={this.props.img}
            resizeMode={"contain"}
            resizeMethod={"resize"}
            style={{
              height: vh(48), width: vw(48),
              marginTop: vh(16),
              marginLeft: vw(16),
            }}
          />
          <Text style={styles.txt}>{this.props.txt} </Text>
          <TouchableOpacity
            style={{
              marginTop: vh(30),
              position: "absolute",
              right: vw(16)
              // marginLeft: vw(196),
            }}
            onPress={this.props.onClick}
          >
            <Image
              source={index.image.backArrow}
            
              style={{}}
            />
          </TouchableOpacity>
        </View>

      </View>
    );
  }
};

export default SettingDataRender;

const styles = StyleSheet.create({
  txt: {
    marginTop: vh(30),
    marginLeft: vw(16),
    fontFamily: "Ubuntu-Medium",
    fontSize: vw(18),
    fontWeight: "500",
    fontStyle: "normal",
    letterSpacing: 0.22,
    color: colors.whiteColor
  },
  container: {
    width: vw(343),
    height: vh(80),
    marginTop: vh(20),
    marginLeft: vw(16),
    borderRadius: vh(10),
    backgroundColor: "rgb(18, 40, 87)",
    borderStyle: "solid",
    borderWidth: 2,
    borderColor: "#213d79"
  }
});
