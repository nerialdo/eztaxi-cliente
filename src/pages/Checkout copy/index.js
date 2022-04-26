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

import Map from '../../componets/Map';
import MyMenu from '../../componets/Menu';
import styled, { css } from 'styled-components/native';

const Checkout = ({ navigation }) => {
  const {user} = useAuth()
  const [menuTop, setMenuTop] = useState(true)
  const [showMenu, seShowMenu] = useState(false)
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;   
  
  // const { colors } = useTheme()

  useEffect(() => {
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
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: 'row',
          // position: 'absolute',
          // top: Platform.select({ ios: 60, android: 40 }),
          // left: 20,
          // right: 20,
          paddingLeft: 0,
          paddingRight: 0,
          width: '100%',
          height: 'auto',
          padding: 5,
          zIndex: 9999
      }}>
        <Center
          // height={windowHeight} 
          // bg="indigo.300"
          padding={2}
          width={{
            base: windowWidth,
            lg: windowWidth
          }}
        >
          <VStack bg="light.50" width={'100%'} padding={2} borderRadius={10} space={4} alignItems="center" >
            <Circle size="40px" bg="secondary.400">
              <Icon as={<MaterialIcons name="audiotrack" />} color="white" size={5} />
            </Circle>
            <Heading textAlign={'center'}>
              <Text color="emerald.500"> Motorista</Text>
            </Heading>
          </VStack>
          <VStack space={4} alignItems="center">
            <Text mt="3" fontWeight="medium">
              NativeBase is a simple, modular and accessible component library that
              gives you building blocks to build you React applications.
            </Text>
          </VStack>
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

export default Checkout

const IconMenu = styled.TouchableOpacity`
  padding: 5px
`;