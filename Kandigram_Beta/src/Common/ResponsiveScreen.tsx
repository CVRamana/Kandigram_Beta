import { Dimensions } from "react-native";
let w=Dimensions.get('window').width
let h=Dimensions.get('window').height
export function calculateHeight(viewHeight:number){
    let tempHeight=(viewHeight/800*100)
    return tempHeight+'%'.toString()

}
export function calculateWidth(viewWidth:number){
    let tempWidth=(viewWidth/375*100)
    return tempWidth+'%'.toString()
}
