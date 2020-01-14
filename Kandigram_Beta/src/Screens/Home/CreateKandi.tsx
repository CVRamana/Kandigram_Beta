import * as React from 'react';
import { Text, View, StyleSheet, ImageBackground, Image, TouchableOpacity, TextInput, ScrollView, } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import index from "../../Utils/Constants/index";
import { vw, vh } from '../../Common/ResponsiveScreen';
import TextInputComponent from '../../Common/TextInputComponent';
import ButtonComponent from '../../Common/ButonComponent';
import colors from '../../Utils/Constants/colors';
import { db } from "../../Utils/FirebaseConfig";
import firebase from 'react-native-firebase'



interface CreateKandiProps { }

class CreateKandi extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            kandiImg: "",
            kandiImgUrl: "",
            kandiName: '',
            event: '',
            kandiDesc: '',
            ispublic: false

        };
    };

    getKandiImg = () => {

        ImagePicker.openPicker({
            cropping: true
        }).then(image => {
            console.warn(image.path);
            this.setState({ kandiImg: image.path }, () => {
                const ref = firebase.storage().ref("created_kandi_Images", "creater_UID").child("kandi_img.png")
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
            kandi_name: this.state.kandName,
            kandiImage: this.state.kandiImg,
            kandi_desc: this.state.kandiDesc,
            events: this.state.event,
            kandiImgUrl: this.state.kandiImgUrl
        }
        this.setDataToFirebase(values)
    }
    setDataToFirebase = (res) => {
        alert("called")
        db.ref('/created_Kandies').child("creater_uid").set(res, (val) => {
            if (val === null) {
                // this.props.navigation.navigate('Login')
                console.warn("sucess")
            }

        })
    }

    render() {
        return (
            <ImageBackground style={styles.container}>
                <ImageBackground
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
                <ScrollView style={{ paddingTop: 100, flex: 1, }}>
                    {/* Choose Image */}
                    {this.state.kandiImg === "" ? <View style={styles.kandiImg} >
                        <TouchableOpacity
                            onPress={() => this.getKandiImg()}
                        >
                            <Image
                                source={index.image.gallery}
                                style={{}} />
                        </TouchableOpacity>
                        <Text style={{
                            fontSize: 18,
                            fontWeight: "600",
                            fontStyle: "normal",
                            letterSpacing: 0.22,
                            color: "#515f7b"
                        }}> Add Kandi Image </Text>
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
                            extraStyle={{ marginBottom: vh(32), }}

                        />
                        <TextInputComponent
                            commonOnChangeText={(val) => this.setState({ event: val })}
                        />
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
                                    style={this.state.ispublic ? { height: vh(60), width: vw(60), } : { height: vh(60), width: vw(60),tintColor:'red' }}
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
                            onPress={() => this.setState({ ispublic: !(!this.state.ispublic)})}
                            >
                                <Image
                                     style={this.state.ispublic ? { height: vh(60), width: vw(60),tintColor:'red' } : { height: vh(60), width: vw(60), }}
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

export default CreateKandi;

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    bg: {
        position: "absolute",
        top: 0,
        zIndex: 300,
        width: vw(374.6),
        height: vh(101)
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
    txt: {
        fontFamily: "Ubuntu-Medium",
        fontSize: 18,
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
        backgroundColor: "transparent",
        width: vw(343),
        height: vh(172),
        paddingLeft: vw(16),
        paddingRight: vw(16),
        //backgroundColor: "transparent",
        opacity: 0.6,
        fontFamily: "Ubuntu-Medium",
        fontSize: 16,
        fontWeight: "500",
        fontStyle: "normal",
        letterSpacing: 0.19,
        color: colors.whiteColor
    }
});
