import * as React from 'react';
import { Text, View, StyleSheet, ImageBackground, Image } from 'react-native';
import index from "../../Utils/Constants/index";
import { vh, vw } from '../../Common/ResponsiveScreen';

import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';

interface OfflineKandiesProps { }

class OfflineKandies extends React.Component {
  render() {
    return (

      <ImageBackground
        //  resizeMode={""}
        source={index.image.offbg}
        style={styles.container}>

        <ImageBackground style={styles.bg}
          source={index.image.bgOfflineHead}
        >
          <View style={styles.head}>
            <TouchableOpacity 
            onPress={()=>this.props.navigation.goBack()}
            >
              <Image
                //  resizeMode={"contain"}
                style={styles.back}
                source={index.image.back}
              />
            </TouchableOpacity>
            <Text style={styles.txt}>Offline Kandies</Text>
            <Image
              style={styles.refresh}
              source={index.image.refresh}
            />
          </View>

        </ImageBackground>
        <ScrollView>
          <View style={styles.data}>
            <View style={{ flexDirection: "row" }}>
              <View>
                <Image
                  style={styles.profileImg}
                />
              </View>
              <View style={styles.txtData}>
                <Text style={styles.txt}>Undiscovered Kandi </Text>
                <Text style={[styles.txt, { fontSize: vw(13) }]}>Offline kandi</Text>
              </View>
              {/* //icon container */}
              <View style={styles.iconRefresh}>
                <Image
                  source={index.image.refresh}
                />
              </View>
            </View>
            <View style={styles.icons}>
              <View style={styles.iconContainer}>
                <Image
                  style={{}}
                  source={index.image.camera}
                />
                <Text style={{ marginLeft: 6 }}>12</Text>


              </View>
              <View style={styles.iconContainer}>
                <Image
                  style={{}}
                  source={index.image.likeStats}

                />
                <Text style={{ marginLeft: 6 }}>12</Text>

              </View>
              <View style={styles.iconContainer}>
                <Image
                  style={{}}
                  source={index.image.comment}

                />
                <Text style={{ marginLeft: 6 }}>12</Text>

              </View>
              <View style={styles.iconContainer}>
                <Image
                  style={{}}
                  source={index.image.camera}

                />
                <Text style={{ marginLeft: 6 }}>12</Text>

              </View>
            </View>
          </View>

        </ScrollView>

      </ImageBackground>

    );
  }
};

export default OfflineKandies;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    paddingTop: 90,
    backgroundColor: "rgb(19 ,31 ,52)"
  },
  bg: {
    height: vh(140),
    width: vw(375),
    position: "absolute",
    top: 0,
    zIndex: 300,

  },

  txtData: {
    width: vw(200),
    height: vh(60),
    marginTop: vh(29),
    marginLeft: vw(0),
    fontFamily: "Ubuntu",
    fontSize: 18,
    fontWeight: "bold",
    fontStyle: "normal",
    letterSpacing: 0.22,
    color: index.colors.whiteColor

  },
  data: {
    width: vw(303),
    height: vh(136),
    borderRadius: 9,
    backgroundColor: index.colors.textInputBGColor,
    marginTop: vh(78),
    marginLeft: vw(59),
    //  flexDirection:"row"
  },

  head: {
    flexDirection: "row",
    marginTop: vh(56),
    // justifyContent:"center",
    alignItems: "center"
  }, back: {
    width: vw(27),
    height: vh(28),
    marginLeft: vw(20)
  }, txt: {
    marginLeft: vw(20),
    fontFamily: "Ubuntu-Medium",
    fontSize: vw(18),
    fontWeight: "bold",
    fontStyle: "normal",
    letterSpacing: 0.22,
    color: index.colors.whiteColor

  },
  refresh: {
    marginLeft: vw(130)
  },
  profileImg: {
    height: vh(80),
    width: vw(80),
    borderRadius:vw(20),
    backgroundColor: "red",
    marginTop: vh(29),
    marginLeft: vw(-40)
  },
  iconRefresh: {
    height: vh(28),
    width: vw(28),
    marginTop: vh(33),
    marginRight: vw(10),
    marginLeft: vw(20),
    // backgroundColor:"grey"
  },
  icons: {
    width: vw(220),
    height: vh(40),
    borderRadius: vw(10),
    flexDirection: "row",
    shadowColor: "rgba(0, 0, 0, 0.25)",
    backgroundColor: "rgba(35, 35, 35, 0.3)",
    //backgroundColor:"red",
    marginLeft: vw(56),
    marginTop: vh(-14),
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowRadius: 4,
    shadowOpacity: 1


  },
  iconContainer: {
    height: vh(40),
    width: vw(62),
    //justifyContent:"center",
    paddingLeft: vw(12),
    flexDirection: "row",
    alignItems: "center",
    // backgroundColor:"grey"
  }
});
