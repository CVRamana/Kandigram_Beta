import * as React from 'react';
import { Text, View, StyleSheet, TextInput, FlatList } from 'react-native';
import { db } from '../../Utils/FirebaseConfig';
import firebase, { database } from 'react-native-firebase';
import { vw, vh } from '../../Common/ResponsiveScreen';
import colors from '../../Utils/Constants/colors';
import { connect } from "react-redux";
import { ChatDataAction } from "../Home/ChatAction";


interface ChatRoomProps { 
    ChatDataAction:Function
    uid:string
    chatData:any
}
interface State{

}

class ChatRoom extends React.Component<ChatRoomProps,State> {
    constructor(props:ChatRoomProps) {
        super(props)

        this.state = {
            message: "",
            userChat: [],
        };
    };
    componentDidMount() {
        this.getAllDataFromFireabse()
    }
    //send message
    sendMessage = () => {
        this.createChatRoom()
    }

    // get the chat from the firebase
    getAllDataFromFireabse = () => {
        let room = this.props.uid < this.props.navigation.state.params.receiver ? this.props.uid + "-" + this.props.navigation.state.params.receiver : this.props.navigation.state.params.receiver + "-" + this.props.uid
        firebase.database().ref().child("ChatRoom").child(room).on('value', (snap) => {
            var temp:any = []
            var key = snap._childKeys
            key.filter(function (val:any, index:any, array) {
                temp.push(snap.val()[val])
                //   console.warn("message > ",snap.val()[val].messgae)
            })
             this.props.ChatDataAction(temp)
           //  alert(this.props.chatData)
            this.setState({
                userChat: temp
            })
        })
    }
    //create the ChatRoom
    createChatRoom = () => {

        let room = this.props.uid < this.props.navigation.state.params.receiver ? this.props.uid + "-" + this.props.navigation.state.params.receiver : this.props.navigation.state.params.receiver + "-" + this.props.uid
        let data = {
            sender: this.props.uid,
            time: new Date(firebase.database.ServerValue.TIMESTAMP),
            message: this.state.message,
        }
        var dbRef = firebase.database().ref("ChatRoom/").child(room);
        dbRef.push(data, (val) => {

            if (val === null) {
                this.setState({ message: "" })

            }
        })
    }

    render() {
        // const { navigation } = this.props;
        return (
            <View style={styles.container}>
                <View >

                    <Text
                        style={styles.txt}> {this.props.navigation.state.params.receiver_name}</Text>
                    <FlatList
                    //    data={this.state.userChat}
                    data={this.props.chatData}
                        ref="flatList"
                        onContentSizeChange={() => this.refs.flatList.scrollToEnd()}
                        keyExtractor={item => item.index}
                        renderItem={({ item }) => {
                            return (
                                <View>
                                    {this.props.uid === item.sender ?
                                        <View style={styles.chat}>
                                            <Text style={styles.chatText}> {item.message}</Text>
                                        </View> :
                                        <View style={styles.yourchat}>
                                            <Text style={[styles.chatText, { color: "black" }]}> {item.message}</Text>
                                        </View>
                                    }
                                </View>


                            )
                        }}

                    />



                </View>
                <TextInput
                    placeholder="Say Something Cool......"
                    style={styles.input}
                    placeholderTextColor={colors.whiteColor}
                    //  placeholderStyle={}
                    value={this.state.message}
                    onChangeText={(val) => this.setState({ message: val })}
                    onSubmitEditing={() => this.sendMessage()}
                    blurOnSubmit={false}

                />
            </View>
        );
    }
};
const mapStateToProps = (state: any) => {
    return {
        uid: state.PersistReducer.uid,
        chatData:state.ChatReducer.chatData
    }
}
const mapDispatchToProps = {
    ChatDataAction: ChatDataAction
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatRoom);

const styles = StyleSheet.create({
    container: {
        // alignItems: "center",
        paddingTop: 70,
        flex: 1,
        backgroundColor: "lightgrey",
        paddingBottom: 140,
    },
    input: {
        height: vh(70),
        width: '100%',
        paddingLeft: 20,
        position: "absolute", bottom: 20,
        backgroundColor: "pink"
    },
    txt: {
        fontFamily: "Ubuntu-Medium",
        fontSize: vw(29)
    },
    chat: {
        backgroundColor: "blue",
        marginTop: vh(10),
        marginLeft: vw(59),

        marginRight: vw(10),
        // maxWidth: vw(350),
        padding: vw(20),
        // paddingRight: vw(20),
        //flexDirection:"row-reverse",
        alignSelf: 'flex-start',
        borderRadius: vw(50),
        // minWidth: vw(100),


    },
    yourchat: {
        backgroundColor: "white",
        marginTop: 10,
        marginLeft: 10,
        flexDirection: "row",
        marginRight: 10,
        borderRadius: 10,
        // flexDirection:"row-reverse",
        alignSelf: 'flex-start'


    },
    chatText: {
        fontSize: vw(20),
        color: colors.whiteColor,
        // backgroundColor: "lightblue",

    }
});
