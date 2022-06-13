import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import { Alert } from 'react-native';
import { StyleSheet, ActivityIndicator, View, TouchableOpacity} from 'react-native';
import {
  Box,
  FlatList,
  Heading,
  Avatar,
  HStack,
  VStack,
  Text,
  Spacer,
  Center,
  NativeBaseProvider,
} from "native-base"
import {useAuth} from '../../contexts/auth';
import { format, parseISO, formatISO } from 'date-fns'
import LottieView from 'lottie-react-native';
import { GiftedChat, Send } from 'react-native-gifted-chat'
import { Chat } from '../../componets/Chat';


const CorridaAberta = ({ }) => {

  const { 
    loading, novaOrder, user, logout, 
    cancelarCorrida, messages, onSend, iniciarChat, 
    idTransacao, limparOrder} = useAuth()
  const [ corridaAberta, setCorridaAberta ] = useState([])
  const [ isCaht, setIsChat ] = useState(false)
 

  useEffect(() => {
    console.log('novaOrder pagina CorridaAberta', novaOrder)
    setCorridaAberta(novaOrder)
    if(idTransacao){
      iniciarChat(idTransacao)
    }
  }, [novaOrder]);


  const fecharAbrirChat = () => {
    setIsChat(!isCaht)
  }


  return (
      <>
      {novaOrder.data.status === 'PENDENTE' && (
        <View style={styles.container}>
           <Heading fontSize="xl" p="4" pb="3">
              Aguardando motorista aceitar
            </Heading>
            <Heading fontSize="md" p="1" pb="1" color={'gray.400'} fontWeight='normal'>
              {/* <LottieView
                source={require('../../../assets/buscando_veiculo.json')} 
                autoPlay loop 
                style={{
                  width: '100%'
                }}
              /> */}
              Esta tela será atualizada automaticamente
            </Heading>
            <View style={{marginTop:20, display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}}>
              <TouchableOpacity
                onPress={() => {
                  cancelarCorrida(novaOrder, 'Não informado')
                }}
                style={{
                  // width:'100%',
                  //backgroundColor: '#22d3ee',
                  borderColor: '#22d3ee',
                  borderWidth: 2,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems:'center',
                  padding: 10,
                  borderRadius: 10,
                  margin: 5

                }}
              >
                <Text style={{color: '#22d3ee'}}>Cancelar Corrida</Text>
              </TouchableOpacity>
          </View>
        </View>
      )}
      {novaOrder.data.status === 'RECUSOU' && (
        <View style={styles.container}>
          <VStack width={'100%'} padding={2} borderRadius={10} space={4} alignItems="center" >
            <VStack space={4} alignItems="center">
              <Text mt="1" textAlign={'center'} fontWeight="bold" fontSize={16}>
                Desculpe, o motorista recusou.
              </Text>
            </VStack>
            <LottieView
              source={require('../../../assets/erro_aceite.json')} 
              autoPlay loop 
              style={{
                width: '50%'
              }}
            />
            <Text mt="1" textAlign={'center'} fontWeight="light" fontSize={11}>
                O motorista recusou sua corrida, faça uma nova busca e selecione outro motorista
            </Text>
          </VStack>
          <View style={{marginTop:20, display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}}>
              <TouchableOpacity
                onPress={() => {
                  limparOrder()
                }}
                style={{
                  // width:'100%',
                  //backgroundColor: '#22d3ee',
                  borderColor: '#22d3ee',
                  borderWidth: 2,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems:'center',
                  padding: 10,
                  borderRadius: 10,
                  margin: 5

                }}
              >
                <Text style={{color: '#22d3ee'}}>Retornar</Text>
              </TouchableOpacity>
          </View>
        </View>
      )}
      {!isCaht && novaOrder.data.status === 'ACEITOU' && (
        <View style={styles.container}>
          <Heading fontSize="xl" p="4" pb="3">
            Veículo a caminho!
          </Heading>
          <Heading textAlign={'center'} fontSize="md" p="1" pb="1" color={'gray.400'} fontWeight='normal'>
            Você possui uma corrida em aberto, aguarde o veículo na sua localização atual.
          </Heading>
          <LottieView
              source={require('../../../assets/loading-23.json')} 
              autoPlay loop 
              style={{
                width: '50%'
              }}
          />
          <View style={{marginTop:20, display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}}>
              <TouchableOpacity
                onPress={() => {
                  cancelarCorrida(novaOrder, 'Não informado')
                }}
                style={{
                  // width:'100%',
                  //backgroundColor: '#22d3ee',
                  borderColor: '#22d3ee',
                  borderWidth: 2,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems:'center',
                  padding: 10,
                  borderRadius: 10,
                  margin: 5

                }}
              >
                <Text style={{color: '#22d3ee'}}>Cancelar Corrida</Text>
              </TouchableOpacity>
          </View>
          <View style={{marginTop: 20}}>
            <Heading onPress={fecharAbrirChat} fontSize="md" p="1" pb="1" color={'gray.400'} fontWeight='normal'>
              Fale com o motorista
            </Heading>
          </View>
        </View>
      )}
      {isCaht && (
        // <View style={styles.container}>
          <Chat 
            fecharAbrirChat={fecharAbrirChat} order={novaOrder}
          />
        // </View>
      )}
      </>
  );
}

export default CorridaAberta

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

});

