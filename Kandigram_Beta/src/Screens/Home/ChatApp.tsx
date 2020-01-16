import * as React from 'react';
import { Text, View, StyleSheet, FlatList, TouchableOpacity ,Image} from 'react-native';
import { connect } from "react-redux";
import { vh, vw } from "../../Common/ResponsiveScreen";
import firebase from "react-native-firebase";
import  Loader  from "../../Common/loader";
import index from "../../Utils/Constants/index";


interface ChatAppProps {
    navigation:any
 }
 interface State{
users:any
keys:any
isloading:boolean
 }

class ChatApp extends React.Component<ChatAppProps,State> {
    constructor(props:ChatAppProps) {
        super(props)

        this.state = {
            users: [],
            keys: [],
            isloading:false
        };
    };

    componentDidMount() {
        this.getFirebaseData(this)
        
    }
    getFirebaseData = (self: any) => {
    self.setState({isloading:!self.state.isloading})
        let tempp = [];
       // alert("hgd",props.navigation.state.params.uid)
        var key = [];
        let ref = firebase.database().ref();
        ref.child('Users').on("value", function (snapshot) {
            key = snapshot._childKeys
            console.warn(key)
            self.setState({isloading:!self.state.isloading})
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
       // alert(JSON.stringify("refinde   ",refine, this.props.uid))

    }


    render() {
        return (
            <View style={styles.container}>
             <View>
                 <View>
                     <TouchableOpacity>
                         <Image
                         style={{height:vh(21),width:vw(22)}}
                         source={index.image.back}
                         />
                     </TouchableOpacity>
                <Text> Welcome  to chat Application </Text>

                </View>

                    <FlatList
                        data={this.state.users}
                        keyExtractor={item => item.index}
                        renderItem={({ item}) => {
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
<Loader isLoading={this.state.isloading}/>
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


