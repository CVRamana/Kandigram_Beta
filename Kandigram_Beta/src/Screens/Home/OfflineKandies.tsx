import * as React from 'react';
import { Text, View, StyleSheet, ImageBackground, TouchableOpacity, ScrollView, Image, FlatList } from 'react-native';
import index from "../../Utils/Constants/index";
import { vh, vw } from '../../Common/ResponsiveScreen';
import { connect } from "react-redux";
import Modal from "react-native-modal";
import firebase from "react-native-firebase";
import { PersistOfflinekandiAction, PersistedKandiClear } from '../../ReduxPersist/PersistAction';
import ButtonComponent from '../../Common/ButonComponent';

interface OfflineKandiesProps {
  navigation: any
  OfflineKandies: any
  PersistedKandiClear: Function
}

interface State {
show:boolean
}

class OfflineKandies extends React.Component<OfflineKandiesProps, State> {
  constructor(props: OfflineKandiesProps) {
    super(props)
    this.state = {
      show: false
    };
  };

  componentDidMount() {
    if (this.props.OfflineKandies === undefined || this.props.OfflineKandies === "") { this.setState({ show: true }) }
  }

  //uploading online the scanned offline kandies
  uploadOnline = () => {
    let val: any = this.props.OfflineKandies
    val.map((i: any) => {
      var ref = firebase.database().ref('/Users').child(this.props.uid).child('Scanned_Kandies')
      ref.push(i, (res) => {
        if (res === null) {
          console.warn("sucessfully uploaded")
          this.props.PersistedKandiClear()
        }
      })
    })
  }
  render_Item = (item) => {
    return (
      <View style={styles.data}>
        <View style={{ flexDirection: "row" }}>
          <View>
            <Image
              source={{}}
              style={styles.profileImg}
            />
          </View>
          <View style={styles.txtData}>
            <Text style={styles.txt}>Undiscovered Kandi </Text>
            <Text style={[styles.txt, { fontSize: vw(13) }]}>{item}</Text>
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
      </View>
    )
  }

  render() {
    return (

      <ImageBackground
        resizeMethod={"resize"}
        resizeMode={"stretch"}
        source={index.image.offbg}
        style={styles.container}>

        <ImageBackground style={styles.bg}
          source={index.image.bgOfflineHead}
        >
          <View style={styles.head}>
            <TouchableOpacity
              onPress={() => this.props.navigation.goBack()}
            >
              <Image
                //  resizeMode={"contain"}
                style={styles.back}
                source={index.image.back}
              />
            </TouchableOpacity>
            <Text style={styles.txt}>Offline Kandies</Text>
            <TouchableOpacity
              onPress={() => this.uploadOnline()}

            >
              <Image
                style={styles.refresh}
                source={index.image.refresh}
              />
            </TouchableOpacity>
          </View>

        </ImageBackground>
        <FlatList
          data={this.props.OfflineKandies}
          renderItem={({ item }) => this.render_Item(item)}
        />
        <View>
          {/* Modal */}
          <Modal
          
           isVisible={this.state.show}
           onBackdropPress={() => this.setState({ show: false })}
          >
            <View style={styles.modal_cont}>
              <View>
                <Text style={styles.modalText1}>No Service Needed!</Text>
              </View>

              <View style={styles.modalText2}>
                <Text >No Service Needed!</Text>
              </View>

              <View style={styles.modalText3}>
                <Text>Feel free to trade them away! </Text>
              </View>
              {/* //Button */}
              <View>
                <ButtonComponent/>
                </View>
          
            </View>
          </Modal>
        </View>

      </ImageBackground>

    );
  }
};

const mapStateToProps = (state: any) => {
  return {
    uid: state.PersistReducer.uid,
    OfflineKandies: state.PersistReducer.OfflineKandies
  }

}
const mapDispatchToProps = {
  PersistOfflinekandiAction: PersistOfflinekandiAction,
  PersistedKandiClear: PersistedKandiClear
}

export default connect(mapStateToProps, mapDispatchToProps)(OfflineKandies);

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
  modal_cont:{
    width: vw(348),
    height: vh(213),
    borderRadius: vh(25),
    backgroundColor: "rgba(18, 40, 87, 0.9)",
    borderColor: index.colors.lipstick,
    borderWidth: vw(2),
    justifyContent:"center",
    alignItems: "center",
  },
  modalText1:{
    fontFamily: "Ubuntu-Bold",
    fontSize: vw(21),
    fontWeight: "bold",
    fontStyle: "normal",
    letterSpacing: 0.25,
    color: index.colors.whiteColor
  },
  modalText2:{ 
    width: vw(312),
    height: vh(51),
    fontFamily: "Ubuntu-Medium",
    fontSize: vw(15),
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0.18,
    color: index.colors.whiteColor
  },
  modalText3:{
    width: vw(206),
    height: vh(17),
    fontFamily: "Ubuntu",
    fontSize: vw(15),
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0.18,
    color: index.colors.whiteColor},

  head: {
    flexDirection: "row",
    marginTop: vh(56),
    // justifyContent:"center",
    alignItems: "center"
  },
  back: {
    width: vw(11),
    height: vh(18),
    marginLeft: vw(20)
  },
  txt: {
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
    borderRadius: vw(20),
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
