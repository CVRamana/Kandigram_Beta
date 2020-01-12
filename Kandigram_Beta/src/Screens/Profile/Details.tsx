import * as React from 'react';
import { Text, View, StyleSheet, ImageBackground, Image } from 'react-native';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import { calculateHeight, calculateWidth } from '../../Common/ResponsiveScreen';
import colors from '../../Utils/Constants/colors';
import index from "../../Utils/Constants/index";
import { ScrollView } from 'react-native-gesture-handler';

interface DetailsProps { }

class Details extends React.Component {
  render() {
    return (
      <ImageBackground style={styles.container}>
      
        <ImageBackground
          source={index.image.detailBG}
          style={styles.header}>
          <View style={styles.summerCarniwal}>
            <Text style={styles.summerText}> Summer Carniwal 2020 </Text>
          </View>
          <View style={{ flexDirection: "row", marginTop: heightPercentageToDP(calculateHeight(10)), }}>
            <View style={{
              height: heightPercentageToDP(calculateHeight(21)),
              width: widthPercentageToDP(calculateWidth(180)),
              backgroundColor: "rgba(35, 35, 35, 0.3)",
              marginLeft: widthPercentageToDP(calculateWidth(40)),
              // marginTop: heightPercentageToDP(calculateHeight(10)),
              alignItems: "center",
              justifyContent: "center"
            }}
            >
              <Text style={{
                opacity: 0.95,
                fontFamily: "Ubuntu-Bold",
                fontSize: heightPercentageToDP(calculateHeight(12)),
                fontWeight: "normal",
                fontStyle: "normal",
                letterSpacing: -0.24,
                color: colors.whiteColor
              }}> Beyond Wonderland 20926gf</Text>

            </View>
            <View style={{
              width: 78,
              height: 22,
              marginLeft: 63,
              borderRadius: 5,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(35, 35, 35, 0.3)"
            }}><Text>5/06/2019</Text>
            </View>
          </View>
          <View style={{
            width: 272,
            height: 40.4,
            borderRadius: 10,
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
          }}>
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

        </ImageBackground>
        <ScrollView>
        <View style={styles.like}>
          <Image 
          style={styles.likeImg}
          source={index.image.like}
          />
          <Image
           style={styles.likeImg}
           source={index.image.like}
            />
        </View>
        <View style={{
           height:heightPercentageToDP(calculateHeight(144)),
           width:widthPercentageToDP(calculateWidth(348)),
           marginTop:widthPercentageToDP(calculateWidth(20)),
           marginLeft:widthPercentageToDP(calculateWidth(20))
           }}>
    <Text style={{
      fontFamily: "Ubuntu-Medium",
  fontSize: 20,
  fontWeight: "500",
  fontStyle: "normal",
  lineHeight: 35,
  letterSpacing: 0,
  color: colors.whiteColor}}>Absolutely loved camping at this show! Met the most 
      amazing people and we can’t wait to come back next year. 
      See you all at EDC in 2020!</Text>
          </View>
          <View style={styles.likeCont}>
            <Image
            style={{height:24,width:24,borderRadius:12,backgroundColor:"red"}}
            />
             <Image
            style={{height:24,width:24,borderRadius:12,backgroundColor:"red"}}
            />
             <Image
            style={{height:24,width:24,borderRadius:12,backgroundColor:"red",marginRight:8 ,}}
            />
            <Text style={{fontFamily: "Ubuntu",
  fontSize: 14,
  fontWeight: "bold",
  fontStyle: "normal",
  letterSpacing: 0.17,
  color: "#e91e63"}}>Liked by @myfestival and 94 other </Text>
            </View>
</ScrollView>
      </ImageBackground>
    );
  };
}

export default Details;

const styles = StyleSheet.create({
  likeCont:{
    height:heightPercentageToDP(calculateHeight(24)),
    width:widthPercentageToDP(calculateWidth(330)),
    marginTop: heightPercentageToDP(calculateHeight(14)),
    marginLeft: widthPercentageToDP(calculateWidth(16)),
    flexDirection:"row"

  },
  likeImg:{
    height:heightPercentageToDP(calculateHeight(48)),
    width:widthPercentageToDP(calculateWidth(48)),
    marginRight:widthPercentageToDP(calculateWidth(18))

  },
  like: {
    marginTop: heightPercentageToDP(calculateHeight(400)),
    marginLeft: widthPercentageToDP(calculateWidth(241)),
    flexDirection:  "row",
    // backgroundColor:"green"

  },
  container: {
  // marginTop:50,
    height: heightPercentageToDP(calculateHeight(1764)),
   // height:1777,
    width: "100%",
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
    height: 36,
    fontFamily: "Monofett",
    // marginLeft:widthPercentageToDP(calculateWidth(13)),
    marginTop: heightPercentageToDP(calculateHeight(50)),
    alignItems: "center"

  },

  summerText: {
    fontFamily: "Monofett",
    fontSize: 32,
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
    paddingLeft: 12,
    flexDirection: "row",
    alignItems: "center",
    // backgroundColor:"grey"
  }
});
