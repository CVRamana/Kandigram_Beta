import * as React from 'react';
import { Text, View, StyleSheet, ImageBackground, Image, ScrollView, Alert } from 'react-native';
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
import { vh, vw } from "../../Common/ResponsiveScreen";
import { connect } from "react-redux"
import firebase from 'react-native-firebase'
import { db } from "../../Utils/FirebaseConfig";
import ImagePicker from 'react-native-image-crop-picker';
import { PersistCoverImgAction, PersistProfileImgAction, PersistAction } from "../../ReduxPersist/PersistAction";
import { number } from 'prop-types';

interface ProfileProps {
    navigation: any
    uid: string
    PersistCoverImgAction: Function
    PersistProfileImgAction: Function
    coverImg: string
    profileImg: string
}
interface State {
    about: string
    currentUser: string
    coverImgPath: string
    ProfileImageStatus: boolean
    profilePic: string
    picCon: boolean
    profileUrl: string
    coverUrl: string
}
var profile = ""
class Profile extends React.Component<ProfileProps, State> {
    constructor(props: ProfileProps) {
        super(props)

        this.state = {
            about: "",
            currentUser: "",
            coverImgPath: '',
            ProfileImageStatus: false,
            profilePic: '',
            picCon: false,
            profileUrl: "",
            coverUrl: "",
            

        };
    };

