import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Platform, UIManager,LayoutAnimation} from 'react-native';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}
export default class AnimatedCollapsible extends React.Component {
    constructor(props) {
      super(props)
    
      this.state = {
        expanded: false,
        left:true
      };
    };

  render() {
    return (
      <View style={{overflow: 'hidden',paddingTop:100}}>
        <TouchableOpacity
          onPress={() => {
            LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
            this.setState({expanded: !this.state.expanded});
          }}>
          <Text>
            Press me to {this.state.expanded ? 'collapse' : 'expand'}!
          </Text>
        </TouchableOpacity>
        {this.state.expanded && <Text>I disappear sometimes!</Text>}





        <TouchableOpacity onPress={()=>{
            LayoutAnimation.configureNext(LayoutAnimation.Presets.spring)
            this.setState({left: !this.state.left})
        }}>
        <View style={{ height:100,width:300,
        marginLeft:50,
        backgroundColor:"lightgrey",
        flexDirection:"row"}}> 
        
       
{ this.state.left ?
        <View style={{height:100,width:150,backgroundColor:"green",justifyContent:"center",alignItems:"center"}}>
            <Text> Left</Text>
            <Text style={{marginRight:-300,marginTop:-12}}> Right </Text>
 </View> : <View style={{height:100,width:150,backgroundColor:"green",marginLeft:150,justifyContent:"center",alignItems:"center"}}>
            <Text> Right</Text>
            <Text style={{marginLeft:-300,marginTop:-12}}> Lefft </Text>
 </View>
  }
            
            </View>
            </TouchableOpacity>
      </View>
    );
  }
}