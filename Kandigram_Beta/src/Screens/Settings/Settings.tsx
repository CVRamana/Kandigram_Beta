import * as React from 'react';
import { Text, View, StyleSheet, ImageBackground, Image, FlatList, TouchableOpacity } from 'react-native';
import index from "../../Utils/Constants/index";
import { vh, vw } from '../../Common/ResponsiveScreen';
import SettingDataRender from "../../Common/SettingDataRender";
import AsyncStorage from "@react-native-community/async-storage";
import {connect} from "react-redux";
import  {PersistDelete} from "../../ReduxPersist/PersistAction";

interface SettingsProps {
    navigation: any
    PersistDelete:Function
    item:any
}
interface State {
    settingData: any
}

class Settings extends React.Component<SettingsProps, State> {
    constructor(props: SettingsProps) {
        super(props)

        this.state = {
            settingData: [
                { name: "FAQ", img: require('../../Common/Public/Images/FaqIcon.png'), navigateTo: "Faq" },
                { name: "Support", img: require('../../Common/Public/Images/ContactUsIcon.png'), navigateTo: "Support" },
                { name: "Share KandiSnap", img: require('../../Common/Public/Images/share.png'), navigateTo: "ShareKandi" },
                { name: "Change Password", img: require('../../Common/Public/Images/share.png'), navigateTo: "ResetPassword" },
                { name: "Terms and Conditions", img: require('../../Common/Public/Images/TermsandConditions.png'), navigateTo: "Terms" },
                { name: "Log Out", img: require('../../Common/Public/Images/LogOutIcon.png') }
            ]
        };
    };
   
    render() {
        return (
            <View style={styles.container}>
                <ImageBackground
                 resizeMode={"stretch"}
                 resizeMethod="resize"
                    source={index.image.bgOfflineHead}
                    style={styles.bg}
                >

                    <View style={{
                        flexDirection: "row",
                        marginTop: vh(56),
                        marginLeft: vw(16)
                    }}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Profile')}>
                            <Image
                                source={index.image.back}
                                style={{ height: vh(18), width: vw(11) }}
                            />
                        </TouchableOpacity>
                        <Text style={styles.txt}>Settings</Text>

                    </View>
                </ImageBackground>
             
                    <FlatList
                        scrollEnabled={true}
                        data={this.state.settingData}
                        renderItem={({ item, index }) => {
                            return (
                                <SettingDataRender
                                    txt={item.name}
                                    img={item.img}
                                    name={item.navigateTo}
                                    
                                    //  onClick={()=>this.onPress(item.navigateTo)}
                                    onClick={index === 5 ? () => { 
                                    AsyncStorage.clear();
                                    this.props.PersistDelete()
                                        //debugger
                                        this.props.navigation.navigate('WelcomeSplash')
                                    } : () => this.props.navigation.navigate(item.navigateTo)}
                                />
                            )
                        }}
                    />
                </View>

            // </View>
        );
    }
};

const mapDispatchToProps={
PersistDelete:PersistDelete
}
const mapStateToProps=(state:any)=>{
    return{
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Settings);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // marginTop:100,
         paddingTop: vh(90),
        backgroundColor: index.colors.darkSlateBlue75
    }, bg: {
        position: "absolute",
        width: vw(375),
        height: vh(101),
        //top: 0,
        zIndex: 400

    }, txt: {
        marginLeft: vw(17),
        fontFamily: "Ubuntu",
        fontSize: 18,
        fontWeight: "bold",
        fontStyle: "normal",
        letterSpacing: 0.22,
        color: index.colors.whiteColor
    }
});
