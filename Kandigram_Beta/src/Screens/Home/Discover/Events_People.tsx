import * as React from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Image, ImageBackground } from 'react-native';
import { vw, vh } from '../../../Common/ResponsiveScreen';
import index from "../../../Utils/Constants/index";
import { createMaterialTopTabNavigator } from 'react-navigation-tabs'
import Events from "./Events";
import People from "./People";
import { createAppContainer } from 'react-navigation';

interface Events_PeopleProps { }

const TopTab = createAppContainer(createMaterialTopTabNavigator(
    {
        Events: { screen: Events },
        People: { screen: People }
    },
   {
    tabBarOptions: {
        activeTintColor:index.colors.whiteColor,
        inactiveTintColor:index.colors.inactiveTintColor,
        upperCaseLabel:false,
        indicatorStyle:{backgroundColor:index.colors.whiteColor},
        labelStyle: {
            fontFamily: "Ubuntu-Medium",
            fontSize: vw(16),
            fontWeight: "bold",
            fontStyle: "normal",
            letterSpacing: 0.19,
            color: index.colors.whiteColor
        },
        tabStyle: {
          
        },
        style: {
          
            height:vh(50),
            width:'100%',
          backgroundColor: 'transparent',
        },
      }
    }
   
)
)

class Events_People extends React.Component<Events_PeopleProps> {
    constructor(props: Events_PeopleProps) {
        super(props)
        this.state = {
        };
    };

    render() {
        return (

            <View style={styles.container}>
                <View
                    style={{
                        height: vh(153),
                        width: vw(375),
                        backgroundColor:"#a8326f"
                    }}
                >
                    {/* for input */}
                    <View style={{ marginTop: vh(58), flexDirection: 'row', alignItems: "center" }}>
                        <TouchableOpacity
                        onPress={()=>this.props.navigation.navigate('Discover')}
                        >
                            <Image
                                source={index.image.back}
                                style={{ marginLeft: vw(16), marginRight: vw(20) }}
                            />
                        </TouchableOpacity>
                        <TextInput
                            style={styles.input}
                        />
                    </View>
                </View>
                <View
                    style={{
                     height: "100%",
                     width: "100%",
                    // backgroundColor:'red',
                      marginTop: "-11%" }}
                >
                    <TopTab />
                </View>

            </View>
        );
    }
};
export default Events_People;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#131f34"
    },
    header: {
        width: vw(375),
        height: vh(144),
        backgroundColor: "rgb(233, 30, 99)"
    },
    input: {
        height: vh(35), width: vw(200),
        backgroundColor: "transparent",
        fontFamily: "Ubuntu",
        fontSize: 16,
        fontWeight: "bold",
        fontStyle: "normal",
        letterSpacing: 0.19,
        color: index.colors.whiteColor
    }

});
