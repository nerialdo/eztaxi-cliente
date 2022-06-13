import React, { useState, useCallback, useEffect } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { GiftedChat, Send, SendIcon } from 'react-native-gifted-chat'
import { VStack, HStack, Avatar, Text, IconButton, CloseIcon } from 'native-base';
import { useAuth } from '../../contexts/auth';
import * as dayjs from 'dayjs'
import 'dayjs/locale/pt-br' 

dayjs.locale('pt-br')

export function Chat({fecharAbrirChat, order}) {
    const {
        user, iniciarChat, onSend, messages, 
        novaOrder, expoPushToken
    } = useAuth()
    const [ corridaAberta, setCorridaAberta ] = useState(null)
    // const [messages, setMessages] = useState([]);
    
    useEffect(() => {
          console.log('=====>', novaOrder[0], order)
        //   setCorridaAberta(novaOrder ? novaOrder[0] : null)
          if(order){
            iniciarChat(order)
          }
        // setMessages([
        // {
        //     _id: 1,
        //     text: 'Hello developer',
        //     createdAt: new Date(),
        //     user: {
        //     _id: 2,
        //     name: 'React Native',
        //     avatar: 'https://placeimg.com/140/140/any',
        //     },
        // },
        // ])
    }, [])
    
    // const onSend = useCallback((messages = []) => {
    //     setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
    // }, [])

    // const renderSend = (props) => {
    //     return (
    //       <Send
    //         {...props}
    //         containerStyle={styles.sendContainer}
    //       >
    //         <SendIcon width={22.7} height={22.38} />
    //       </Send>
    //     );
    //   }
    
    return (
        <View style={{
            position: 'absolute',
            top: 0,
            width: '100%',
            height: '100%',
        }}>
            
            <View 
                onPress={() => {fecharAbrirChat()}}
                style={{
                    position: 'absolute',
                    top: Platform.select({ ios: 40, android: 20 }),
                    // padding: 15,
                    left: 0,
                    width: '100%',
                    padding: 5,
                    zIndex: 99999,
                    backgroundColor: 'white'
                }}
            >
            {order && (
                <VStack space={1} flexShrink={1} w="100%">
                    <HStack flexShrink={1} space={2} alignItems="center" justifyContent="space-between">
                        <HStack flexShrink={1} space={2} alignItems="center">
                            <Avatar bg="amber.500" source={{
                            uri: order ? order.data.dadosCorrida.picture : ''
                            }} size="md">
                                EZ
                                <Avatar.Badge bg="green.500" />
                            </Avatar>
                            <VStack>
                                <Text fontSize="md" fontWeight="medium" _dark={{
                                    color: "coolGray.800"
                                }}>
                                    {order ? order.data.dadosCorrida.nome : ''}
                                </Text>
                                <Text fontSize="xs" fontWeight="normal" _dark={{
                                    color: "coolGray.800"
                                }}>
                                    Online agora {order ? '(' + order.id+ ')' : ''}
                                </Text>
                            </VStack>
                        </HStack>
                        <IconButton 
                            variant="unstyled" 
                            _focus={{
                                borderWidth: 0
                            }} 
                            icon={<CloseIcon size="3" color="coolGray.600" />} 
                            onPress={() => {fecharAbrirChat()}} 
                        />
                    </HStack>
                </VStack>
            )}
            </View>
            {order && (
                <GiftedChat
                    messages={messages}
                    onSend={messages => onSend(messages)}
                    showAvatarForEveryMessage={true}
                    user={{
                        _id: user.id,
                        name: user.name,
                        avatar: user.picture,
                        idTransacao : order.id,
                        expoPushToken: expoPushToken,
                        to:{
                            _id: order.data.idMotorista,
                            name: order.data.dadosCorrida.nome,
                            avatar: order.data.dadosCorrida.picture,
                        }
                    }}
                    placeholder="Chat direto com o motorista"
                    locale='pt-br'
                    renderSend={props => {
                        return (
                            <Send {...props}>
                                <View style={{ padding: 10}}>
                                    <Text style={{fontWeight: 'bold'}}>Enviar</Text>
                                </View>
                            </Send>
                        )
                    }}
                />
            )}
            {/* <GiftedChat
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
            /> */}
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  
});