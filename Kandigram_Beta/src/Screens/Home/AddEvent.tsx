import * as React from 'react';
import { Text, View, StyleSheet, ImageBackground, Image,TouchableOpacity } from 'react-native';
import index from "../../Utils/Constants/index";
import { vw, vh, calculateWidth, calculateHeight } from '../../Common/ResponsiveScreen';
import TextInputComponent from '../../Common/TextInputComponent';
import { widthPercentageToDP, heightPercentageToDP } from 'react-native-responsive-screen';
import colors from '../../Utils/Constants/colors';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import {Calendar, } from 'react-native-calendars';
import firebase from 'react-native-firebase';
import {connect } from "react-redux";

interface AddEventProps { 
uid:string

}
interface State{
    event_name:string
    date:string
    showCalander:boolean
    event_Location:string
}

class AddEvent extends React.Component<AddEventProps,State> {
    constructor(props:AddEventProps) {
      super(props)
      this.state = {
          event_name:'',
         date:'',
         event_Location:'',
         showCalander:false,
      };
    };

    addEvent=()=>{
        let val={
            event_name:this.state.event_name,
            date:this.state.date,
            event_Location:this.state.event_Location
        }
        var ref=firebase.database().ref('/Users').child(this.props.uid).child("Created_Events").child("Event"+(Math.round(Math.random()*100000000)))
        ref.set(val,(res)=>{
            if (res === null) {
                // this.props.navigation.navigate('Login')
                console.warn("sucess fully uploaded")
            }
        })

    }

    render() {
        return (
            <ImageBackground source={index.image.eventBg}
                style={styles.container}>
                <ImageBackground
                    source={index.image.bgOfflineHead}
                    style={styles.header}>
                    <View style={styles.headText}>
                        <TouchableOpacity onPress={()=>this.props.navigation.goBack()}>
                        <Image
                            style={styles.backImg}
                            source={index.image.back}
                        />
                        </TouchableOpacity>
                        <Text style={styles.txt}>Add Event</Text>
                    </View>
                </ImageBackground>
                <View style={ styles.inputContainer1}>

                    <TextInputComponent
                        commonPlaceholder={"Event Name*"}
                        commonOnChangeText={(val:any)=>this.setState({event_name:val})}
                        extraStyle={{backgroundColor:index.colors.textInputBGColor}}
                    />
                </View>

                <View style={ styles.inputContainer}>
                <TextInputComponent
                        commonPlaceholder={"Select Event Date"}
                       // commonOnChangeText={(val:any)=>this.setState({:val})}
                        val={this.state.date}
                       // commonOnBlur={()=>this.setState({})}
                        extraStyle={{width:vw(290),height:vh(50),borderWidth:0,backgroundColor:"transparent"}}
                    />
                    <TouchableOpacity
                    onPress={()=>this.setState({showCalander:!this.state.showCalander})}
                     style={styles.dateCont}>
                        <Image source={index.image.calander}
                        style={styles.img}
                        />
                    </TouchableOpacity>
                </View>

                <View style={ styles.inputContainer}>
                <TextInputComponent
                        commonPlaceholder={"Event Location"}
                        commonOnChangeText={(val:any)=>this.setState({event_Location:val})}
                        extraStyle={{width:vw(290),height:vh(50),borderWidth:0,backgroundColor:"transparent"}}
                        commonOnSubmitEditing={()=>this.addEvent()}
                    />
                     <TouchableOpacity
                     activeOpacity={1}
                      style={styles.dateCont}>
                     <Image
                     
                   //  style={styles.img}
                     source={index.image.loc}
                     />
                     </TouchableOpacity>
                </View>

                {this.state.showCalander?
                <View   style={styles.calander}>
                <Calendar
              
                onDayPress={(day) =>this.setState({date: day.dateString})}/>
                </View>:null}

            </ImageBackground>

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
   // ChatDataAction: ChatDataAction
}

export default connect(mapStateToProps,mapDispatchToProps)(AddEvent);

const styles = StyleSheet.create({
    container: { flex: 1, },
    header: {
        width: vw(375),
        height: vh(111)
    },
    img:{
        height:vh(20),
        width:vw(20)
    },
    headText: {
        flexDirection: "row",
        marginTop: vh(60),
        marginLeft: vw(16)
    },
    txt:{
        
            marginLeft: vw(16), fontSize: vw(18),
            fontWeight: "bold",
            fontStyle: "normal",
            letterSpacing: 0.22,
            color: index.colors.whiteColor
        
    },
    backImg: {
        height: vh(18),
        width: vw(21)
    },
    inputContainer1:{ marginLeft: vw(16), marginTop: vh(30)},
    inputContainer:{
        width: widthPercentageToDP(calculateWidth(350)),
        height: heightPercentageToDP(calculateHeight(50)),
      //  marginTop:widthPercentageToDP(calculateWidth(20)),
        borderRadius: 1000,
        //paddingLeft: 20,
        fontSize:heightPercentageToDP(calculateHeight(16)),
        backgroundColor:colors.textInputBGColor,
        borderColor:colors.textInputBorderColor,
        borderStyle: "solid",
        borderWidth:vw(2),
        flexDirection:"row",
        marginLeft: vw(16),
        marginTop: vh(30),
        },
        dateCont:
            {
         
            width:vw(30),height:vh(30),
            marginTop:vh(8),
            justifyContent:"center",
            alignItems:"center"
        },
        calander:{bottom:50,position:"absolute",width:"100%",zIndex:500,shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.53,
        shadowRadius: 13.97,
        
        elevation: 21,}
        
});

