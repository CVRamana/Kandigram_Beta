import * as React from 'react';
import { Text, View, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { connect } from "react-redux";
import { vh, vw } from "../../Common/ResponsiveScreen";
import firebase from "react-native-firebase";
import Loader from "../../Common/loader";

import index from "../../Utils/Constants/index";

import { ChatAction } from "../Home/ChatAction";


interface ChatAppProps {
    navigation: any
    uid: string
    ChatAction:Function
    contacts:any
}
interface State {
    users: any
    keys: any
    isloading: boolean
  

}

class ChatApp extends React.Component<ChatAppProps, State> {
    constructor(props: ChatAppProps) {
        super(props)

        this.state = {
            users: [],
            keys: [],
            isloading: false
        };
    };

    componentDidMount() {
        this.getFirebaseData(this)

    }
    getFirebaseData = (self: any) => {
        this.setState({ isloading: !this.state.isloading })

        const self11 = this

        var ref = firebase.database().ref("/Users");

        ref.on("value", function (snapshot) {
            var key = snapshot._childKeys
            var allData = snapshot._value
            var refined = key.filter((item) => item != self11.props.uid)
            console.log("refined : ", refined);
            console.log("all adata", allData);
            const nameArray = Object.keys(allData).map(i => allData[i])
            console.log("my id", self11.props.uid)
            var kamka = nameArray.filter((item) => item.uid != self11.props.uid)
            console.log("kamka Data: ", kamka);
            //putting in redux
            self11.props.ChatAction(kamka,(success:any)=>{
              

            },(error:any)=>{})
            self11.setState({ isloading: !self11.state.isloading })
            debugger
        }, function (error) {
            console.log("Error: " + error.code);
        });

    }


    render() {
        return (
            <View style={styles.container}>
                <View>
                    <View>
                        <TouchableOpacity>
                            <Image
                                style={{ height: vh(21), width: vw(22) }}
                                source={index.image.back}
                            />
                        </TouchableOpacity>
                        <Text> Welcome  to chat Application </Text>

                    </View>

                    <FlatList
                        data={this.props.contacts}
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
                <Loader isLoading={this.state.isloading} />
            </View>
        );
    }
};

const mapStateToProps = (state: any) => {
    return {
        uid: state.PersistReducer.uid,
        contacts:state.ChatReducer.contacts,
    }

}
const mapDispatchToProps = {
    ChatAction:ChatAction
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


