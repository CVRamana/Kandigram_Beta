import * as React from 'react';
import { Text, View, StyleSheet, TextInput, FlatList } from 'react-native';
import { db } from '../../Utils/FirebaseConfig';
import firebase, { database } from 'react-native-firebase';
import { vw, vh } from '../../Common/ResponsiveScreen';
import colors from '../../Utils/Constants/colors';
import { connect } from "react-redux";


interface ChatRoomProps { }

class ChatRoom extends React.Component {
    constructor(props) {
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
            var temp = []
            var key = snap._childKeys
            key.filter(function (val, index, array) {
                temp.push(snap.val()[val])
                //   console.warn("message > ",snap.val()[val].messgae)
            })
            // this.props.addFirebaseChat(temp)
            this.setState({
                userChat: temp
            }, () => {
                console.warn("flat list data=>", this.state.userChat)
            })
        })
    }
    //create the ChatRoom
    createChatRoom = () => {
        //  let room = this.props.loginUid < this.text.ReceiverKey ? this.props.loginUid + "-" + this.text.ReceiverKey : this.text.ReceiverKey + "-" + this.props.loginUid
        let room = this.props.uid < this.props.navigation.state.params.receiver ? this.props.uid + "-" + this.props.navigation.state.params.receiver : this.props.navigation.state.params.receiver + "-" + this.props.uid
        let data = {
            sender: this.props.uid,
            time: firebase.database.ServerValue.TIMESTAMP,
            message: this.state.message,
        }
        var dbRef = firebase.database().ref("ChatRoom/").child(room);
        dbRef.push(data, (val) => {

            if (val === null) {
                this.setState({ message: "" })
                // alert("saved successfully")
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
                        data={this.state.userChat}
                        ref = "flatList"
                       onContentSizeChange={()=> this.refs.flatList.scrollToEnd()}
                        keyExtractor={item => item.index}
                        renderItem={({ item }) => {
                            return (
                                <View>
                                    {this.props.uid===item.sender ?
                                <View style={styles.chat}>
                                    <Text style={styles.chatText}> {item.message}</Text>
                        </View> :
                        <View style={styles.yourchat}>
                        <Text style={styles.chatText}> {item.message}</Text>
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
        uid: state.PersistReducer.uid
    }
}

export default connect(mapStateToProps)(ChatRoom);

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
        backgroundColor: "transparent",
        marginTop: 10,
        marginLeft: 159,
        marginRight:10,
        maxWidth: vw(350),
        // minHeight:vh(70),
        borderRadius: vw(10000),
        minWidth: vw(100),
        // paddingTop: vh(100),

    },
    yourchat: {
        backgroundColor: "transparent",
        marginTop: 10,
        marginLeft: 10,
        marginRight:10,
        maxWidth: vw(350),
        // minHeight:vh(70),
        borderRadius: vw(10000),
        minWidth: vw(100),
        // paddingTop: vh(100),

    },
    chatText: {
        fontSize: vw(20),
        color: colors.whiteColor,
        backgroundColor: "lightblue",

    }
});
