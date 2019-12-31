
export function calculateHeight(viewHeight:number){
    let tempHeight=(viewHeight/700*100)
    return tempHeight+'%'.toString()

}
export function calculateWidth(viewWidth:number){
    let tempWidth=(viewWidth/400*100)
    return tempWidth+'%'.toString()
}
