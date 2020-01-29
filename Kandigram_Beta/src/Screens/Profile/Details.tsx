import * as React from 'react';
import { Text, View, StyleSheet, ImageBackground, Image } from 'react-native';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import { calculateHeight, calculateWidth, vw, vh } from '../../Common/ResponsiveScreen';
import colors from '../../Utils/Constants/colors';
import index from "../../Utils/Constants/index";
import { ScrollView } from 'react-native-gesture-handler';

interface DetailsProps { }
interface State {

}

class Details extends React.Component<DetailsProps, State> {
  render() {
    return (
      <ImageBackground
        source={{}}
        style={styles.container}>

        <ImageBackground
          source={index.image.detailBG}
          style={styles.header}>
          <View style={styles.summerCarniwal}>
            <Text style={styles.summerText}> Summer Carniwal 2020 </Text>
          </View>
          <View style={{ flexDirection: "row", marginTop: heightPercentageToDP(calculateHeight(10)), }}>
            <View style={styles.txt1}
            >
              <Text style={styles.txt2}> Beyond Wonderland 20926gf</Text>

            </View>
            <View style={styles.v2}>
              <Text>5/06/2019</Text>
            </View>
          </View>
          <View style={styles.v3}>
            <View style={styles.iconContainer}>
              <Image
                style={{}}
                source={index.image.camera}
              />
              <Text style={{ marginLeft: vw(6) }}>12</Text>


            </View>
            <View style={styles.iconContainer}>
              <Image
                style={{}}
                source={index.image.likeStats}

              />
              <Text style={{ marginLeft: vw(6) }}>12</Text>

            </View>
            <View style={styles.iconContainer}>
              <Image
                style={{}}
                source={index.image.comment}

              />
              <Text style={{ marginLeft: vw(6) }}>12</Text>

            </View>
            <View style={styles.iconContainer}>
              <Image
                style={{}}
                source={index.image.camera}

              />
              <Text style={{ marginLeft: vw(6) }}>12</Text>

            </View>
          </View>

        </ImageBackground>
        <ScrollView>
          <View style={styles.like}>
            <Image
            resizeMethod={"resize"}
            resizeMode={"contain"}
              style={styles.likeImg}
              source={index.image.like}
            />
            <Image
             resizeMethod={"resize"}
             resizeMode={"contain"}
              style={styles.likeImg}
              source={index.image.like}
            />
          </View>
          <View style={{
            height: heightPercentageToDP(calculateHeight(144)),
            width: widthPercentageToDP(calculateWidth(348)),
            marginTop: widthPercentageToDP(calculateWidth(20)),
            marginLeft: widthPercentageToDP(calculateWidth(20))
          }}>
            <Text style={{
              fontFamily: "Ubuntu-Medium",
              fontSize: vw(20),
              fontWeight: "500",
              fontStyle: "normal",
              lineHeight: 35,
              letterSpacing: 0,
              color: colors.whiteColor
            }}>Absolutely loved camping at this show! Met the most
                        amazing people and we can’t wait to come back next year.
      See you all at EDC in 2020!</Text>
          </View>
          <View style={styles.likeCont}>
            <Image
              source={{}}
              style={{ height: vh(24), width: vh(24), borderRadius: vh(12), backgroundColor: "red" }}
            />
            <Image
              source={{}}
              style={{ height: vh(24), width: vh(24), borderRadius: vh(12), backgroundColor: "red" }}
            />
            <Image
              source={{}}
              style={{ height: vh(24), width: vh(24), borderRadius: vh(12), backgroundColor: "red", marginRight: vw(8), }}
            />
            <Text style={{
              fontFamily: "Ubuntu",
              fontSize: vw(14),
              fontWeight: "bold",
              fontStyle: "normal",
              letterSpacing: 0.17,
              color: "#e91e63"
            }}>Liked by @myfestival and 94 other </Text>
          </View>
          <View style={{
            marginTop: heightPercentageToDP(calculateHeight(46)),
            marginLeft: widthPercentageToDP(calculateWidth(156))
          }}>
            <Image
              source={{}}
              style={{
                height: vh(64),
                width: vh(64),
                backgroundColor: "green",
                borderRadius:vh(32)
              }}
            />
          </View>
          <View style={styles.v4}>
            <Text style={styles.commonText}> katietheraver </Text>
          </View>
          <View
            style={styles.v5}
          >
            <Text style={styles.commonText}>Comments </Text>
            <Text style={[styles.commonText, {
              marginLeft: widthPercentageToDP(calculateWidth(80))
            }]}> View all 23 Comments</Text>
          </View>
          <View style={styles.commentContainer}>

          </View>
          <View style={{ marginLeft: vw(17), marginTop: vh(40) }}>
            <Text style={styles.commonText}>Made from this Kandi</Text>
          </View>
          <View style={styles.memoryContainer}>

          </View>
        </ScrollView>
      </ImageBackground>
    );
  };
}

export default Details;

