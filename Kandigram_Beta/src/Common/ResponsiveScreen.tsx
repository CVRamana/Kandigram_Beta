import { Dimensions } from "react-native";
import { widthPercentageToDP,heightPercentageToDP } from "react-native-responsive-screen";
let w = Dimensions.get('window').width
let h = Dimensions.get('window').height


export function calculateHeight(viewHeight: number) {
    let tempHeight = (viewHeight / 800 * 100)
    return tempHeight + '%'.toString()
}

export function calculateWidth(viewWidth: number) {
    let tempWidth = (viewWidth / 375 * 100)
    return tempWidth + '%'.toString()
}

export function vh(h:number){
    let tempHeight = (h / 800 * 100)
    return heightPercentageToDP(tempHeight + '%'.toString())
}
export function vw(w:number){
    let tempHeight = (w / 375* 100)
    return widthPercentageToDP(tempHeight + '%'.toString())
}
