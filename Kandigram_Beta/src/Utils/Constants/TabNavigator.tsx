import { createAppContainer } from 'react-navigation';
import React from "react";
import { createStackNavigator, } from 'react-navigation-stack';
import { createBottomTabNavigator,createMaterialTopTabNavigator } from 'react-navigation-tabs';
import { Image, StyleSheet } from "react-native";
import { vh, vw } from '../../Common/ResponsiveScreen';
import Scanner from '../../Common/Scanner';
import Profile from '../../Screens/Profile/Profile';
import Details from '../../Screens/Profile/Details';
import Home from '../../Screens/Home/Home';
import CreateKandi from '../../Screens/Home/CreateKandi/CreateKandi';
import ChatApp from '../../Screens/Home/ChatApp';
import ChatRoom from '../../Screens/Home/ChatRoom';
import AddEvent from '../../Screens/Home/AddEvent';
import Discover from '../../Screens/Home/Discover/Discover';
import Settings from "../../Screens/Settings/Settings";
import index from "../../Utils/Constants/index";
import ResetPassword from '../../Screens/Authentications/Login/ResetPassword';
import Offlinekandies from "../../Screens/Home/OfflineKandies";
import Notifications from '../../Screens/Notifications/Notifications';
import Events_People from '../../Screens/Home/Discover/Events_People';
import Events from '../../Screens/Home/Discover/Events';
import People from '../../Screens/Home/Discover/People';


const SettingsContainer = createStackNavigator({
    Settings: { screen: Settings },
    ResetPassword: { screen: ResetPassword },
}, {
    headerMode: "none",
    navigationOptions: {
        gesturesEnabled: false,
        header: null
    }
})

//FOR HIDING THE TABBAR OPTIONS WITH SETTINGS CONTAINER
SettingsContainer.navigationOptions = ({ navigation }) => {
    let tabBarVisible = true;
    if (navigation.state.index > 0) {
        tabBarVisible = false;
    }
    return {
        tabBarVisible,
    };
};

const ScannerContainer = createStackNavigator({
    Scanner: { screen: Scanner }
},
    {
        headerMode: "none",
        navigationOptions: {
            gesturesEnabled: false,
            header: null
        }
    })

//FOR HIDING THE TABBAR OPTIONS WITH SCANNER CONTAINER
ScannerContainer.navigationOptions = ({ navigation }) => {
    let tabBarVisible = false;
    // if (navigation.state.index > 0) {
    //     tabBarVisible = false;
    // }
    return {
        tabBarVisible,
    };
}

const ProfileContainer = createStackNavigator({
    profile: {
        screen: Profile,
    },
    Details: {
        screen: Details
    }
},
    {
        headerMode: 'none',
        navigationOptions: {
            gesturesEnabled: false,
            header: null
        },
    }
)
//FOR HIDING THE TABBAR OPTIONS WITH PROFILE_CONTAINER
ProfileContainer.navigationOptions = ({ navigation }) => {
    let tabBarVisible = true;
    if (navigation.state.index > 0) {
        tabBarVisible = false;
    }
    return {
        tabBarVisible,
    };
}

//
const HomeContainer = createStackNavigator({
    Home: { screen: Home, },
    CreateKandi: { screen: CreateKandi },
    ChatApp: { screen: ChatApp },
    ChatRoom: { screen: ChatRoom },
    //  LayoutAnimation: { screen: LayoutAnimation },
    Offlinekandies: { screen: Offlinekandies },
    AddEvent: { screen: AddEvent },
    Discover: { screen: Discover},
    Events_People:{screen:Events_People}

}, {
    headerMode: "none",
    navigationOptions: {
        gesturesEnabled: false,
        header: null
    },
})
//FOR HIDING THE TABBAR OPTIONS WITH HOME_CONTAINER
HomeContainer.navigationOptions = ({ navigation }) => {
    let tabBarVisible = true;
    if (navigation.state.index > 0) {
        tabBarVisible = false;
    }
    return {
        tabBarVisible,
    };
}

// const DiscoverContainer=createStackNavigator({
//     Discover: { screen: Discover },
// })

const NotificationsContainer = createStackNavigator({
    Notifications: { screen: Notifications }

}, {
headerMode:"none",
navigationOptions: {
    gesturesEnabled: false,
    header: null
},
})
//top tab bar
const TabsEventnPeople = createMaterialTopTabNavigator(
    {
        Events: { screen: Events },
        People: { screen: People },
        Events_People:{screen:Events_People}
    },
    {
        initialRouteName: 'Events'
    }
);


// main bottom tab bar
const TabNavigator = createBottomTabNavigator({
    Home: { screen: HomeContainer },
    Settings: { screen: SettingsContainer },
    Scanner: { screen: ScannerContainer },
    Notifications: { screen: NotificationsContainer },
    Profile: { screen: ProfileContainer },

},
    {

        defaultNavigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, tintColor }) => {
                const { routeName } = navigation.state;
                if (routeName === 'Home') {
                    return focused ? <Image resizeMode={'contain'} source={index.image.homeIconEn} style={styles.iconImg} /> : <Image resizeMode={'contain'} source={index.image.homeIconDis}
                        style={styles.iconImg} />
                } else if (routeName === 'Settings') {
                    return focused ? <Image resizeMode={'contain'} source={index.image.DiscIconEn}
                        style={styles.iconImg} /> :
                        <Image resizeMode={'contain'} source={index.image.DiscIconDis}
                            style={styles.iconImg} />
                } else if (routeName === 'Scanner') {
                    return focused ? <Image resizeMode={'contain'} source={index.image.scancon}
                        style={[styles.iconImg,{height:vh(60),width:vw(60),marginTop:vh(-30),}]} /> : <Image resizeMode={'contain'} source={index.image.scancon}
                            style={[styles.iconImg,{height:vh(60),width:vw(60),marginTop:vh(-30),}]} />

                } else if (routeName === 'Notifications') {
                    return focused ? <Image resizeMode={'contain'} source={index.image.NotIcon}
                        style={styles.iconImg} /> :
                        <Image resizeMode={'contain'} source={index.image.NotIconDis}
                            style={styles.iconImg} />
                } else if (routeName === 'Profile') {
                    return focused ? <Image resizeMode={'contain'} source={index.image.profileEn}
                        style={styles.iconImg} /> :
                        <Image resizeMode={'contain'} source={index.image.profileDis}
                            style={styles.iconImg} />
                }
                return null;
            }
        }),
        // tabBarComponent: props => <SafeAreaMaterialTopTabBar {...props} />,
        tabBarOptions: {
            style: {
                // marginBottom: vh(20),
                height: vh(50),
                backgroundColor: 'rgb(38,55,90)',
                borderTopColor: 'transparent    '
            },
            activeTintColor: 'tomato',
            inactiveTintColor: 'gray',
            showIcon: true,
            showLabel: false,
            scrollEnabled: true
        },
        tabBarPosition: 'bottom',
        animationEnabled: true,
        swipeEnabled: true
    }
)
const styles = StyleSheet.create({
    iconImg: {
        height: vh(25),
        width: vw(25),
       // marginTop:vh(10)
    }
})

export default createAppContainer(TabNavigator);