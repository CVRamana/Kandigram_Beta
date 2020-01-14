import * as React from 'react';
import { Text, View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { connect } from "react-redux";
import { vh, vw } from "../../Common/ResponsiveScreen";
import firebase from "react-native-firebase";
import { db } from "../../Utils/FirebaseConfig";
import { usePowerState } from 'react-native-device-info';


interface ChatAppProps { }

class ChatApp extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            users: [],
            keys: []
        };
    };

    componentDidMount() {
        this.getFirebaseData(this)
        
    }
    getFirebaseData = (self: any) => {
        let tempp = [];
        alert("hgd",props.navigation.state.params.uid)
        var key = [];
        let ref = firebase.database().ref();
        ref.child('Users').on("value", function (snapshot) {
            key = snapshot._childKeys
            console.warn(key)
            key.filter(function (val, index, array) {
                tempp.push(snapshot.val()[val])
                console.warn(snapshot.val()[val])
                console.warn("after push=>", tempp)
                console.warn(snapshot.val()[val].name)
            }, function (error) {
                console.warn("Error: " + error.code);
            })
        })
        console.warn("incoming temP=>" + tempp)
        self.setState({ users: tempp })
        let refine=self.state.users
        refine.filter(item => item.uid != this.props.navigation.state.uid)
        alert(JSON.stringify("refinde   ",refine, this.props.uid))


        // self.setState({users:refine})

    }


    render() {
        return (
            <View style={styles.container}>
                <Text> Welcome  to chat Application </Text>
                <View style={styles.flat}>
                    <FlatList
                        data={this.state.users}
                        keyExtractor={item => item.index}
                        renderItem={({ item }) => {
                            return (
                                <View style={{
                                    height: vh(100), width: vw(350),
                                    borderRadius: 100, marginTop: vh(20)
                                }}>
                                    <TouchableOpacity
                                        onPress={() => this.props.navigation.navigate('ChatRoom', { receiver: item.uid, receiver_name: item.name })}
                                        // onPress={()=>alert(JSON.stringify(item.uid))}
                                        style={styles.dataRender}>
                                        <Text> {item.name}</Text>
                                        <Text> {item.uid}</Text>
                                    </TouchableOpacity>
                                </View>


                            )
                        }}
                    />
                </View>

            </View>
        );
    }
};

const mapStateToProps = (state: any) => {
    return {
        uid: state.PersistReducer.uid
    }

}
const mapDispatchToProps = {

}
const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        paddingTop: vh(50),
        // paddingBottom:
    },
    flat: {

        marginTop: vw(30),
        // backgroundColor: "grey"

    },
    dataRender: {
        height: vh(100),
        borderRadius: 100,
        backgroundColor: "pink",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: vw(10)
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatApp)


