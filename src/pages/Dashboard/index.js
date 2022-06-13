import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { StyleSheet, View, Dimensions, Platform, TouchableOpacity} from 'react-native';
import { 
  Container,
  Text,
  Heading,
  Center,
  NativeBaseProvider,
  HamburgerIcon,
  CloseIcon,
  Icon
} from "native-base";
import {useAuth} from '../../contexts/auth';
import MapView from 'react-native-maps';
import * as Location from 'expo-location';

import Map from '../../componets/Map';
import MyMenu from '../../componets/Menu';
import styled, { css } from 'styled-components/native';

const Dashboard = ({ navigation, route }) => {
  const {user} = useAuth()
  const [menuTop, setMenuTop] = useState(true)
  const [showMenu, seShowMenu] = useState(false)
  
  // const { colors } = useTheme()

  const rotasTelas = (tela) => {
    handleShowMenu()
    navigation.push(tela);
  }

  useEffect(() => {
    // navigation.toggleDrawer();
    // setRegion({
    //   latitude: 37.78825,
    //   longitude: -122.4324,
    //   latitudeDelta: 0.0922,
    //   longitudeDelta: 0.0421,
    // })

  }, [])

  const handleMenuTop = () => {
    setMenuTop(!menuTop)
  }
  
  const handleMenuTop2 = () => {
    setMenuTop(!menuTop)
  }

  const handleShowMenu = () => {
    seShowMenu(!showMenu)
  }
  

  return (
    <>
      {/* <View style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: 'row',
          // position: 'absolute',
          top: Platform.select({ ios: 60, android: 40 }),
          // left: 20,
          // right: 20,
          paddingLeft: 20,
          paddingRight: 20,
          width: '100%',
          height: 'auto',
          padding: 5,
          zIndex: 9999
      }}>
          {menuTop && (
              <TouchableOpacity 
                style={{
                  padding: 5
                }}
                onPress={handleShowMenu}
              >
                  {!showMenu && (
                    <HamburgerIcon 
                      onPress={() => {
                        handleShowMenu()
                      }}
                      style={{fontSize: 25}} 
                    />
                  )}
                  {showMenu && (
                    <CloseIcon 
                      onPress={() => {
                        handleShowMenu()
                      }}
                      style={{fontSize: 20}} 
                    />
                  )}
              </TouchableOpacity>
          )}
      </View> */}
      <Map handleMenuTop={handleMenuTop} handleMenuTop2={handleMenuTop2} navigation={navigation}/>
      {showMenu && (
        <MyMenu navigation={navigation} rotasTelas={rotasTelas} />
      )}
    </>
  );
}

export default Dashboard

const IconMenu = styled.TouchableOpacity`
  padding: 5px,
`;


// import Constants from 'expo-constants';
// import * as Notifications from 'expo-notifications';
// import React, { useState, useEffect, useRef } from 'react';
// import { Text, View, Button, Platform } from 'react-native';

// Notifications.setNotificationHandler({
//   handleNotification: async () => ({
//     shouldShowAlert: true,
//     shouldPlaySound: false,
//     shouldSetBadge: false,
//   }),
// });

// export default function App() {
//   const [expoPushToken, setExpoPushToken] = useState('');
//   const [notification, setNotification] = useState(false);
//   const notificationListener = useRef();
//   const responseListener = useRef();

//   useEffect(() => {
//     registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

//     notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
//       setNotification(notification);
//     });

//     responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
//       console.log("response notification ",  response);
//     });

//     return () => {
//       Notifications.removeNotificationSubscription(notificationListener.current);
//       Notifications.removeNotificationSubscription(responseListener.current);
//     };
//   }, []);

//   return (
//     <View
//       style={{
//         flex: 1,
//         alignItems: 'center',
//         justifyContent: 'space-around',
//       }}
//     >
//       <Text>Your expo push token: {expoPushToken}</Text>
//       <View style={{ alignItems: 'center', justifyContent: 'center' }}>
//         <Text>Title: {notification && notification.request.content.title} </Text>
//         <Text>Body: {notification && notification.request.content.body}</Text>
//         <Text>Data: {notification && JSON.stringify(notification.request.content.data)}</Text>
//       </View>
//       <Button
//         title="Press to schedule a notification"
//         onPress={async () => {
//           await schedulePushNotification();
//         }}
//       />
//     </View>
//   );
// }

// async function schedulePushNotification() {
//   alert('tete')
//   // await Notifications.scheduleNotificationAsync({
//   //   content: {
//   //     title: "You've got mail! 📬",
//   //     body: 'Here is the notification body',
//   //     data: { data: 'goes here' },
//   //   },
//   //   trigger: { seconds: 2 },
//   // });
//   await fetch('https://exp.host/--/api/v2/push/send', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     // to: "ExponentPushToken[HoRWXVB76JN2coSrVbZp96]",
//     // title:"hello",
//     // body: "world",
//     body: JSON.stringify({ 
//       to: "ExponentPushToken[HoRWXVB76JN2coSrVbZp96]",
//       title:"hello 2",
//       body: "world",
//     })
//     // body: JSON.stringify({
//     //   userId,
//     //   expoPushToken,
//     // }),
//   });
// }

// async function registerForPushNotificationsAsync() {
//   let token;
//   if (Constants.isDevice) {
//     const { status: existingStatus } = await Notifications.getPermissionsAsync();
//     let finalStatus = existingStatus;
//     if (existingStatus !== 'granted') {
//       const { status } = await Notifications.requestPermissionsAsync();
//       finalStatus = status;
//     }
//     if (finalStatus !== 'granted') {
//       alert('Failed to get push token for push notification!');
//       return;
//     }
//     token = (await Notifications.getExpoPushTokenAsync()).data;
//     console.log("Token notificarion", token);
//   } else {
//     alert('Must use physical device for Push Notifications');
//   }

//   if (Platform.OS === 'android') {
//     Notifications.setNotificationChannelAsync('default', {
//       name: 'default',
//       importance: Notifications.AndroidImportance.MAX,
//       vibrationPattern: [0, 250, 250, 250],
//       lightColor: '#FF231F7C',
//     });
//   }

//   return token;
// }