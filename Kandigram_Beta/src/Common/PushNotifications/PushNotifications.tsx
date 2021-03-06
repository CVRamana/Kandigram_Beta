import * as React from 'react';
import { Text, View, StyleSheet,Alert } from 'react-native';
import firebase  from "react-native-firebase";
//import type { Notification } from 'react-native-firebase';


interface PushNotificationsProps {
    notificationListener:Function

}

class PushNotifications extends React.Component<PushNotificationsProps>{

   componentDidMount(){
    this.checkPermission();
   this.createNotificationListeners(); 

    }
      checkPermission ()  {
        const enabled =  firebase.messaging().hasPermission();
        if (enabled) {
            this.getToken();
        } else {
            this.requestPermission();
        }
      }
      getToken() {
        let fcmToken = firebase.messaging().getToken();
        if (!fcmToken) {
            fcmToken =  firebase.messaging().getToken();
            if (fcmToken) {
                alert(fcmToken)
            
            }
        }
      }

    requestPermission() {
        try {
          firebase.messaging().requestPermission();
            // User has authorised
            this.getToken();
        } catch (error) {
            // User has rejected permissions
            console.log('permission rejected');
        }
      }

      async createNotificationListeners() {
        /*
        * Triggered when a particular notification has been received in foreground
        * */
        this.notificationListener = firebase.notifications().onNotification((notification) => {
          const { title, body } = notification;
          console.log('onNotification:');
          
            const localNotification = new firebase.notifications.Notification({
              sound: 'sampleaudio',
              show_in_foreground: true,
            })
            .setSound('sampleaudio.wav')
            .setNotificationId(notification.notificationId)
            .setTitle(notification.title)
            .setBody(notification.body)
            .android.setChannelId('fcm_FirebaseNotifiction_default_channel') // e.g. the id you chose above
            .android.setSmallIcon('@drawable/ic_launcher') // create this icon in Android Studio
            .android.setColor('#000000') // you can set a color here
            .android.setPriority(firebase.notifications.Android.Priority.High);
    
            firebase.notifications()
              .displayNotification(localNotification)
              .catch(err => console.error(err));
        });
    
        const channel = new firebase.notifications.Android.Channel('fcm_FirebaseNotifiction_default_channel', 'Demo app name', firebase.notifications.Android.Importance.High)
          .setDescription('Demo app description')
          .setSound('sampleaudio.wav');
        firebase.notifications().android.createChannel(channel);
    
        /*
        * If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
        * */
        this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
          const { title, body } = notificationOpen.notification;
          console.log('onNotificationOpened:');
          Alert.alert(title, body)
        });
    
        /*
        * If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
        * */
        const notificationOpen = await firebase.notifications().getInitialNotification();
        if (notificationOpen) {
          const { title, body } = notificationOpen.notification;
          console.log('getInitialNotification:');
          Alert.alert(title, body)
        }
        /*
        * Triggered for data only payload in foreground
        * */
        this.messageListener = firebase.messaging().onMessage((message) => {
          //process data message
          console.log("JSON.stringify:", JSON.stringify(message));
        });
      }


    render()
    {
  return (
    <View style={styles.container}>
     
    </View>
  );
    }
};

export default PushNotifications;

const styles = StyleSheet.create({
  container: {}
})
