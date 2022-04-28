import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
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
  Button
} from "native-base";
import {AntDesign, EvilIcons, FontAwesome5, MaterialIcons, Ionicons} from "@expo/vector-icons"
import {useAuth} from '../../contexts/auth';
import MapView from 'react-native-maps';
import * as Location from 'expo-location';

import Map from '../Map';
import MyMenu from '../Menu';
import styled, { css } from 'styled-components/native';

const Checkout = ({ 
  showModal, 
  abrirModal,
  selected,
  chamarTelaChat
 }) => {
  const {user} = useAuth()
  const [menuTop, setMenuTop] = useState(true)
  const [showMenu, seShowMenu] = useState(false)
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;   
  
  // const { colors } = useTheme()
  // console.log('dadosCorridadadosCorrida', showModal, selected)
  // useEffect(() => {
  //   // setRegion({
  //   //   latitude: 37.78825,
  //   //   longitude: -122.4324,
  //   //   latitudeDelta: 0.0922,
  //   //   longitudeDelta: 0.0421,
  //   // })
  // }, [])


  function moedaBR(amount, decimalCount = 2, decimal = ",", thousands = "."){
    try {
      decimalCount = Math.abs(decimalCount);
      decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

      const negativeSign = amount < 0 ? "-" : "";

      let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
      let j = (i.length > 3) ? i.length % 3 : 0;

      return negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) + (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : "");
    } catch (e) {
      //(e)
    }
  }

  return (
    <Center>
      <Modal isOpen={showModal} onClose={() => abrirModal()} size="lg">
        <Modal.Content maxWidth="350">
          <Modal.CloseButton />
          <Modal.Header>Dados da corrida</Modal.Header>
          <Modal.Body>
            <VStack space={4}>
              {selected.data.aceite === null && (
                <HStack 
                  alignItems="center" 
                  justifyContent="center" 
                  flexDirection={'column'}
                  background='red.700'
                  padding='1'
                >
                  <Text fontWeight="medium" color='white'>O motorista ainda não aceitou</Text>
                </HStack>
              )}
              {selected.data.status === 'Aberta' && selected.data.aceite === true && (
                <HStack 
                  alignItems="center" 
                  justifyContent="center" 
                  flexDirection={'column'}
                  background='green.900'
                  padding='1'
                >
                  <Text fontWeight="medium" color='white'>Em andamento</Text>
                </HStack>
              )}
              {selected.data.status === 'Fechada' && selected.data.aceite === true && (
                <HStack 
                  alignItems="center" 
                  justifyContent="center" 
                  flexDirection={'column'}
                  background='red.700'
                  padding='1'
                >
                  <Text fontWeight="medium" color='white'>Encerrada</Text>
                </HStack>
              )}
              <HStack alignItems="center" justifyContent="center" flexDirection={'column'}>
                <Text fontWeight="light">Motorista</Text>
                <Text fontWeight="medium">{selected.data.dadosCorrida.nome}</Text>
              </HStack>
              <HStack alignItems="center" justifyContent="center" flexDirection={'column'}>
                <Text fontWeight="light">Rota</Text>
              </HStack>
              <HStack alignItems="flex-start" justifyContent="flex-start" flexDirection={'column'}>
                <Text fontWeight="light">De </Text>
                <Text fontWeight="medium">{selected.data.yourLocation}</Text>
              </HStack>
              <HStack alignItems="flex-start" justifyContent="flex-start" flexDirection={'column'}>
                <Text fontWeight="light">Para </Text>
                <Text fontWeight="medium">{selected.data.destination.title_secondary}</Text>
              </HStack>
              {/* <HStack alignItems="center" justifyContent="space-between">
                <Text fontWeight="medium">Pagamento</Text>
                <Text color="blueGray.400">Crédito</Text>
              </HStack> */}
              <HStack alignItems="center" justifyContent="space-between">
                <Text fontWeight="medium">Veículo</Text>
                <Text color="blueGray.400">{selected.data.dadosCorrida.veiculos.modelo}-{selected.data.dadosCorrida.veiculos.marca}</Text>
              </HStack>
              <HStack alignItems="center" justifyContent="space-between">
                <Text fontWeight="medium">Placa</Text>
                <Text color="blueGray.400">{selected.data.dadosCorrida.veiculos.placa}</Text>
              </HStack>
              <HStack alignItems="center" justifyContent="space-between">
                <Text fontWeight="medium">Kilometros</Text>
                <Text color="blueGray.400">{selected.data.distancia} km</Text>
              </HStack>
              <HStack alignItems="center" justifyContent="space-between">
                <Text fontWeight="medium">Valor</Text>
                <Text color="green.500">R$ {moedaBR(selected.data.valor)}</Text>
              </HStack>
              {/* <HStack alignItems="center" justifyContent="center" flexDirection={'column'}>
                <Text fontWeight="light">Formas pagamento</Text>
                <Text fontWeight="medium">
                  {selected.data.dadosCorrida.formas_pagamento[0]} {' '}
                  {selected.data.dadosCorrida.formas_pagamento[1]} {' '}
                  {selected.data.dadosCorrida.formas_pagamento[2]} {' '}
                </Text>
              </HStack> */}
            </VStack>
          </Modal.Body>
          {selected.data.status === 'Aberta' && selected.data.aceite === true &&  (
            <Modal.Footer>
              <Button 
                style={{
                  display: 'flex',
                  justifyContent:'center',
                  alignItems: 'center',
                  flexDirection: 'row',
                  width: '100%',
                  backgroundColor: 'orange'
                }}
                onPress={() => {
                  chamarTelaChat(selected)
                }}
              >
                {/* <Icon size={16} as={MaterialIcons} name="chat" />  */}
                Mensagem
              </Button>
            </Modal.Footer>
          )}
        </Modal.Content>
      </Modal>
    </Center>
  );
}

export default Checkout

const IconMenu = styled.TouchableOpacity`
  padding: 5px
`;