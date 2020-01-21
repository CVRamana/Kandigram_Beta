import * as React from 'react';
import { Text, View, StyleSheet, Animated, Easing } from 'react-native';
import { vh, vw } from './ResponsiveScreen';
import colors from '../Utils/Constants/colors';

interface SnackbarProps { }

class Snackbar extends React.Component<SnackbarProps>{
    constructor(props) {
        super(props)
        this.animatedValue = new Animated.Value(0)
        this.state = {

        };
    };
    componentDidMount() {
        this.animate()
    }
    animate = () => {
        this.animatedValue.setValue(0)
        Animated.timing(
            this.animatedValue,
            {
                toValue: 1,
                duration:3000,
                easing: Easing.linear
            }
        ).start()
    }

    render() {
        const bottom = this.animatedValue.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [-70, 3, -70]
        })
        return (

            <Animated.View style={styles.container, { bottom }}>
                <View style={styles.txt}>
        <Text style={{ color: colors.whiteColor }}>{this.props.name}</Text>
                </View>
            </Animated.View>

        );
    }
};

export default Snackbar;

const styles = StyleSheet.create({
    container: {
       
        position: "absolute",
        right: 0,
        zIndex: 700,

      
        width: 500,
    },
    txt:{
        height: vh(50),
        width:500,
        backgroundColor: "red",
        justifyContent: "center",
        alignItems: "center",
    }
});
