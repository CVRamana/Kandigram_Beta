import * as React from 'react';
import { Text, View, StyleSheet, ImageBackground, PermissionsAndroid, Platform, Button, TouchableOpacity, Image } from 'react-native';
import { CameraKitCameraScreen } from "react-native-camera-kit";
import index from "../Utils/Constants/index";
import { vw, vh } from './ResponsiveScreen';
import { connect } from "react-redux";
import { PersistOfflinekandiAction } from '../ReduxPersist/PersistAction'
import Loader from './loader';
import firebase from "react-native-firebase";

interface ScannerProps {
    PersistOfflinekandiAction: Function
    navigation: any
    isInternet:Boolean
    uid:string
}
interface State {

}
var isOne = false

class Scanner extends React.Component<ScannerProps, State> {

    constructor(props:ScannerProps) {
        super(props)

        this.state = {
            isLoading: false
        };
    };

    onReadCode = (event: any) => {
        var ref=firebase.database().ref('/Users').child(this.props.uid).child('Scanned_Kandies')
        let param = event.nativeEvent.codeStringValue
        { this.props.isInternet ?

        this.props.PersistOfflinekandiAction(param, () => {
            this.setState({ isLoading: true })
            setTimeout(() => {
                this.setState({ isLoading: false })
                this.props.navigation.navigate('Offlinekandies')
            }, 1000);
        })  :

        ref.push(param,(res:any)=>{
            if(res===null){
                console.warn("sucessfully uploaded")  
            }
        })

    }

    }

    componentDidMount() {
        if (this.hasLocationPermission()) {

            //this.props.PersistOfflinekandiAction("hello")
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
               // source={index.image.scan}
                style={{ flex: 1, }}
            >
                <View style={{
                    top: vh(50),
                    left: vw(20),

                    position: "absolute",
                    zIndex: 400,
                    backgroundColor: "transparent "
                }}>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('Home')}
                    
                    >
                        <Image
                            style={{ width: vw(11), height: vh(18) }}
                            source={index.image.back}
                        />
                    </TouchableOpacity>
                </View>

                <CameraKitCameraScreen
                    scanBarcode={this.state.isScan}
                    style={{ height: '100%', width: '100%' }}
                    onReadCode={(event: any) => {
                        if (!isOne) {
                            isOne = true;
                            this.onReadCode(event);
                            setTimeout(() => {
                                isOne = false;
                            }, 2000)
                        }
                    }}
                    cameraOptions={{
                        flashMode: 'auto'
                    }}
                />
                <Loader
                    isLoading={this.state.isLoading}
                />

            </ImageBackground>

        );
    }
};

const mapStateToProps = (State: any) => {
    return {
     isInternet:State.GlobalReducer.isInternet,
     uid:State.PersistReducer.uid
    }
}
const mapDispatchToProps = {
    PersistOfflinekandiAction: PersistOfflinekandiAction
}
export default connect(mapStateToProps, mapDispatchToProps)(Scanner);

const styles = StyleSheet.create({
    container: {}
});
