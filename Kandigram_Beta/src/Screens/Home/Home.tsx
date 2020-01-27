import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ImageBackground, Animated, Easing, Image, LayoutAnimation, Platform, UIManager} from 'react-native';
import index from "../../Utils/Constants/index";
import { widthPercentageToDP, heightPercentageToDP } from 'react-native-responsive-screen';
import { calculateWidth, calculateHeight, vh, vw } from '../../Common/ResponsiveScreen';
import ButtonComponent from '../../Common/ButonComponent';
//import { TouchableOpacity } from 'react-native-gesture-handler';
import colors from '../../Utils/Constants/colors';
import { connect } from "react-redux";

interface HomeProps { 
  navigation:any
}
interface State{
  isleft: boolean
      expanded: boolean
      marginLeft:number
}

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

class Home extends React.Component<HomeProps,State> {
  constructor(props:HomeProps) {
    super(props)
    // this.animatedValue = new Animated.Value(0)

    this.state = {
      isleft: true,
      expanded: false,
      marginLeft: 0,
    };
  };
  componentDidMount() {
    // alert(this.props.uid)
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
          <View style={{
            flexDirection: "row", marginTop: vh(54),
            //width:vw(375)
          }}>
            <Text style={styles.HomeText}>Home</Text>

            <TouchableOpacity
              onPress={() => {
                LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
                this.setState({expanded: !this.state.expanded })
              }}
            // onPress={()=>this.props.navigation.navigate('Discover')}
            >
              <Image
                source={index.image.search}
                style={{ marginLeft: vw(190), }} />
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
            {this.state.expanded ? <View style={{
              height: 50, width: 300, backgroundColor: "grey", marginLeft: 50,
              // position:this.state.position
            }}>
              <TouchableOpacity
                onPress={() => {
                  LayoutAnimation.configureNext(LayoutAnimation.Presets.linear)
                  //this.props.navigation.navigate('AddEvent')
                  this.setState({ marginLeft: 0, })

                }}
              >
                <Image
                  style={{ height: vh(30), width: vw(30) }}
                  source={index.image.cancel}
                />
              </TouchableOpacity>
            </View> : null}
            {/* <View style={{height:50,width:300,backgroundColor:"grey",marginLeft:50}}> */}
          </View>


          {/* TOGGLE BUTOTON */}
          <View style={styles.tab}>
            <View
              style={[styles.tab, {
                marginTop: vh(0),
                justifyContent: "space-around",
                //alignItems:"center",
                flexDirection: "row",
                marginLeft: vw(0), backgroundColor: "transparent", borderWidth: vw(0)
              }]}
            >

              <View style={{
                justifyContent: "space-around",
                alignItems: "center",
                // backgroundColor:"lightgrey"
              }}>
                <Text style={styles.tabTxt}>Made</Text>
              </View>



              <View style={{
                justifyContent: "space-around",
                //   backgroundColor:"lightgrey",
                alignItems: "center",
              }}>
                <TouchableOpacity
                onPress={()=>this.props.navigation.navigate("Discover")}
                >
                <Text style={styles.tabTxt}>Discover</Text>
                </TouchableOpacity>
              </View>

            </View>
            {/* buutonView */}
            {this.state.isleft ?
              <View style={{ position: "absolute" }}>
                <TouchableOpacity
                  onPress={() => {
                    LayoutAnimation.configureNext(LayoutAnimation.Presets.linear)
                   // this.props.navigation.navigate('AddEvent')
                    this.setState({ isleft: !this.state.isleft })
                  }}
                  activeOpacity={1}
                  style={styles.made}>
                  <Text style={styles.tabTxt}>Made </Text>
                </TouchableOpacity>
              </View>
              :
              <View style={{ position: "absolute" }}>
                <TouchableOpacity
                  onPress={() => {
                    LayoutAnimation.configureNext(LayoutAnimation.Presets.linear)
                    this.setState({ isleft: !this.state.isleft })
                  }}
                  activeOpacity={1}
                  style={[styles.made, { marginLeft: vw(153) }]}>
                  <Text style={styles.tabTxt}>Discover </Text>
                </TouchableOpacity>
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
  container: {
    flex: 1,
    backgroundColor: "rgb(19 ,31 ,52)"
  },
  homebg: {
    //  position:"absolute",
    //     top:0,
    backgroundColor: "transparent",
    width: "100%",
    height: heightPercentageToDP(calculateHeight(250))
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
  }, txt: {
    fontFamily: "Ubuntu-Medium",
    fontSize: vw(20),
    textAlign: "center",
    fontWeight: "bold",
    fontStyle: "normal",
    lineHeight: 32,
    letterSpacing: 0.24,
    color: "#e2e2e2"
  }, HomeText: {
    fontFamily: "Ubuntu-Medium",
    fontSize: vw(24),
    fontWeight: "bold",
    fontStyle: "normal",
    letterSpacing: 0.29,
    color: index.colors.whiteColor,
    marginLeft: vw(16),
  }, tab: {
    width: widthPercentageToDP(calculateWidth(343)),
    marginLeft: vw(18),
    marginTop: heightPercentageToDP(calculateHeight(26)),
    height: heightPercentageToDP(calculateHeight(54)),
    borderRadius: 1000,
    backgroundColor: "transparent",
    borderColor: colors.whiteColor,
    borderWidth: 3
  },
  made: {
    // activeOpacity:1,
    width: widthPercentageToDP(calculateWidth(184)),
    height: heightPercentageToDP(calculateHeight(48)),
    borderRadius: 1000,

    //shadowOpacity:1,
    // position:"absolute",
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
  }
});