    componentDidMount() {
        const { currentUser } = firebase.auth()
       
        const self = this;
        var ref = firebase.database().ref("/Users").child(this.props.uid);
        ref.on("value", function (snapshot) {
            console.log(snapshot._value.ProfileImage);
            snapshot._value.ProfileImage;
            self.props.PersistProfileImgAction(snapshot._value.ProfileImage)
            self.props.PersistCoverImgAction(snapshot._value.coverImage)

            debugger
        }, function (error) {
            console.log("Error: " + error.code);

        });

    }
    // to clear the Database


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
                            this.props.PersistCoverImgAction(data)
                            this.setState({
                                ProfileImageStatus: false,
                                coverUrl: data
                            })
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
                            this.props.PersistProfileImgAction(data)
                            this.setState({
                                ProfileImageStatus: false,
                                profileUrl: data
                            })
                            this.updateTheUserNode(this.props.uid, {
                                "ProfileImage": data,

                            })
                        })
                    })
                })
            });

    }
    onProfileSubmit = () => {
        this.updateTheUserNode(this.props.uid, { about_us: this.state.about })
        this.props.navigation.navigate("Home")
    }

    //update the usernode
    updateTheUserNode = (uid: string, obj: Object) => {
        console.warn("#obj" + obj)
        db.ref('/Users').child(uid).update(obj, (result) => {
            console.warn("incoming result:" + "null means OKK")
        })
    }


    render() {
        console.warn('')
        return (
            <ImageBackground source={{}} style={styles.container}>
                <HeaderComponent
                    firstText={"Create"}
                    secondText={"Your Profile"}
                   // handleClick={() => this.props.navigation.navigate('CreateKandi')}
                />
                <ScrollView
                    style={{
                        flex: 1
                    }}
                >
                    <View style={{ paddingTop: vh(200) }}>
                        <View style={{
                            width: vw(343),
                            height: vh(210),
                            borderRadius: vw(10),
                            flexDirection: 'row',
                            backgroundColor:"rgba(18, 40 ,87 ,0.7)",
                            marginTop: vh(40),
                            marginLeft: vw(16),

                        }}
                        >
                            {

                                this.props.coverImg === undefined ?
                                    <View style={{
                                        flexDirection: 'row',
                                         alignItems: "center",
                                        marginTop: vh(-55),
                                        marginLeft: vw(70)
                                    }}>
                                        <Image
                                            resizeMode="stretch"
                                            resizeMethod={"resize"}
                                            style={styles.gallery}
                                            source={index.image.gallery}
                                        />
                                        <Text style={styles.coverText}> Add Cover Image. </Text>
                                    </View> 
                                    :
                                    <View  style={{
                                        width: vw(343),
                                        height: vh(210),
                                       // backgroundColor: "green",
                                        borderRadius: vw(10),
                                        overflow: "hidden",
                                       
                                    }}>
                                        <Image
                                        source={{uri:this.props.coverImg}}
                                        style={{flex: 1,height:null,width:null}}
                                        />
                                    </View>

                            }
                            <View
                            style={{
                                position:"absolute",
                                top:vh(20),
                                right:vh(20)
                            }}
                            >
                            <TouchableOpacity
                                style={{
                                    height: vh(40),
                                    alignSelf: 'flex-end',
                                 
                                    width: vh(40),
                                    borderRadius: vh(20),
                                    overflow: "hidden",
                                    zIndex: 700
                                }}
                                onPress={()=>this.opengallery()}>
                                <Image
                                    source={index.image.edit}
                                    style={{ flex: 1, height: null, width: null }}

                                />
                            </TouchableOpacity>
                            </View>
                        </View>
                        {/* Profile picture */}
                        <View style={styles.profileCont}>
                            {
                                this.props.profileImg === undefined ?
                                    <Image
                                        source={index.image.profile}
                                        style={styles.profileImg}
                                    />
                                    :
                                    <Image
                                        source={{ uri: this.props.profileImg }}
                                        style={styles.profileImg}
                                    />
                            }
                            {/* <Image
                                source={this.props.profileImg === "" ? index.image.profile : { uri: this.props.profileImg }}
                                style={styles.profileImg}
                            >
                            </Image > */}
                            <View style={{ marginTop: vh(-25), marginLeft: vw(-20), zIndex: 300 }}>
                                <TouchableOpacity
                                    style={styles.edit}
                                    activeOpacity={1}
                                    onPress={() => this.selectProfilePic()} >
                                    <Image source={index.image.edit}
                                        style={styles.edit}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>

                        <Text style={styles.addBio}>Add Bio </Text>
                        <View style={{ marginLeft: vw(18) }}>
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
                                <Text style={styles.count_cont}>{this.state.about.length}/400 </Text>

                            </View>

                            <TouchableOpacity
                                onPress={() => this.props.navigation.navigate("Settings")}
                                style={styles.Social_Button}>

                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[styles.Social_Button, { marginBottom: vh(48) }]}
                                onPress={() => alert(this.props.navigation.navigate('ProfileGallery'))}

                            >

                            </TouchableOpacity>
                            <ButtonComponent
                                name="Create Profile"
                                onButtonPress={() => this.onProfileSubmit()

                                }
                            />
                        </View>
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
    cover_cont: {
        overflow: "hidden",
        width: widthPercentageToDP(calculateWidth(343)),
        height: heightPercentageToDP(calculateHeight(210)),
        marginLeft: widthPercentageToDP(calculateWidth(16)),
        marginTop: heightPercentageToDP(calculateHeight(50)),
        borderRadius: vw(30),
        backgroundColor: "rgba(18, 40, 87, 0.7)",
        borderStyle: "solid",
        borderWidth: 2,
        borderColor: "#515f7b"
    },
    coverImage:
    {
        height: null,
        width: null,
        flex: 1,


    },
    profileCont: {
        marginTop: vh(-160),
        marginLeft: vw(20),
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 9,
        },
        shadowOpacity: 0.48,
        shadowRadius: 11.95,
        elevation: 18,
    },
    gallery: {
        height: vh(40),
        width: vw(40),
        marginRight: vw(17),
    },
    galleryContainer: {
        marginTop: vh(48),
        marginLeft: vw(71),
        flexDirection: "row",
        alignItems: "center"

    },
    count_cont: {
        marginLeft: vw(290), opacity: 0.6,
        fontFamily: "Ubuntu-Medium",
        fontSize: vw(14),
        fontWeight: "normal",
        fontStyle: "normal",
        letterSpacing: 0.17,
        color: colors.whiteColor
    },
    coverText: {
        opacity: 0.4,
        fontFamily: "Ubuntu",
        fontSize: vw(18),
        fontWeight: "500",
        fontStyle: "normal",
        letterSpacing: 0.22,
        color: colors.whiteColor
    },
    profileImg: {
        height: vh(120),
        width: vh(120),
        marginTop: heightPercentageToDP(calculateHeight(90)),
        marginLeft: widthPercentageToDP(calculateWidth(118)),
        backgroundColor: "grey",
        zIndex: 300,
        borderRadius: vh(60)
        // widthPercentageToDP(calculateWidth(50))

    },
    edit: {

        height: widthPercentageToDP(calculateWidth(40)),
        width: widthPercentageToDP(calculateWidth(40)),
        //  marginTop: heightPercentageToDP(calculateHeight(100)),
        marginLeft: widthPercentageToDP(calculateWidth(100)),
        // zIndex: 300

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
        uid: state.PersistReducer.uid,
        coverImg: state.PersistReducer.coverImg,
        profileImg: state.PersistReducer.profileImg,
    }
}
const mapDispatchToProps = {
    PersistAction: PersistAction,
    PersistCoverImgAction: PersistCoverImgAction,
    PersistProfileImgAction: PersistProfileImgAction,

}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);