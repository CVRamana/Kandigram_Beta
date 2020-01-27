import * as React from 'react';
import { Text, View, StyleSheet, ImageBackground, LayoutAnimation, Image, UIManager, Platform, TouchableOpacity, TextInput, ScrollView, } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import index from "../../../Utils/Constants/index";
import { vw, vh } from '../../../Common/ResponsiveScreen';
import TextInputComponent from '../../../Common/TextInputComponent';
import ButtonComponent from '../../../Common/ButonComponent';
import colors from '../../../Utils/Constants/colors';
import { db } from "../../../Utils/FirebaseConfig";
import firebase from 'react-native-firebase'
import { connect } from "react-redux";


interface CreateKandiProps {
    uid: string
}

interface State {
    kandiImg: string
    kandiImgUrl: string
    kandiName: string
    event: string
    kandiDesc: string
    ispublic: boolean
    contHeight: number
    isOn: boolean
}
if (
    Platform.OS === 'android' &&
    UIManager.setLayoutAnimationEnabledExperimental
) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

class CreateKandi extends React.Component<CreateKandiProps, State> {
    constructor(props: CreateKandiProps) {
        super(props)

        this.state = {
            kandiImg: "",
            kandiImgUrl: "",
            kandiName: '',
            event: '',
            kandiDesc: '',
            ispublic: false,
            contHeight: vh(50),
            isOn: false

        };
    };

    getKandiImg = () => {

        ImagePicker.openPicker({
            cropping: true
        }).then(image => {
            console.warn(image.path);
            this.setState({ kandiImg: image.path }, () => {
                const ref = firebase.storage().ref("created_kandi_Images", this.props.uid).child("kandi_img.png")
                const uploadTask = ref.putFile(image.path)

                uploadTask.then((snap) => {
                    ref.getDownloadURL().then((data) => {
                        console.warn("download url", data)
                        this.setState({ kandiImgUrl: data })
                    })

                })
            })
        });
    }

    handleKandi = () => {
        let values = {
            kandiImage: this.state.kandiImg,
            kandi_desc: this.state.kandiDesc,
            events: this.state.event,
            kandiImgUrl: this.state.kandiImgUrl,
            ispublic: this.state.ispublic
        }
        this.setDataToFirebase(values)
    }
    setDataToFirebase = (res: any) => {
        //   alert("called")
        db.ref('/Users').child(this.props.uid).child("Created_Kandies").child("raman" + (Math.round(Math.random() * 100000000))).set(res, (val) => {
            if (val === null) {
                // this.props.navigation.navigate('Login')
                console.warn("sucess fully uploaded")
            }

        })
    }
    componentDidMount() {
        // alert(this.props.uid)
    }
    render() {
        return (
            <ImageBackground style={styles.container}>
                <ImageBackground
                    resizeMethod={"resize"}
                    resizeMode={"stretch"}
                    source={index.image.creteKandi}
                    style={styles.bg}>
                    <View style={{ flexDirection: "row", marginTop: vh(56), marginLeft: vw(16) }}>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('Home')}
                        >
                            <Image
                                style={{
                                    width: vw(21),
                                    height: vh(18),
                                }}
                                source={index.image.back}
                            />


                        </TouchableOpacity>
                        <Text style={styles.txt}>Create a Kandi</Text>
                    </View>
                </ImageBackground>
                <ScrollView style={{ paddingTop: vh(100), flex: 1, }}>
                    {/* Choose Image */}
                    {this.state.kandiImg === "" ? <View style={styles.kandiImg} >
                        <TouchableOpacity
                            onPress={() => this.getKandiImg()}
                        >
                            <Image
                                source={index.image.gallery}
                                style={{}} />
                        </TouchableOpacity>
                        <Text style={styles.AddkandiTxt}> Add Kandi Image </Text>
                    </View> :
                        <View style={styles.kandiImg} >
                            <Image
                                // resizeMode="contain"
                                style={{ height: vh(210), width: vw(343), borderRadius: vh(10) }}
                                source={{ uri: this.state.kandiImg }}
                            />
                        </View>
                    }

                    <View style={{ marginTop: vh(40), marginLeft: vw(16), marginBottom: vh(32), }}>
                        <TextInputComponent
                            commonOnChangeText={(val) => this.setState({ kandiName: val })}
                            commonPlaceholder={"Kandi Name"}
                            extraStyle={{ marginBottom: vh(32), backgroundColor: colors.textInputBGColor }}

                        />
                        {/* //Animated TextInput */}
                        <View style={{
                            backgroundColor: colors.textInputBGColor,
                            borderRadius: 22,
                            height: this.state.contHeight,
                            width: vw(338)
                        }}>
                            <TextInputComponent
                                commonOnChangeText={(val: any) => this.setState({ event: val })}
                                commonPlaceholder={"Add Event"}

                                // commonOnBlur={() => {
                                //     LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
                                //     this.setState({ isOn: false, contHeight: vh(50) })
                                // }
                                // }

                                commonOnFocus={() => {
                                    LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
                                    this.setState({ contHeight: vh(340), isOn: true })
                                }
                                    //()=>this.props.navigation.navigate('AddEvent')
                                }
                                extraStyle={{
                                    //marginBottom: vh(32)shadowColor: "#000",
                                    shadowOffset: {
                                        width: 0,
                                        height: 10,
                                    },
                                    shadowOpacity: 0.51,
                                    shadowRadius: 13.16,

                                    elevation: 10,

                                }}
                            />
                            {/* toggle View */}
                            {this.state.isOn ?
                                <View>
                                    <View style={{ marginTop: vh(20), marginLeft: vw(32) }}>
                                        <Text
                                            style={styles.lipstic}
                                            onPress={() => this.props.navigation.navigate('AddEvent')}
                                        >+ Add this Event</Text>
                                    </View>
                                    {/* plane line */}
                                    <View style={{
                                        marginTop: vh(13),
                                        marginLeft: vw(15),
                                        height: vh(4),
                                        width: vw(311),
                                        backgroundColor: "#26375a"
                                    }}>
                                    </View>
                                    {/* flatList */}
                                    <View>
                                    </View>
                                </View> : null
                            }

                        </View>
                    </View>

                    <View style={styles.inputContainer}>
                        <TextInput
                            placeholder={"Add Description"}
                            multiline={true}
                            // value={this.state.about}
                            maxLength={400}
                            onChangeText={(val) => this.setState({ kandiDesc: val })}
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
                            style={styles.inpt}
                        />
                    </View>
                    <View style={{
                        marginTop: vh(40), marginLeft: vw(16),
                        // backgroundColor:"red"
                    }}>
                        <Text style={[styles.txt, { color: "black" }]}>Privacy</Text>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        marginLeft: vw(16),
                        marginTop: vw(20)

                    }}>
                        <View style={{ height: vh(316), width: vw(176), justifyContent: "center", alignItems: "center" }}>
                            <TouchableOpacity onPress={() => this.setState({ ispublic: !this.state.ispublic })}>
                                <Image
                                    style={this.state.ispublic ? { height: vh(60), width: vw(60), } : { height: vh(60), width: vw(60), tintColor: 'red' }}
                                    source={index.image.public}
                                    resizeMode="contain"
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={{
                            height: vh(316),
                            justifyContent: "center", alignItems: "center",
                            width: vw(176)
                        }}>
                            <TouchableOpacity
                                onPress={() => this.setState({ ispublic: !(!this.state.ispublic) })}
                            >
                                <Image
                                    style={this.state.ispublic ? { height: vh(60), width: vw(60), tintColor: 'red' } : { height: vh(60), width: vw(60), }}
                                    resizeMode="contain"
                                    style={{ height: vh(60), width: vw(60) }}
                                    source={index.image.private}
                                />
                            </TouchableOpacity>
                        </View>

                    </View>
                    <View style={{ marginLeft: vw(16) }}>
                        <ButtonComponent
                            onButtonPress={() => this.handleKandi()}
                            name={"Create a Kandi"}
                            myStyle={{ borderColor: "black", marginBottom: vh(150) }}
                        />
                    </View>

                </ScrollView>
            </ImageBackground>
        );
    }
};

