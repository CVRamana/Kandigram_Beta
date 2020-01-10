import * as React from 'react';
import { Text, View, StyleSheet, ImageBackground, Image, ScrollView } from 'react-native';
import HeaderComponent from '../../Common/HeaderComponent';
import { widthPercentageToDP, heightPercentageToDP } from 'react-native-responsive-screen';
import { calculateWidth, calculateHeight } from '../../Common/ResponsiveScreen';
import colors from '../../Utils/Constants/colors';
import index from "../../Utils/Constants/index";
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import CommonBackButton from '../../Common/CommonBackButton';
import ButtonComponent from '../../Common/ButonComponent';
//import { ScrollView } from 'react-native-gesture-handler';
import firebase from 'react-native-firebase'

interface ProfileProps { }

class Profile extends React.Component {
    constructor(props) {
      super(props)
    
      this.state = {
         about:"",currentUser:"",
      };
    };
    
    componentDidMount() {
        const { currentUser } = firebase.auth()
        this.setState({ currentUser })
    }

    render() {
     
        return (
            <ImageBackground style={styles.container}>
                <HeaderComponent
                />
                <ScrollView

                    style={{
                        marginTop: 240,
                        //backgroundColor:'red',
                        flex: 1
                    }}
                >
                    <View style={{ height: 1050 }}>
                        {/* <ScrollView> */}
                        <ImageBackground
                            // source={index.image.} 
                            style={styles.coverImage}
                        >
                            <View style={styles.galleryContainer}>
                                <Image
                                    resizeMode="contain"
                                    style={styles.gallery}
                                    source={index.image.gallery}
                                />
                                <Text style={styles.coverText}>Add Cover Image
                        </Text>
                            </View>
                            <ImageBackground
                                source={index.image.profile}
                                style={styles.profileImg}
                            >
                                <Image source={index.image.edit}
                                    style={styles.edit}
                                />

                            </ImageBackground >

                            <Text style={styles.addBio}>Add Bio </Text>
                            <View style={styles.describeStyle}>
                                <TextInput
                                    multiline={true}
                                    value={this.state.about}
                                    maxLength={400}
                                    onChangeText={(val)=>this.setState({about:val})}
                                    placeholder="Describe Yourself"
                                    placeholderTextColor={colors.whiteColor}
                                    placeholderStyle={{
                                        opacity: 1,
                                        fontSize: 19,
                                        fontWeight: "500",
                                        fontStyle: "normal",
                                        letterSpacing: 0.19,
                                        color: colors.whiteColor,
                                        zindex: 100
                                    }}
                                    style={styles.TextStyle} />
                                <Text style={{
                                    marginLeft: 310, opacity: 0.6,
                                    fontFamily: "Ubuntu-Medium",
                                    fontSize: 14,
                                    fontWeight: "normal",
                                    fontStyle: "normal",
                                    letterSpacing: 0.17,
                                    color: colors.whiteColor
                          }}>{this.state.about.length}/400 </Text>

                            </View>
                            <TouchableOpacity style={styles.Social_Button}>

                            </TouchableOpacity>

                            <TouchableOpacity style={[styles.Social_Button,{marginBottom: 48}]}>

                            </TouchableOpacity>
                            <ButtonComponent/>

                        </ImageBackground>

                    </View>
                </ScrollView>
            </ImageBackground>
        );
    };
}

export default Profile;

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: 'rgb(19,31,52)'


    },
    coverImage:
    {
        width: widthPercentageToDP(calculateWidth(343)),
        height: heightPercentageToDP(calculateHeight(210)),
        marginLeft: widthPercentageToDP(calculateWidth(16)),
        marginTop: heightPercentageToDP(calculateHeight(50)),
        borderRadius: 10,
        backgroundColor: "rgba(18, 40, 87, 0.7)",
        borderStyle: "solid",
        borderWidth: 2,
        borderColor: "#515f7b"
    },
    gallery: {

        height: 40,
        width: 40,
        marginRight: 17,
        // backgroundColor:"red"
    },
    galleryContainer: {
        marginTop: 48,
        marginLeft: 71,
        flexDirection: "row",
        // justifyContent:"center",
        alignItems: "center"
        //backgroundColor:"red"
    },
    coverText: {
        opacity: 0.4,
        fontFamily: "Ubuntu",
        fontSize: 18,
        fontWeight: "500",
        fontStyle: "normal",
        letterSpacing: 0.22,
        color: colors.whiteColor
    },
    profileImg: {
        height: heightPercentageToDP(calculateHeight(100)),
        width: widthPercentageToDP(calculateWidth(100)),
        marginTop: heightPercentageToDP(calculateHeight(90)),
        marginLeft: widthPercentageToDP(calculateWidth(118))

    },
    edit: {
        height: widthPercentageToDP(calculateWidth(40)),
        width: widthPercentageToDP(calculateWidth(40)),
        marginTop: heightPercentageToDP(calculateHeight(60)),
        marginLeft: widthPercentageToDP(calculateWidth(60))

    }, addBio: {
        marginTop: 40, marginLeft: 16,
        fontFamily: "Ubuntu-Medium",
        fontSize: 18,
        fontWeight: "500",
        fontStyle: "normal",
        letterSpacing: 0.19,
        color: "#e2e2e2"
    },
    describeStyle: {
        height: widthPercentageToDP(calculateWidth(133)),
        width: widthPercentageToDP(calculateWidth(340)),
        marginTop: heightPercentageToDP(calculateHeight(13)),
        flexDirection: "column",

        borderRadius: 10,
        backgroundColor: "rgba(18, 40, 87, 0.7)",
        borderStyle: "solid",
        borderWidth: 2,
        borderColor: "#213d79",
        //  paddingBottom: 23,

    },
    TextStyle: {
        height: widthPercentageToDP(calculateWidth(110)),
        width: widthPercentageToDP(calculateWidth(340)),
        paddingLeft: 16,
        backgroundColor: "transparent",
        opacity: 0.6,
        fontFamily: "Ubuntu-Medium",
        fontSize: 16,
        fontWeight: "500",
        fontStyle: "normal",
        letterSpacing: 0.19,
        color: colors.whiteColor
        // backgroundColor:"grey"

    },
    Social_Button: {
        height: widthPercentageToDP(calculateWidth(80)),
        width: widthPercentageToDP(calculateWidth(340)),
        marginTop: 20,
      //  marginBottom: 48,
        borderRadius: 10,
        backgroundColor: "rgba(18 ,40, 87, 0.75)",
        borderStyle: "solid",
        borderWidth: 2,
        borderColor: "#213d79"
    }
});
