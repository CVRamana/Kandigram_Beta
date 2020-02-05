import * as React from 'react';
import { Text, View, StyleSheet, ImageBackground, TextInput, Image, FlatList } from 'react-native';
import index from "../../../Utils/Constants/index";
import { vw, vh } from '../../../Common/ResponsiveScreen';

interface DiscoverProps {
    navigation: any
}

class Discover extends React.Component<DiscoverProps> {
    constructor(props: DiscoverProps) {
        super(props)

        this.state = {

        };
    };

    render() {
        return (
            <ImageBackground
                source={index.image.eventBg}
                style={styles.container}>
                <ImageBackground
                    resizeMode={"stretch"}
                    resizeMethod={'resize'}
                    source={index.image.HomeBG}
                    style={styles.discBG}
                >
                    <View style={styles.header}>
                        <Text style={styles.txt}> Discover</Text>
                        <View style={styles.inputt}>
                            <View style={styles.searchCont}>
                                <Image
                                    resizeMode={'contain'}
                                    resizeMethod={'resize'}
                                    source={index.image.search}
                                    style={{ height: vh(33), tintColor: "grey" }}
                                />
                            </View>
                            <TextInput
                                style={styles.tinput}
                                onFocus={
                                   
                                    () => this.props.navigation.navigate('Events_People')
                                }
                            />
                        </View>
                    </View>
                </ImageBackground>
                <View style={{ marginTop: vh(190), marginLeft: vw(16) }}>
                    <Text
                        style={styles.txt}
                    > Trending Events</Text>
                </View>


                <View>
                    <FlatList
                        data={[{}, {}, {}, {}]}
                        horizontal={true}
                        renderItem={({ item }) => {
                            return (
                                <View style={styles.render}>

                                </View>
                            )
                        }}
                    />
                </View >

                <View style={styles.coll}>
                    <FlatList style={{ margin: 5 }}
                        data={[{},{},{},{},{},{},{},{},{},{},{},{},{},{}]}
                        numColumns={3}
                        keyExtractor={(item, index) => item.id}
                        renderItem={(item) => {
                            return(
                                <View style={styles.card}>
                                    </View>
                            )
                        }}
                    />
                </View>

            </ImageBackground>
        );
    }
};

export default Discover;

const styles = StyleSheet.create({
    coll: {
        marginTop: vh(42),
       // backgroundColor: "red",
       flex: 1,
        alignItems:"baseline"

    },
    card:{
        width: vw(101),
        height: vh(101),
        marginLeft: vw(16),
      borderRadius:vw(10),
        marginBottom: vh(12),
        backgroundColor:"grey"
    },
    container: {
        flex: 1,
        paddingTop: 50,
    },
    render: {
        width: vw(102),
        height: vh(40),
        marginTop: vh(21),
        marginLeft: vw(16),
        borderRadius: vw(8),
        backgroundColor: index.colors.darkSlateBlue75,
        borderStyle: "solid",
        borderWidth: vw(2),
        borderColor: "#213d79"
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
        fontSize: vw(18),
        fontWeight: "bold",
        fontStyle: "normal",
        letterSpacing: 0.29,
        color: index.colors.whiteColor
    },
    searchCont: {
        marginLeft: vw(10),
        height: vh(48), width: vw(50),
        backgroundColor: "transparent",
        justifyContent: "center",
        alignItems: "center"
    }
});
