import * as React from 'react';
import { Text, View, StyleSheet, ImageBackground, PermissionsAndroid, Button, TouchableOpacity, Image } from 'react-native';
import { CameraKitCameraScreen } from "react-native-camera-kit";
import index from "../Utils/Constants/index";
import { vw, vh } from './ResponsiveScreen';

interface ScannerProps {

}
interface State {

}

class Scanner extends React.Component<ScannerProps, State> {
    onReadCode = (event: any) => {
        console.log(event.nativeEvent.codeStringValue)
    }

    componentDidMount() {
        try {
            const granted = PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
                {
                    title: 'Cool Photo App Camera Permission',
                    message:
                        'Cool Photo App needs access to your camera ' +
                        'so you can take awesome pictures.',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                },
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log('You can use the camera');
            } else {
                console.log('Camera permission denied');
            }
        } catch (err) {
            console.warn(err);
        }
    }

    render() {
        return (
            <ImageBackground
                source={index.image.scan}
                style={{ flex: 1, }}
            >
                <View style={{
                    top: 50,
                    left: 20,
                    
                    position: "absolute",
                    zIndex: 400,
                    backgroundColor: "transparent "
                }}>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('AppintroSlider')}
                    >
                        <Image
                            style={{ width: vw(11), height: vh(18) }}
                            source={index.image.back}
                        />
                    </TouchableOpacity>
                </View>

                <CameraKitCameraScreen
                    //  actions={{ rightButtonText: 'Done', leftButtonText: 'Cancel' }}
                    onBottomButtonPressed={(event: any) => this.onBottomButtonPressed(event)}
                    scanBarcode={true}
                    laserColor={"blue"}
                    frameColor={"yellow"}

                    onReadQRCode={((event: any) => this.onReadCode(event))} //optional
                    hideControls={false}           //(default false) optional, hide buttons and additional controls on top and bottom of screen
                    showFrame={true}   //(default false) optional, show frame with transparent layer (qr code or barcode will be read on this area ONLY), start animation for scanner,that stoped when find any code. Frame always at center of the screen
                    offsetForScannerFrame={10}   //(default 30) optional, offset from left and right side of the screen
                    heightForScannerFrame={200}  //(default 200) optional, change height of the scanner frame
                    colorForScannerFrame={'red'} //(default white) optional, change colot of the scanner frame
                />
            </ImageBackground>

        );
    }
};

export default Scanner;

const styles = StyleSheet.create({
    container: {}
});
