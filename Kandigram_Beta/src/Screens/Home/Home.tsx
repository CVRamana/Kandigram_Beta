import * as React from 'react';
import { Text, View, StyleSheet, ImageBackground,Animated,Easing, Image } from 'react-native';
import index from "../../Utils/Constants/index";
import { widthPercentageToDP, heightPercentageToDP } from 'react-native-responsive-screen';
import { calculateWidth, calculateHeight } from '../../Common/ResponsiveScreen';
import ButtonComponent from '../../Common/ButonComponent';
import { TouchableOpacity } from 'react-native-gesture-handler';
import colors from '../../Utils/Constants/colors';
import {  connect} from "react-redux";

interface HomeProps{}

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.animatedValue = new Animated.Value(0)
  
    this.state = {
      left:true
       
    };
  };
  componentDidMount(){
    alert(this.props.uid)
  }

  animate () {
   // this.setState({left:!this.state.left})
    console.warn(this.state.left)
    this.animatedValue.setValue(0)
    Animated.timing(
      this.animatedValue,
      {
        toValue: 1,
        duration: 500,
        easing: Easing.bounce
      }
    ).start()
  }
  
    render(){
    
      const marginAnimLeft = this.animatedValue.interpolate({
        inputRange: [0, 1],
        
        outputRange: [0, 168]
      }) 
      const marginRight = this.animatedValue.interpolate({
        inputRange: [0, 1],
        
        outputRange: [168, 0]
      })
    
  return (
    <ImageBackground style={styles.container}>

      <ImageBackground
    //  resizeMode={"contain"}
     resizeMethod="resize"
    source={index.image.HomeBG}
    style={styles.homebg}
     >
       <View style={{flexDirection:"row",marginTop:54,}}>
        <Text style={styles.HomeText}>Home</Text>
        
        <TouchableOpacity>
        <Image
        source={index.image.search}
        style={{marginLeft: 220,}}/>
        </TouchableOpacity>
        {/* on saved Press */}
        <TouchableOpacity
        onPress={()=>this.props.navigation.navigate('ChatApp',{uid:this.props.uid})}
        >
        <Image
         style={{marginLeft: 24,}}
         source={index.image.saved}/>
             </TouchableOpacity>

         </View>
         <View style={styles.tab}>


           <Animated.View 
            style={[styles.made,
             { marginLeft:this.state.left ? marginAnimLeft : marginRight,
             // height: 30,
             // width: 40,
             // backgroundColor: 'red'
            }
            ]}

           >
           <TouchableOpacity //
           style={[styles.made,{justifyContent:"center",alignItems:"center",backgroundColor:"red"}]}
           onPress={()=> this.setState({left:!this.state.left},()=>this.animate())
          // 
           }>
        
           {this.state.left ?
           <Text>Made </Text> :  <Text>Discover </Text> }
           </TouchableOpacity>

           </Animated.View>
           

           </View>
 </ImageBackground>

 <Image
 style={styles.emptyImg}
 source={index.image.empty}
 resizeMode={"contain"}
 >
  
   </Image>
   <View style={styles.textContainer}>

  <Text style={styles.txt}> {index.strings.createKandi}</Text>

</View>
<ButtonComponent
name={"Get Kandi Beads"}
onButtonPress={()=>this.props.navigation.navigate('CreateKandi')}

myStyle={{ 
  marginLeft:widthPercentageToDP(calculateWidth(20)),
  marginTop:heightPercentageToDP(calculateHeight(35))}}
/>

    </ImageBackground>
  );
}
}
const mapStateToProps=(state:any)=>{
  return{
  uid:state.PersistReducer.uid
  }
}

export default connect(mapStateToProps) (Home);

const styles = StyleSheet.create({
  container: {flex:1,
backgroundColor:"rgb(19 ,31 ,52)"},
  homebg:{
    //  position:"absolute",
 //     top:0,
      backgroundColor:"transparent",
      width:"100%",
      height: heightPercentageToDP(calculateHeight(250))
  },
  emptyImg:{
    height: heightPercentageToDP(calculateHeight(140)),
    width:widthPercentageToDP(calculateWidth(140)),
     marginLeft:widthPercentageToDP(calculateWidth(118)),
    marginTop:heightPercentageToDP(calculateHeight(60))
  },textContainer:{
    justifyContent:"center",
    alignItems:"center",
  height:heightPercentageToDP(calculateHeight(64)),
    width:widthPercentageToDP(calculateWidth(276)),
    marginLeft:widthPercentageToDP(calculateWidth(50)),
    marginTop:heightPercentageToDP(calculateHeight(10))
  },txt:{
    fontFamily: "Ubuntu-Medium",
    fontSize: 20,
    textAlign:"center",
    fontWeight: "bold",
    fontStyle: "normal",
    lineHeight: 32,
    letterSpacing: 0.24,
    color: "#e2e2e2"
  },HomeText:{
    fontFamily: "Ubuntu",
  fontSize: 24,
  fontWeight: "bold",
  fontStyle: "normal",
  letterSpacing: 0.29,
  color: index.colors.whiteColor,
  marginLeft: 16,
  },tab:{
    width:widthPercentageToDP(calculateWidth(343)),
    marginLeft: 18,
    marginTop:heightPercentageToDP(calculateHeight(26)),
  height: heightPercentageToDP(calculateHeight(54)),
  borderRadius: 1000,
  backgroundColor: "transparent",
  borderColor:colors.whiteColor,
  borderWidth:3
  },
  made:{
    width: widthPercentageToDP(calculateWidth(184)),
  height:  heightPercentageToDP(calculateHeight(48)),
  borderRadius: 1000,
  justifyContent:"center",
  alignItems:"center",
  backgroundColor:"grey"

  }
});
