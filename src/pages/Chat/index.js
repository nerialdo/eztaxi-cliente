import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState, useCallback } from 'react';
import { GiftedChat, Send } from 'react-native-gifted-chat'
import { Alert } from 'react-native';
import { StyleSheet, View, Dimensions, Platform} from 'react-native';
import { 
  Container,
  Text,
  Heading,
  Center,
  VStack,
  HStack,
  NativeBaseProvider,
  HamburgerIcon,
  CloseIcon,
  Icon,
  Circle,
  Modal,
  Button,
  Avatar
} from "native-base";
import {AntDesign, EvilIcons, FontAwesome5, MaterialIcons, Ionicons} from "@expo/vector-icons"
import {useAuth} from '../../contexts/auth';
import MapView from 'react-native-maps';
import * as Location from 'expo-location';

import Map from '../../componets/Map';
import MyMenu from '../../componets/Menu';
import styled, { css } from 'styled-components/native';
import * as dayjs from 'dayjs'
import 'dayjs/locale/pt-br' 

dayjs.locale('pt-br')

const Chat = ({route}) => {

  const {idMotorista, nomeMotorista, pictureMotorista, idTransacao} = route.params;

  const {user, iniciarChat, onSend, messages} = useAuth()
  
  // const { colors } = useTheme()

  useEffect(() => {
    console.log('Dados no chat', user, idTransacao)
    if(idTransacao){
      iniciarChat(idTransacao)
    }
    // const collectionRef = collection(database, 'chats');
    // const q = query(collectionRef, orderBy('createdAt', 'desc'));

    // const unsubscribe = onSnapshot(q, querySnapshot => {
    //   setMessages(
    //     querySnapshot.docs.map(doc => ({
    //       _id: doc.data()._id,
    //       createdAt: doc.data().createdAt.toDate(),
    //       text: doc.data().text,
    //       user: doc.data().user
    //     }))
    //   );
    // });

    // return () => unsubscribe();
  }, []);


  return (
    <View style={{
      // display: 'flex',
      // justifyContent: 'space-between',
      // alignItems: 'center',
      // flexDirection: 'row',
      backgroundColor: 'white',
      // position: 'absolute',
      top: Platform.select({ ios: 0, android: 0 }),
      // left: 20,
      // right: 20,
      paddingLeft: 20,
      paddingRight: 20,
      width: '100%',
      height: '100%',
      padding: 10,
      // zIndex: 9999
    }}>
      <View
        style={{
          display: 'flex',
          justifyContent:'flex-start',
          alignItems: 'center',
          flexDirection: 'row',
          backgroundColor: '#fafaf9',
          borderRadius: 10,
          padding: 5
        }}
      >
        <Avatar 
          bg="green.500" source={{
            uri: pictureMotorista
          }}
        >
            {nomeMotorista}
        </Avatar>
        <View style={{padding: 5}}>
          <Text>
            Motorista
          </Text>
          <Text style={{fontSize: 16, fontWeight: 'bold'}}>
            {nomeMotorista}
          </Text>
        </View>
      </View>
      <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        showAvatarForEveryMessage={true}
        user={{
          _id: user.id,
          name: user.name,
          avatar: user.picture,
          idTransacao,
          to:{
            _id: idMotorista,
            name: nomeMotorista,
            avatar: pictureMotorista
          }
        }}
        placeholder="Chat direto com o motorista"
        locale='pt-br'
        // renderSend={props => {
        //   return (
        //     <Send
        //       {...props}
        //       containerStyle={{
        //         height: 60,
        //         width: 60,
        //         justifyContent: 'center',
        //         alignItems: 'center',
        //       }}
        //     >
        //       <IconMenu onPress={(messages) => onSend(messages)}>
        //             <Text>Enviar</Text>
        //         </IconMenu>
        //     </Send>
        //   )
        // }}
      />
    </View>
  );
}

export default Chat

const IconMenu = styled.TouchableOpacity`
  padding: 5px
`;