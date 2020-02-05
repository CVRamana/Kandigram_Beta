import * as React from 'react';
import { Text, View, StyleSheet, ImageBackground, Image, TouchableOpacity, LayoutAnimation, FlatList } from 'react-native';
import { vh, vw, calculateWidth, calculateHeight } from '../../Common/ResponsiveScreen';

import index from "../../Utils/Constants/index";

import { widthPercentageToDP, heightPercentageToDP } from 'react-native-responsive-screen';

import colors from '../../Utils/Constants/colors';

import { connect } from "react-redux";

import { db } from "../../Utils/FirebaseConfig";

interface ProfileGalleryProps {
    navigation: any
}
interface state {
    isleft: boolean
}


class ProfileGallery extends React.Component<ProfileGalleryProps, state> {
    constructor(props: ProfileGalleryProps) {
        super(props)

        this.state = {
            isleft: true
        };
    };

    componentDidMount() {

    }

    render() {
        return (
            <View style={styles.container}>
                <ImageBackground
                    resizeMode={"stretch"}
                    resizeMethod={"resize"}
                    source={index.image.welcome_bg}
                    style={styles.imgBG}
                >
                    <View style={{ marginTop: vh(50), marginLeft: vw(323) }}>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('Settings')}
                        >
                            <Image
                                resizeMethod={"resize"}
                                resizeMode={"contain"}
                                source={index.image.setting}
                                style={styles.setting}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.proCont}>
                        <View style={{ justifyContent: "center" }}>
                            <Image
                                style={styles.pro}
                                source={{}}
                            />
                            <Text style={[styles.tabTxt, { marginTop: vh(10) }]}>Nitish Kumar </Text>
                        </View>
                    </View>
                </ImageBackground>
                <View style={styles.kandiCont}>
                    <View style={{ alignItems: "center" }}>
                        <Text style={styles.tabTxt}>58</Text>
                        <Text style={styles.tabTxt}>kandi created
                        </Text>
                    </View>
                    <View style={{ alignItems: "center" }}>
                        <Text style={styles.tabTxt}>58</Text>
                        <Text style={styles.tabTxt}>
                            kandi Discovered
                        </Text>
                    </View>
                </View>

                {/* TOGGLE BUTOTON */}
                <View>
                    <View style={styles.tab}>
                        {/* for the text */}
                        <TouchableOpacity
                            style={styles.btnTxt}
                            activeOpacity={1}
                            onPress={() => {
                                LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
                                this.setState({ isleft: !this.state.isleft },
                                    //()=>this.props.navigation.navigate('Discover')
                                )
                            }
                            }
                        >
                            <Text style={styles.tabTxt}>Gallery </Text>
                            <Text style={styles.tabTxt}>About </Text>
                        </TouchableOpacity >
                        {/* button View */}
                        
                        {
                            this.state.isleft ?
                                <View style={[styles.btnCont, { marginLeft: vw(175) }]}>
                                    <Text style={[styles.tabTxt, { color: index.colors.lipstick }]}>About</Text>
                                </View>
                                :
                                <View style={[styles.btnCont, { marginLeft: vw(-1) }]}>
                                    <Text style={[styles.tabTxt, { color: index.colors.lipstick }]}>Gallery</Text>
                                </View>
                        }
                    </View>
                </View>
                {/* //Screen Render */}
                <View style={styles.screens}>
                    {
                        this.state.isleft ?
                            //about us
                            <View style={{ padding: vh(10), }}>

                                <Text>{index.strings.about} </Text>
                            </View> :
                            //gallery
                            <View>
                                <FlatList

                                />

                            </View>
                    }
                </View>

            </View>
        );
    }
};
const mapStateToProps = (state: any) => {
    return {

    }
}
const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileGallery);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.darkSlateBlue75
    },
    screens: {
        width: vw(343),
        height: vh(220),
        marginTop: vh(12),
        marginLeft: vw(16),
        // backgroundColor: "grey"
    },
    btnCont: {
        width: vw(164),
        height: vh(48),
        borderRadius: 10000,
        position: "absolute",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: index.colors.whiteColor
    },

    imgBG: {
        width: '100%',
        height: vh(350)
    },
    setting: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,

        elevation: 12,
    },
    kandiCont: {
        width: vw(335),
        height: vh(68),
        marginTop: vh(16),
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "space-around",
        opacity: 0.9,
        marginLeft: vw(20),
        backgroundColor: "#26375a"
    },
    pro: {
        height: vh(80),
        width: vh(80),
        backgroundColor: "grey",
        borderRadius: vh(40)
    },
    proCont: {
        marginLeft: vw(144),
        marginTop: vh(160)
    },
    tab: {
        width: widthPercentageToDP(calculateWidth(343)),
        marginLeft: vw(16),
        flexDirection: "row",
        marginTop: heightPercentageToDP(calculateHeight(26)),
        height: heightPercentageToDP(calculateHeight(54)),
        borderRadius: 1000,
        backgroundColor: "transparent",
        borderColor: colors.whiteColor,
        // borderWidth: vw(3)
    },
    tabTxt: {
        fontFamily: "Ubuntu-Medium",
        fontSize: vw(16),
        fontWeight: "bold",
        fontStyle: "normal",
        letterSpacing: 0.19,
        color: colors.whiteColor
    },
    btnTxt: {
        width: vw(335),
        height: vh(45),
        borderRadius: 1000,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        backgroundColor: "transparent",
    },
});
