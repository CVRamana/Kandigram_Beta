import * as React from 'react';
import { Text, View, StyleSheet, ImageBackground, Image, FlatList } from 'react-native';
import index from "../../Utils/Constants/index";
import { vw, vh } from '../../Common/ResponsiveScreen';


interface NotificationsProps { }

class Notifications extends React.Component<NotificationsProps> {
    constructor(props: NotificationsProps) {
        super(props)

        this.state = {
            //data=[]


        };
    };

    render() {
        return (
            <ImageBackground

                source={index.image.eventBg}
                style={styles.container}>
                <ImageBackground
                    resizeMethod={"resize"}
                    resizeMode="stretch"
                    source={index.image.HomeBG}
                    style={styles.Bg}>

                    <View
                        style={{ marginTop: vh(54), marginLeft: vw(16) }}>
                        <Text style={styles.txt} >Notifications  </Text>
                    </View>
                </ImageBackground>
                <View style={styles.list}>
                    <FlatList

                        data={[{}, {}, {}, {}, {}]}
                        renderItem={({ item }) => {
                            return (
                                <View style={{
                                    width: vw(320),
                                    height: vh(88),
                                    borderRadius: vw(10),
                                    opacity: 0.75,
                                    marginLeft: vw(40),
                                    backgroundColor: index.colors.darkSlateBlue75,
                                    marginBottom: vh(16)
                                }}>
                                    <View
                                        style={{ flexDirection: "row" }}
                                    >
                                        <View style={{ marginTop: vh(12), marginLeft: vh(-24) }}>
                                            <Image
                                                source={index.image.profile}
                                                style={{ height: vh(50), width: vh(50), borderRadius: vh(25), backgroundColor: "red" }}
                                            />
                                        </View>
                                        <View style={{}}>
                                            <View style={{
                                                width: vw(280),
                                                height: vh(48),
                                                marginTop: vh(12),
                                                marginLeft: vw(12),
                                                backgroundColor: "grey"
                                            }}>
                                                <Text> </Text>
                                                <Text> </Text>
                                            </View>
                                            <View style={{
                                                width: vw(55),
                                                height: vh(14),
                                               marginLeft:vw(223),
                                                backgroundColor: "lightgrey"
                                            }}>
                                            </View>
                                        </View>

                                    </View>

                                </View>
                            )
                        }}
                    />

                </View>

            </ImageBackground>
        );
    }
};

export default Notifications;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    list: {
        height: vh(700),
        width: '100%',
        //  backgroundColor:"red",
        position: "absolute",
        top: vh(100)

    },
    Bg: {
        // position: "absolute",
        // top: 0,
        width: vw(375),
        height: vh(250),
        // zIndex: 200
    }, txt: {
        fontFamily: 'Ubuntu-Medium',
        fontSize: 24,
        fontWeight: "bold",
        fontStyle: "normal",
        letterSpacing: 0.29,
        color: index.colors.whiteColor
    }
});

