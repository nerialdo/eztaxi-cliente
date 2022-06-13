import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import { Alert, TouchableOpacity } from 'react-native';
import { StyleSheet, View, Dimensions, Platform} from 'react-native';
import { 
  Container,
  Text,
  Heading,
  Center,
  VStack,
  Button,
  NativeBaseProvider,
  HamburgerIcon,
  CloseIcon,
  Icon,
  Circle
} from "native-base";
import {AntDesign, EvilIcons, FontAwesome5, MaterialIcons, Ionicons} from "@expo/vector-icons"
import {useAuth} from '../../contexts/auth';
import MapView from 'react-native-maps';
import * as Location from 'expo-location';

import styled, { css } from 'styled-components/native';
import LottieView from 'lottie-react-native';

const Esperando = ({ navigation, handleBack, desabilitarTelaEspera }) => {
  const {user, idTransacao, removerOrder, aceite, cancelarCorrida, novaOrder} = useAuth()
  const [menuTop, setMenuTop] = useState(true)
  const [showMenu, seShowMenu] = useState(false)
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;   
  
  // const { colors } = useTheme()

  // console.log('ACeitou', aceite)
  // if(aceite === 'sim'){
  //   alert('Motorista aceitou')
  //   desabilitarTelaEspera()
  // }else{
  //   // desabilitarTelaEspera()
  // }
  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      desabilitarTelaEspera()
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);
  
  useEffect(() => {
    console.log('idTransacao', idTransacao)
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
  

  const handleShowMenu = () => {
    seShowMenu(!showMenu)
  }
  

  return (
    <>
      <View style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
          backgroundColor: 'white',
          // position: 'absolute',
          top: Platform.select({ ios: 60, android: 40 }),
          // left: 20,
          // right: 20,
          paddingLeft: 0,
          paddingRight: 0,
          width: '100%',
          height: '100%',
          padding: 5,
          zIndex: 9999
      }}>
        <Center
          // height={windowHeight} 
          // bg="indigo.300"
          // bg="light.50"
          padding={2}
          width={{
            base: windowWidth,
            lg: windowWidth
          }}
        >
          {aceite === 'aguardando' && (
            <VStack width={'100%'} padding={2} borderRadius={10} space={4} alignItems="center" >
              <LottieView
                source={require('../../../assets/buscando_veiculo.json')} 
                autoPlay loop 
                style={{
                  width: '100%'
                }}
              />
              {/* <Heading textAlign={'center'}>
                <Text color="emerald.500">Aguardando resposta do motorista</Text>
              </Heading> */}
              {idTransacao && (
                <Button size={'md'} variant="ghost" onPress={() => {
                  // removerOrder(idTransacao)
                  cancelarCorrida([{'id': idTransacao}], 'Não informado')
                  desabilitarTelaEspera()
                }}>
                  Cancelar
                </Button>
              )}
              <VStack space={4} alignItems="center">
                <Text mt="1" textAlign={'center'} fontWeight="light" fontSize={11}>
                  ID TRANSAÇÃO
                </Text>
                <Text mt="3" textAlign={'center'} fontWeight="medium" marginTop={-3}>
                  {idTransacao}
                </Text>
              </VStack>
            </VStack>
          )}
          {aceite === 'sim' && (
            <VStack width={'100%'} padding={2} borderRadius={10} space={4} alignItems="center" >
              <VStack space={4} alignItems="center">
                <Text mt="1" textAlign={'center'} fontWeight="bold" fontSize={16}>
                  Motorista aceitou.
                </Text>
              </VStack>
              <LottieView
                source={require('../../../assets/sucesso_aceite.json')} 
                autoPlay loop 
                style={{
                  width: '50%'
                }}
              />
              {/* <Heading textAlign={'center'}>
                <Text color="emerald.500">Aguardando resposta do motorista</Text>
              </Heading> */}
   
              <VStack space={4} alignItems="center">
                <Text mt="1" textAlign={'center'} fontWeight="light" fontSize={11}>
                  Aguarde estamos redirecionando
                </Text>
                <Text mt="1" textAlign={'center'} fontWeight="light" fontSize={11}>
                  ID TRANSAÇÃO
                </Text>
                <Text mt="3" textAlign={'center'} fontWeight="medium" marginTop={-3}>
                  {idTransacao}
                </Text>
              </VStack>
            </VStack>
          )}
          {aceite === 'nao' && (
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
              {/* <Heading textAlign={'center'}>
                <Text color="emerald.500">Aguardando resposta do motorista</Text>
              </Heading> */}
   
              <VStack space={4} alignItems="center">
                <Text mt="1" textAlign={'center'} fontWeight="light" fontSize={11}>
                O motorista recusou sua corrida, peço que faça uma nova busca e selecione outro motorista
                </Text>
                <Button 
                  size={'md'} 
                  variant="ghost" 
                  onPress={() => {
                    navigation.push('Dashboard');
                  }}
                >
                  Retornar
                </Button>
                <Text mt="1" textAlign={'center'} fontWeight="light" fontSize={11}>
                  ID TRANSAÇÃO
                </Text>
                <Text mt="3" textAlign={'center'} fontWeight="medium" marginTop={-3}>
                  {idTransacao}
                </Text>
              </VStack>
            </VStack>
          )}
          {/* <VStack space={4} alignItems="center">
            <Text mt="3" textAlign={'center'} fontWeight="medium">
              Ao cancelar, este pedido deixa de ser exibido para o motorista
            </Text>
          </VStack> */}
        </Center>
        {/* <Center>
          <Container>
            <Heading>
              A component library for the
              <Text color="emerald.500"> React Ecosystem</Text>
            </Heading>
            <Text mt="3" fontWeight="medium">
              NativeBase is a simple, modular and accessible component library that
              gives you building blocks to build you React applications.
            </Text>
          </Container>
        </Center> */}
      </View>
      {/* <View style={styles.container}>
        <Text>Teste</Text>
      </View> */}
    </>
  );
}

export default Esperando

const IconMenu = styled.TouchableOpacity`
  padding: 5px
`;