import * as React from 'react';
import { Text, View, StyleSheet, ImageBackground, TextInput, Image } from 'react-native';
import index from "../../Utils/Constants/index";
import { vw, vh } from '../../Common/ResponsiveScreen';

interface DiscoverProps { }

class Discover extends React.Component {
    render() {
        return (
            <ImageBackground
                source={index.image.eventBg}
                style={styles.container}>
                <ImageBackground

                    source={index.image.HomeBG}
                    style={styles.discBG}
                >
                    <View style={styles.header}>
                        <Text style={styles.txt}> Discover</Text>
                        <View style={styles.inputt}>
                            <View style={{
                                marginLeft: vw(10),
                                height: vh(48), width: vw(50), backgroundColor: "transparent", justifyContent: "center", alignItems: "center"
                            }}>
                                <Image
                                    resizeMode={'contain'}
                                    resizeMethod={'resize'}
                                    source={index.image.search}
                                    style={{ height: vh(33), tintColor: "grey" }}
                                />
                            </View>
                            <TextInput
                                style={styles.tinput}
                            />
                        </View>
                    </View>
                </ImageBackground>
                <View style={{marginTop:vh(40)}}>
                     <Text 
                     style={styles.txt}
                     > Trending Events</Text>
                </View>
            </ImageBackground>
        );
    }
};

export default Discover;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
    },
    discBG: {
        position: "absolute",
        top: 0,
        zIndex: 300,
        width: "100%",
        height: vh(221)
    },
    header: {
        marginLeft: vw(16),
        marginTop: vh(57)
    },
    inputt: {
        flexDirection: "row",
        width: vw(343),
        height: vh(48),
        marginTop: vh(33),
        borderRadius: vw(100),
        backgroundColor: index.colors.whiteColor,

    },
    tinput: {
        width: vw(300),
        height: vh(48),

        borderRadius: vw(100),
        paddingRight: vw(20)



    },
    txt: {
        fontFamily: "Ubuntu-Bold",
        fontSize: vw(24),
        fontWeight: "bold",
        fontStyle: "normal",
        letterSpacing: 0.29,
        color: index.colors.whiteColor
    }
});
