import * as React from 'react';
import { Text, View, StyleSheet, ImageBackground, Image } from 'react-native';
import index from "../../Utils/Constants/index";
import { vw, vh } from '../../Common/ResponsiveScreen';

interface NotificationsProps { }

class Notifications extends React.Component<NotificationsProps> {
    constructor(props: NotificationsProps) {
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
                resizeMethod={"resize"}
                resizeMode="stretch"
                    source={index.image.HomeBG}
                    style={styles.Bg}>
                  
                    <View 
                    style={{marginTop:vh(54),marginLeft:vw(16)}}> 
                    <Text style={styles.txt} >Notifications  </Text>
                    </View>
                </ImageBackground>
            </ImageBackground>
        );
    }
};

export default Notifications;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    Bg: {
        position: "absolute",
        top: 0,
        width: vw(375),
        height: vh(250),
        zIndex:200
    },txt:{fontFamily: "Ubuntu",
    fontSize: 24,
    fontWeight: "bold",
    fontStyle: "normal",
    letterSpacing: 0.29,
    color: index.colors.whiteColor}
});
