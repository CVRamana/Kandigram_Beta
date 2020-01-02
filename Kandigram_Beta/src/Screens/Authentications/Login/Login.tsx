import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';

interface LoginProps { }

class Login extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>Login</Text>
            </View>
        );
    }
};

export default Login;

const styles = StyleSheet.create({
    container: {}
});
