import * as React from 'react';
import { Text, View, StyleSheet, Animated, Easing } from 'react-native';
import { vh, vw } from './ResponsiveScreen';
import colors from '../Utils/Constants/colors';
import { connect } from "react-redux";
import { GlobalAction } from "../../src/GlobalRedux/GlobalAction";

interface SnackbarProps { }

class Snackbar extends React.Component<SnackbarProps>{
    constructor(props) {
        super(props)
        this.animatedValue = new Animated.Value(0)
        this.state = {

        };
    };

    shouldComponentUpdate(nextProps: Readonly<State>, nextState: Readonly<Props>, nextContext: any): boolean {
        if (this.props.isInternet != nextProps.isInternet) {
            this.animate()
            return true
        }
        else {
            this.animate()
            return true
        }
    }
    animate = () => {
        this.animatedValue.setValue(0)
        Animated.timing(
            this.animatedValue,
            {
                toValue: 1,
                duration: 2000,
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
                    <Text style={{ color: colors.whiteColor }}>{this.props.isInternet ? "Connected !" : " No Connection! "}</Text>
                </View>
            </Animated.View>

        );
    }
};
const mapStateToProps = (state: any) => {
    return {
        isInternet: state.GlobalReducer.isInternet
    }
}

export default connect(mapStateToProps, {})(Snackbar);

const styles = StyleSheet.create({
    container: {

        position: "absolute",
        right: 0,
        zIndex: 700,


        width: 500,
    },
    txt: {
        height: vh(50),
        width: 500,
        backgroundColor: "red",
        justifyContent: "center",
        alignItems: "center",
    }
});
