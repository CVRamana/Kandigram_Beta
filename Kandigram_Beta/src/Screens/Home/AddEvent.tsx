import * as React from 'react';
import { Text, View, StyleSheet, ImageBackground, Image,TouchableOpacity } from 'react-native';
import index from "../../Utils/Constants/index";
import { vw, vh, calculateWidth, calculateHeight } from '../../Common/ResponsiveScreen';
import TextInputComponent from '../../Common/TextInputComponent';
import { widthPercentageToDP, heightPercentageToDP } from 'react-native-responsive-screen';
import colors from '../../Utils/Constants/colors';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import {Calendar, } from 'react-native-calendars';

interface AddEventProps { }
interface State{
    date:string
    showCalander:boolean
}

class AddEvent extends React.Component<AddEventProps,State> {
    constructor(props:AddEventProps) {
      super(props)
      this.state = {
         date:'',
         showCalander:false,
      };
    };
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
                        <Text style={{
                            marginLeft: vw(16), fontSize: vw(18),
                            fontWeight: "bold",
                            fontStyle: "normal",
                            letterSpacing: 0.22,
                            color: index.colors.whiteColor
                        }}>Add Event</Text>
                    </View>
                </ImageBackground>
                <View style={ styles.inputContainer1}>

                    <TextInputComponent
                        commonPlaceholder={"Event Name*"}
                        extraStyle={{backgroundColor:index.colors.textInputBGColor}}
                    />
                </View>

                <View style={ styles.inputContainer}>
                <TextInputComponent
                        commonPlaceholder={"Select Event Date"}
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
                      
                        extraStyle={{width:vw(290),height:vh(50),borderWidth:0,backgroundColor:"transparent"}}
                        commonOnSubmitEditing={()=>alert("event generated")}
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
                <View   style={{marginTop:vh(20)}}>
                <Calendar
              
                onDayPress={(day) =>this.setState({date: day.dateString})}/>
                </View>:null}

            </ImageBackground>

        );
    }
};

export default AddEvent;

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
        
});