const mapStateToProps = (state: any) => {
    return {
        uid: state.PersistReducer.uid
    }
}
const mapDispatchToProps = {


}
export default connect(mapStateToProps, mapDispatchToProps)(CreateKandi);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#434154'

    },
    bg: {
        position: "absolute",
        top: 0,
        zIndex: 300,
        width: vw(374.6),
        height: vh(101)
    },
    lipstic: {
        fontSize: 18,
        fontWeight: "600",
        fontStyle: "normal",
        letterSpacing: 0.22,
        color: index.colors.lipstick
    },
    kandiImg: {
        width: vw(343),
        flexDirection: "row",
        height: vh(210),
        borderRadius: 10,
        marginLeft: vw(16),
        marginTop: vh(48),
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(19, 31, 52, 0.5)",
        borderStyle: "solid",
        borderWidth: 2,
        borderColor: "#515f7b"

    },
    AddkandiTxt: {
        fontSize: vw(18),
        fontWeight: "600",
        fontStyle: "normal",
        letterSpacing: 0.22,
        color: "#515f7b"
    },
    txt: {
        fontFamily: "Ubuntu-Medium",
        fontSize: vw(18),
        fontWeight: "bold",
        fontStyle: "normal",
        letterSpacing: 0.22,
        color: index.colors.whiteColor,
        marginLeft: vw(16)
    },
    inputContainer: {
        width: vw(343),
        marginLeft: vw(16),
        height: vh(172),
        borderRadius: vh(10),
        backgroundColor: "#26375a"
    },
    inpt: {
        backgroundColor: colors.textInputBGColor,
        width: vw(343),
        height: vh(172),
        paddingLeft: vw(16),
        paddingRight: vw(16),
        //backgroundColor: "transparent",
        opacity: 0.6,
        fontFamily: "Ubuntu-Medium",
        fontSize: vw(16),
        fontWeight: "500",
        fontStyle: "normal",
        letterSpacing: 0.19,
        color: colors.whiteColor
    }
});
