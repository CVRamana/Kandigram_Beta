import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ImageBackground, Animated, Easing, Image, LayoutAnimation, TextInput, Platform, UIManager } from 'react-native';
import index from "../../Utils/Constants/index";
import { widthPercentageToDP, heightPercentageToDP } from 'react-native-responsive-screen';
import { calculateWidth, calculateHeight, vh, vw } from '../../Common/ResponsiveScreen';
import ButtonComponent from '../../Common/ButonComponent';
import colors from '../../Utils/Constants/colors';
import {connect} from "react-redux";

interface HomeProps {
  navigation: any
}
interface State {
  isleft: boolean
  expanded: boolean
  animatedMargin: any
}

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

class Home extends React.Component<HomeProps, State> {
  constructor(props: HomeProps) {
    super(props)

    this.state = {
      isleft: true,
      expanded: false,
      animatedMargin: new Animated.Value(vw(50))

    };
  };
  componentDidMount() {
   
  }
  animate = (val: number) => {
    Animated.timing(
      this.state.animatedMargin,
      {
        toValue: val,
        duration: 600,
        easing: Easing.linear,
      }
    ).start()
  }

  render() {
    return (
      <ImageBackground
        source={{}} style={styles.container}>

        <ImageBackground
          resizeMode={"stretch"}
          resizeMethod="resize"
          source={index.image.HomeBG}
          style={styles.homebg}
        >
          <View style={styles.header_cont}>
            <Text style={styles.HomeText}>Home</Text>
            {/* //Search Button Pressed */}
            <TouchableOpacity
              onPress={
                () => this.animate(-vw(328))}
            >
              <Image
                source={index.image.search}
                style={{ marginLeft: vw(190), }}
              />
            </TouchableOpacity>
            {/* on saved Press */}
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Offlinekandies')}
            //  onPress={() => this.props.navigation.navigate('ChatApp', { uid: this.props.uid })}
            >
              <Image
                style={{ marginLeft: vw(24), }}
                source={index.image.saved} />
            </TouchableOpacity>


            {/* for the input animated */}
            <Animated.View style={[styles.animated_input_cont, { marginLeft: this.state.animatedMargin, }]}>
              <TouchableOpacity
                style={{ marginLeft: vw(16), marginTop: vh(10) }}
                onPress={() =>
                  this.animate(vw(50))
                }
              >
                <Image
                  resizeMethod={"resize"}
                  resizeMode={"contain"}
                  style={styles.cancel}
                  source={index.image.cancel}
                />

              </TouchableOpacity>
              <TextInput
                style={styles.aniText}
              />

            </Animated.View>


            {/* <View style={{height:50,width:300,backgroundColor:"grey",marginLeft:50}}> */}
          </View>


          {/* TOGGLE BUTOTON */}
          <View style={styles.tab}>
            {/* for the text */}
            <TouchableOpacity 
            style={styles.btnTxt}
            activeOpacity={1}
            onPress={()=>{
              LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
              this.setState({isleft:!this.state.isleft},()=>this.props.navigation.navigate('Discover'))
            }
          }
            >
              <Text style={styles.tabTxt}>Made </Text>
              <Text  style={styles.tabTxt}>Discover </Text>
              </TouchableOpacity >
              {/* button View */}

              { 
              this.state.isleft ?
              <View style={[styles.btnCont,{marginLeft:vw(175)}]}>
                <Text style={[styles.tabTxt,{color:index.colors.lipstick}]}>Discover</Text> 
                </View> :
                <View style={[styles.btnCont,{marginLeft:vw(-1)}]}>
                <Text style={[styles.tabTxt,{color:index.colors.lipstick}]}>Made</Text> 
                </View>
              }
          </View>

        </ImageBackground>

        <Image
          style={styles.emptyImg}
          source={index.image.empty}
          resizeMode={"contain"}
        >

        </Image>
        <View style={styles.textContainer}>

          <Text style={styles.txt}> {index.strings.createKandi}</Text>

        </View>
        <ButtonComponent

          name={"Get Kandi Beads"}
          onButtonPress={() => this.props.navigation.navigate('CreateKandi')}
          myStyle={{
            marginLeft: widthPercentageToDP(calculateWidth(20)),
            marginTop: heightPercentageToDP(calculateHeight(35))
          }}
        />

      </ImageBackground>
    );
  }
}
const mapStateToProps = (state: any) => {
  return {
    uid: state.PersistReducer.uid
  }
}

export default connect(mapStateToProps)(Home);

const styles = StyleSheet.create({
 header_cont: {
    flexDirection: "row", marginTop: vh(54), alignItems: "center"  
  },
  cancel:{ height: vh(28), width: vh(21) },
  btnCont:{ 
    width: vw(164),
    height: vh(48),
    borderRadius: 10000,
    position:"absolute",
    justifyContent:"center",
    alignItems:"center",
    backgroundColor: index.colors.whiteColor},
  container: {
    flex: 1,
    backgroundColor: "rgb(19 ,31 ,52)"
  },
  aniText: { height: vh(48), width: vw(300), paddingLeft: vw(15), paddingRight: vw(15) },
  homebg: {
    backgroundColor: "transparent",
    width: "100%",
    height: heightPercentageToDP(calculateHeight(250))
  },
  btnTxt:{
    width: widthPercentageToDP(calculateWidth(335)),
    height: heightPercentageToDP(calculateHeight(45)),
    borderRadius: 1000,
    flexDirection:"row",
    justifyContent:"space-around",
    alignItems:"center",
    backgroundColor: "transparent",
  },
  emptyImg: {
    height: heightPercentageToDP(calculateHeight(140)),
    width: widthPercentageToDP(calculateWidth(140)),
    marginLeft: widthPercentageToDP(calculateWidth(118)),
    marginTop: heightPercentageToDP(calculateHeight(60))
  }, textContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: heightPercentageToDP(calculateHeight(64)),
    width: widthPercentageToDP(calculateWidth(276)),
    marginLeft: widthPercentageToDP(calculateWidth(50)),
    marginTop: heightPercentageToDP(calculateHeight(10))
  },
   txt: {
    fontFamily: "Ubuntu-Medium",
    fontSize: vw(20),
    textAlign: "center",
    fontWeight: "bold",
    fontStyle: "normal",
    lineHeight: 32,
    letterSpacing: 0.24,
    color: "#e2e2e2"
  },
   HomeText: {
    fontFamily: "Ubuntu-Medium",
    fontSize: vw(24),
    fontWeight: "bold",
    fontStyle: "normal",
    letterSpacing: 0.29,
    color: index.colors.whiteColor,
    marginLeft: vw(22),
  },
   tab: {
    width: widthPercentageToDP(calculateWidth(343)),
    marginLeft: vw(16),
    flexDirection:"row",
    marginTop: heightPercentageToDP(calculateHeight(26)),
    height: heightPercentageToDP(calculateHeight(54)),
    borderRadius: 1000,
    backgroundColor: "transparent",
    borderColor: colors.whiteColor,
    borderWidth: vw(3)
  },
  made: {
    // activeOpacity:1,
    width: widthPercentageToDP(calculateWidth(184)),
    height: heightPercentageToDP(calculateHeight(48)),
    borderRadius: 1000,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "grey"

  },
  tabTxt: {
    fontFamily: "Ubuntu-Medium",
    fontSize: vw(16),
    fontWeight: "bold",
    fontStyle: "normal",
    letterSpacing: 0.19,
    color: colors.whiteColor
  },
  animated_input_cont: {

    width: vw(343),
    height: vh(48),
    flexDirection: "row",
    borderRadius: 100,
    backgroundColor: colors.whiteColor

  }
});
