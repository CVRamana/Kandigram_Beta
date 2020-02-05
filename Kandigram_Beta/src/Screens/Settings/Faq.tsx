import * as React from 'react';
import { Text, View, StyleSheet, ImageBackground, Image, Platform, UIManager, LayoutAnimation, TouchableOpacity, ScrollView } from 'react-native';
import index from "../../Utils/Constants/index";
import { vw, vh } from '../../Common/ResponsiveScreen';

interface FaqProps {}

interface state {
    isExpand: boolean
    maxiheight: number
    maxiheight1: number
    maxiheight2: number
    maxiheight3: number
}

if (Platform.OS === 'android') {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }
}

class Faq extends React.Component<FaqProps, state> {
    constructor(props: FaqProps) {
        super(props)

        this.state = {
            isExpand: false,
            maxiheight: vh(80),
            maxiheight1: vh(80),
            maxiheight2: vh(80),
            maxiheight3: vh(80),
        };
    };

    manageHeight = () => {
        if (this.state.isExpand) {
            LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
            this.setState({
                maxiheight: vh(80),
                isExpand: !this.state.isExpand
            })
        } else {
            LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
            this.setState({
                maxiheight: vh(180),
                maxiheight1: vh(80),
                maxiheight2: vh(80),
                maxiheight3: vh(80),
                isExpand: !this.state.isExpand
            })
        }

    }

    render() {
        return (
            <ImageBackground
                source={{}}

                style={styles.bg}
            >
                <ImageBackground
                    resizeMethod={"resize"}
                    resizeMode={"stretch"}
                    style={styles.header}
                    source={index.image.bgOfflineHead}
                >
                    <View style={{
                        flexDirection: 'row',
                        marginTop: vh(55),
                        marginLeft: vw(16)
                    }}>
                        <TouchableOpacity
                        onPress={()=>this.props.navigation.goBack()}
                        >
                            <Image
                                resizeMode={"contain"}
                                resizeMethod="resize"
                                source={index.image.back}
                                style={{ height: vh(18), width: vw(11)}}
                            />
                        </TouchableOpacity>
                        <Text style={[styles.txt, { marginLeft: vw(16) }]}> FAQ </Text>
                    </View>

                </ImageBackground>

                <View style={{ marginTop: vh(70), paddingTop: vh(16), flex: 1, }}>
                    <ScrollView>
                        <View style={[styles.data, { marginTop: vh(30), height: this.state.maxiheight }]}>
                            <View style={styles.txtcont}>

                                <Text style={styles.txt}>Why my app is not working </Text>
                                <TouchableOpacity
                                    onPress={() => this.manageHeight()}
                                >
                                    <Image
                                        source={index.image.below}
                                        style={styles.img}
                                    />
                                </TouchableOpacity>
                            </View>

                        </View>

                        <View style={[styles.data1,{height: this.state.maxiheight1}]}>
                            <View style={styles.txtcont}>
                                <Text style={styles.txt}>How to reset password </Text>
                                <TouchableOpacity
                                    onPress={() => {
                                        LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
                                        this.setState({
                                            maxiheight1: vh(180),
                                            maxiheight:vh(80),
                                            maxiheight2:vh(80),
                                            maxiheight3:vh(80),

                                            isExpand: !this.state.isExpand
                                        })
                                    }}
                                >
                                    <Image
                                        source={index.image.below}
                                        style={[styles.img,{marginLeft:vw(90)}]}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={[styles.data2,{height: this.state.maxiheight2}]}>
                            <View style={styles.txtcont}>
                                <Text style={styles.txt}>How to upload image </Text>
                                <TouchableOpacity
                                    onPress={() => {
                                        LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
                                        this.setState({
                                            maxiheight2: vh(180),
                                            maxiheight:vh(80),
                                            maxiheight1:vh(80),
                                            maxiheight3:vh(80),
                                            isExpand: !this.state.isExpand
                                        })
                                    }}
                                >
                                    <Image
                                        source={index.image.below}
                                        style={[styles.img,{marginLeft:vw(100)}]}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={[styles.data3,{height: this.state.maxiheight3}]}>
                            <View style={styles.txtcont}>
                                <Text style={styles.txt}>How to scan Kandi band </Text>
                                <TouchableOpacity
                                    onPress={() => { LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
                                        this.setState({
                                            maxiheight3: vh(180),
                                            maxiheight2: vh(80),
                                            maxiheight:vh(80),
                                            maxiheight1:vh(80),

                                            isExpand: !this.state.isExpand
                                        })}}
                                >
                                    <Image
                                        source={index.image.below}
                                        style={[styles.img,{marginLeft:vw(80)}]}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ScrollView>
                </View>

            </ImageBackground>
        );
    }
};

export default Faq;

const styles = StyleSheet.create({
    container: {},
    header: {
        width: vw(375),
        height: vh(101),
        position: "absolute",
        top: 0,
        zIndex: 300
    }, bg: {
        backgroundColor: index.colors.darkSlateBlue75,
        flex: 1,
    },
    txtcont: {
        marginTop: vh(31),
        marginLeft: vw(16),
        flexDirection: "row",
        alignItems: "center"
    },
    data: {
        width: vw(343),
        height: vh(80),
        borderRadius: vw(10),
        backgroundColor: index.colors.darkSlateBlue75,
        borderStyle: "solid",
        borderWidth: 2,
        marginTop: vh(20),
        borderColor: "#213d79",
        marginLeft: vw(16),
    },
    data1: {
        width: vw(343),
        height: vh(80),
        borderRadius: vw(10),
        backgroundColor: index.colors.darkSlateBlue75,
        borderStyle: "solid",
        borderWidth: 2,
        marginTop: vh(20),
        borderColor: "#213d79",
        marginLeft: vw(16),
    },
    data2: {
        width: vw(343),
        height: vh(80),
        borderRadius: vw(10),
        backgroundColor: index.colors.darkSlateBlue75,
        borderStyle: "solid",
        borderWidth: 2,
        marginTop: vh(20),
        borderColor: "#213d79",
        marginLeft: vw(16),
    },
    data3: {
        width: vw(343),
        height: vh(80),
        borderRadius: vw(10),
        backgroundColor: index.colors.darkSlateBlue75,
        borderStyle: "solid",
        borderWidth: 2,
        marginTop: vh(20),
        borderColor: "#213d79",
        marginLeft: vw(16),
        marginBottom: vh(100),
       
    },
    txt: {
        fontFamily: "Ubuntu-Bold",
        fontSize: 18,
        fontWeight: "bold",
        fontStyle: "normal",
        letterSpacing: 0.22,
        color: index.colors.whiteColor
    },
    img: {
        height: vh(11),
        width: vw(18)
        ,marginLeft:vw (60)
    },
   
});
