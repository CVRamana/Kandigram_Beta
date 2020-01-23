import * as React from 'react';
import { Text, View, StyleSheet, ImageBackground, PermissionsAndroid,Platform, Button, TouchableOpacity, Image } from 'react-native';
import { CameraKitCameraScreen } from "react-native-camera-kit";
import index from "../Utils/Constants/index";
import { vw, vh } from './ResponsiveScreen';
import {connect} from "react-redux";
import {PersistOfflinekandiAction} from '../ReduxPersist/PersistAction'

interface ScannerProps {
    PersistOfflinekandiAction:Function
    navigation:any
}
interface State {

}

class Scanner extends React.Component<ScannerProps, State> {
    onReadCode = (event: any) => {
        //let param=event.nativeEvent.codeStringValue
        this.props.PersistOfflinekandiAction("hello")
      
    }

    componentDidMount() {
        if (this.hasLocationPermission()) {
          //  this.onReadCode(e)
          debugger
          this.props.PersistOfflinekandiAction("hello")
        } else {
            alert("no permission")
            
        }
    }

    hasLocationPermission = async () => {
        if (Platform.OS === 'ios' ||
            (Platform.OS === 'android' && Platform.Version < 23)) {
            return true;
        }

        const hasPermission = await PermissionsAndroid.check(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );

        if (hasPermission) return true;

        const status = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );

        if (status === PermissionsAndroid.RESULTS.GRANTED) return true;

        if (status === PermissionsAndroid.RESULTS.DENIED) {
            ToastAndroid.show('Camera permission denied by user.', ToastAndroid.LONG);
        } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
            ToastAndroid.show('Camera permission revoked by user.', ToastAndroid.LONG);
        }

        return false;
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

const mapStateToProps=(State:any)=>{
    return {

    }
}
const mapDispatchToProps={
    PersistOfflinekandiAction:PersistOfflinekandiAction
}
export default connect(mapStateToProps,mapDispatchToProps)(Scanner);

const styles = StyleSheet.create({
    container: {}
});
