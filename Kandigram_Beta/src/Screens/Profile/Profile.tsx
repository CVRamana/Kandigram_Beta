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
import AsyncStorage from '@react-native-community/async-storage'
import { connect } from "react-redux"
import firebase from 'react-native-firebase'
import { db } from "../../Utils/FirebaseConfig";
import ImagePicker from 'react-native-image-crop-picker';
import { PersistCoverImgAction,PersistProfileImgAction,PersistAction } from "../../ReduxPersist/PersistAction";

interface ProfileProps { }

class Profile extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            about: "", currentUser: "",
            coverImgPath: '',
            ProfileImageStatus: false,
            profilePic: '',
            picCon: false
        };
    };

    componentDidMount() {
        const { currentUser } = firebase.auth()
        this.setState({ currentUser })
        this.clearAsyncStorage()
        alert(JSON.stringify(this.props.uid))
        debugger
    }
// to clear the Database
    clearAsyncStorage = async () => {
        alert("called")
        await AsyncStorage.clear();
    }

    //gallery
    opengallery = () => {
        ImagePicker.openPicker({ cropping: true })
            .then(image => {
                // console.warn(image.path);
                this.setState({ coverImgPath: image.path }, () => {

                    this.setState({ ProfileImageStatus: true })
                    const ref = firebase.storage().ref("" + this.props.uid).child("coverImage.jpg")
                    const uploadtask = ref.putFile(image.path)
                    uploadtask.then((snap) => {
                        ref.getDownloadURL().then((data) => {
                            console.warn("image url=>", data)
                            this.setState({ ProfileImageStatus: false })
                            this.updateTheUserNode(this.props.uid, { "coverImage": data })
                        })
                    })
                })
            });
    }

    //profile pic
    selectProfilePic = () => {
        ImagePicker.openPicker({ cropping: true })
            .then(image => {
                console.warn("profile pic path", image.path);
                this.setState({ profilePic: image.path }, () => {

                    this.setState({ ProfileImageStatus: true })
                    const ref = firebase.storage().ref("" + this.props.uid).child("profileImage.jpg")
                    const uploadtask = ref.putFile(image.path)
                    
                    uploadtask.then((snap) => {
                        ref.getDownloadURL().then((data) => {
                            console.warn(" profile image url=>", data)
                            this.setState({ ProfileImageStatus: false })
                            this.updateTheUserNode(this.props.uid, { "ProfileImage": data })
                        })
                    })
                })
            });

    }

    //update the usernode
    updateTheUserNode = (uid, obj) => {
        console.warn("#obj" + obj)
        db.ref('/Users').child(uid).update(obj, (result) => {
            console.warn("incoming result:" + JSON.stringify(result),"null means OKK")

        })
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
                             source={ this.state.coverImgPath === "" ? null : {uri:this.state.coverImgPath}  } 
                            style={styles.coverImage}
                        >
                            <TouchableOpacity
                                onPress={() => this.opengallery()}
                                style={styles.galleryContainer}>
                                {this.state.coverImgPath === "" ?
  
                                <View style={{flexDirection: 'row',alignItems:"center"}}>
                                    <Image
                                        resizeMode="contain"
                                        style={styles.gallery}
                                        source={index.image.gallery}
                                    />  
                                     <Text style={styles.coverText}> Add Cover Image. </Text>
                                     </View>
                                    : null
                                   
                                }
                              
                            </TouchableOpacity>
                            {/* Profile picture */}
                            <ImageBackground
                                source={this.state.profilePic === "" ? index.image.profile :{ uri:this.state.profilePic}}
                                style={styles.profileImg}
                            >
                                <TouchableOpacity onPress={() => this.selectProfilePic()} >
                                    <Image source={index.image.edit}
                                        style={styles.edit}
                                    />
                                </TouchableOpacity>

                            </ImageBackground >

                            <Text style={styles.addBio}>Add Bio </Text>
                            <View style={styles.describeStyle}>
                                <TextInput
                                    multiline={true}
                                    value={this.state.about}
                                    maxLength={400}
                                    onChangeText={(val) => this.setState({ about: val })}
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

                            <TouchableOpacity style={[styles.Social_Button, { marginBottom: 48 }]}>

                            </TouchableOpacity>
                            <ButtonComponent
                            onButtonPress={()=>this.props.navigation.navigate('ForgetPassword')}
                             />

                        </ImageBackground>

                    </View>
                </ScrollView>
            </ImageBackground>
        );
    };
}



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
        borderRadius: 30,
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
        marginLeft: widthPercentageToDP(calculateWidth(118)),
       // backgroundColor: "red",
        zIndex: 300,
        borderRadius:widthPercentageToDP(calculateWidth(50))

    },
    edit: {
        height: widthPercentageToDP(calculateWidth(40)),
        width: widthPercentageToDP(calculateWidth(40)),
        marginTop: heightPercentageToDP(calculateHeight(60)),
        marginLeft: widthPercentageToDP(calculateWidth(60)),
        zIndex:300

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
const mapStateToProps = (state: any) => {
    return {
        uid: state.PersistReducer.uid
    }
}
const mapDispatchToProps={
    PersistAction:PersistAction,
    PersistCoverImgAction:PersistCoverImgAction,
    PersistProfileImgAction:PersistProfileImgAction,
    
}

export default connect(mapStateToProps,mapDispatchToProps)(Profile);