const styles = StyleSheet.create({
  memoryContainer: {
    height: vh(360),
    width: vw(345),
    backgroundColor: "lightgrey",
    marginBottom: vh(60),
    marginTop: heightPercentageToDP(calculateHeight(19)),
    marginLeft: widthPercentageToDP(calculateWidth(16)),
    borderRadius: 10,

  },
  v2:{
    width: vw(78),
    height:vh(22) ,
    marginLeft:vw(63),
    borderRadius: vw(5),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(35, 35, 35, 0.3)"
  },
  v3:{
    width: vw(272),
    height: vh(40),
    borderRadius: vw(10),
    flexDirection: "row",
    shadowColor: "rgba(0, 0, 0, 0.25)",
    backgroundColor: "rgba(35, 35, 35, 0.3)",
    marginLeft: widthPercentageToDP(calculateWidth(56)),
    marginTop: heightPercentageToDP(calculateHeight(14)),
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowRadius: 4,
    shadowOpacity: 1
  },
  v4:{
    height: heightPercentageToDP(calculateHeight(34)),
    width: widthPercentageToDP(calculateWidth(120)),
    justifyContent: "center",
    marginTop: heightPercentageToDP(calculateHeight(13)),
    marginLeft: widthPercentageToDP(calculateWidth(128)),
  
    borderColor: "rgb(233, 30, 99)",
    borderRadius:vw(10) ,
    shadowColor: "rgba(0, 0, 0, 0.25)",
    borderWidth: vw(3),
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowRadius: 4,
    shadowOpacity: 1,
    alignItems: "center"
  },
  v5:{
    height: heightPercentageToDP(calculateHeight(25)),
    marginTop: heightPercentageToDP(calculateHeight(35)),
    alignItems: "center",
    flexDirection: 'row',
    paddingLeft: widthPercentageToDP(calculateWidth(18))
  },
  
  txt2:{
    opacity: 0.95,
    fontFamily: "Ubuntu-Bold",
    fontSize: heightPercentageToDP(calculateHeight(12)),
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: -0.24,
    color: colors.whiteColor
  },
  commonText: {

    fontFamily: "Ubuntu-Medium",
    fontSize: widthPercentageToDP(calculateWidth(14)),
    fontWeight: "bold",
    fontStyle: "normal",
    letterSpacing: 0.7,
    color: colors.whiteColor
  },
  commentContainer: {
    marginTop: heightPercentageToDP(calculateHeight(19)),
    marginLeft: widthPercentageToDP(calculateWidth(16)),
    height: heightPercentageToDP(calculateHeight(430)),
    width: widthPercentageToDP(calculateWidth(342)),
    borderRadius: vw(10),
    backgroundColor: "#18273b"

  },
  likeCont: {
    height: heightPercentageToDP(calculateHeight(24)),
    width: widthPercentageToDP(calculateWidth(330)),
    marginTop: heightPercentageToDP(calculateHeight(14)),
    marginLeft: widthPercentageToDP(calculateWidth(16)),
    flexDirection: "row"

  },
  likeImg: {
    height: heightPercentageToDP(calculateHeight(48)),
    width: widthPercentageToDP(calculateWidth(48)),
    marginRight: widthPercentageToDP(calculateWidth(18))

  },
  like: {
    marginTop: heightPercentageToDP(calculateHeight(400)),
    marginLeft: widthPercentageToDP(calculateWidth(241)),
    flexDirection: "row",
    // backgroundColor:"green"

  },
  container: {
    // marginTop:50,
    flex: 1,
    // height: heightPercentageToDP(calculateHeight(1764)),
    // height:1777,
    width: "100%",
    paddingBottom: vh(10),
    backgroundColor: "grey"
  },
  header: {
    position: "absolute",
    height: heightPercentageToDP(calculateHeight(150)),
    width: widthPercentageToDP(calculateWidth(375)),
    top: 0,
    zIndex: 200,
    backgroundColor: "transparent"
  },
  summerCarniwal: {
    width: ' 100%',
    height: vh(36),
    fontFamily: "Monofett",
    // marginLeft:widthPercentageToDP(calculateWidth(13)),
    marginTop: heightPercentageToDP(calculateHeight(50)),
    alignItems: "center"

  },
  txt1:{
    
      height: heightPercentageToDP(calculateHeight(21)),
      width: widthPercentageToDP(calculateWidth(180)),
      backgroundColor: "rgba(35, 35, 35, 0.3)",
      marginLeft: widthPercentageToDP(calculateWidth(40)),
      // marginTop: heightPercentageToDP(calculateHeight(10)),
      alignItems: "center",
      justifyContent: "center"
    

  },

  summerText: {
    fontFamily: "Monofett",
    fontSize: vw(32),
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0.38,
    color: colors.whiteColor,
    textShadowColor: "rgba(0, 0, 0, 0.25)",
    textShadowOffset: {
      width: 0,
      height: 4
    },
    textShadowRadius: 4
  },
  iconContainer: {
    height: heightPercentageToDP(calculateHeight(40)),
    width: widthPercentageToDP(calculateWidth(62)),
    //justifyContent:"center",
    paddingLeft: vw(12),
    flexDirection: "row",
    alignItems: "center",
    // backgroundColor:"grey"
  }
});
