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

import Map from '../../componets/Map';
import MyMenu from '../../componets/Menu';
import styled, { css } from 'styled-components/native';

const Checkout = ({ 
  showModal, 
  abrirModal, 
  distancia, 
  dadosCorrida, 
  valor, 
  navigation, 
  abrirConfirmacao,
  destination,
  duration
 }) => {
  const {user} = useAuth()
  const [menuTop, setMenuTop] = useState(true)
  const [showMenu, seShowMenu] = useState(false)
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;   
  
  // const { colors } = useTheme()
  // console.log('dadosCorridadadosCorrida', dadosCorrida, showModal)
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
      <Modal style={{backgroundColor: 'red'}} isOpen={showModal} onClose={() => abrirModal()} size="lg">
        <Modal.Content style={{backgroundColor: 'blue'}} maxWidth="350">
          <Modal.CloseButton />
          <Modal.Header>Confirmação do pedido</Modal.Header>
          <Modal.Body>
            <VStack space={3}>
              <HStack alignItems="center" justifyContent="center" flexDirection={'column'}>
                <Text fontWeight="light">Motorista</Text>
                <Text fontWeight="medium">{dadosCorrida.nome}</Text>
              </HStack>
              {/* <HStack alignItems="center" justifyContent="space-between">
                <Text fontWeight="medium">Pagamento</Text>
                <Text color="blueGray.400">Crédito</Text>
              </HStack> */}
              <HStack alignItems="center" justifyContent="space-between">
                <Text fontWeight="medium">Veículo</Text>
                <Text color="blueGray.400">{dadosCorrida.veiculos.modelo}-{dadosCorrida.veiculos.marca}</Text>
              </HStack>
              <HStack alignItems="center" justifyContent="space-between">
                <Text fontWeight="medium">Placa</Text>
                <Text color="blueGray.400">{dadosCorrida.veiculos.placa}</Text>
              </HStack>
              <HStack alignItems="center" justifyContent="space-between">
                <Text fontWeight="medium">Kilometros</Text>
                <Text color="blueGray.400">{distancia} km</Text>
              </HStack>
              <HStack alignItems="center" justifyContent="space-between">
                <Text fontWeight="medium">Valor</Text>
                <Text color="green.500">R$ {moedaBR(valor)}</Text>
              </HStack>
              <HStack alignItems="center" justifyContent="center" flexDirection={'column'}>
                <Text fontWeight="light">Formas pagamento</Text>
                <Text fontWeight="medium">
                  {dadosCorrida.formas_pagamento[0]} {' '}
                  {dadosCorrida.formas_pagamento[1]} {' '}
                  {dadosCorrida.formas_pagamento[2]} {' '}
                </Text>
              </HStack>
            </VStack>
          </Modal.Body>
          <Modal.Footer>
            <Button flex="1" onPress={() => {
              abrirConfirmacao(
                dadosCorrida, 
                valor, 
                distancia,
                destination,
                duration
              )}}
            >
              Confirmar
            </Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </Center>
  );
}

export default Checkout

const IconMenu = styled.TouchableOpacity`
  padding: 5px
`;