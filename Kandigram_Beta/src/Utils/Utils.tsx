//@ts-ignore
//import { RNS3 } from 'react-native-aws3';
// import Snackbar from 'react-native-snackbar';
import index from "./Constants/index";
export function getApiUrlAccordingToEnvironment() {
    return "http://appsin.appskeeper.com:3036/"
}



export function UploadImageToS3(imageLocalUrl: any, fileName: any, callback: any) {

    const file = {
        uri: imageLocalUrl,
        name: fileName,
        type: "image/jpeg"
    }
    const options = {
        keyPrefix: "source-images/",
        bucket: 'appinventiv-imgresize',
        region: 'us-east-1',
        accessKey: 'AKIAUDBVJZ4SPZAUKFKZ',
        secretKey: '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',
        successActionStatus: 201
    }
    debugger
    RNS3.put(file, options).then((response: any) => {
        debugger
       console.log(JSON.stringify(response))
        if (response.status == 201) {
            let source = { uri: response.body.postResponse.location};
            callback(source)
        }
    }).catch((error: any) => {
        console.log(error);
    });
}

export  function resizeImage (url: string, type: string = '200X200') {
    if(url.includes('/source-images')){
        url = url.replace(/(\.[\w\d_-]+)$/i, `_${type}$1`).replace('source-images','resize_images');
        console.log("resize url",url)
        return url;
    }else{
        return url;
    }
}
export function showSnackBar(message:any){
   Snackbar.show({
        title:message,
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor:index.colors.snackBarColor,
        color:index.colors.snackBarTextColor
    });
}
