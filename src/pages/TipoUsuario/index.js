import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, ActivityIndicator, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useAuth} from '../../contexts/auth';
import {
  Box,
  Text,
  Heading,
  VStack,
  FormControl,
  Input,
  Link,
  Button,
  HStack,
  Center,
  NativeBaseProvider,
  Icon
} from "native-base";
import {AntDesign, EvilIcons, FontAwesome5, MaterialIcons, Ionicons} from "@expo/vector-icons"
import LottieView from 'lottie-react-native';
// import loadingSucesso from '../../../assets/loading-sucesso.json';

const config = {
  dependencies: {
    'linear-gradient': require('expo-linear-gradient').LinearGradient
  }
}

const PageTipoUsuario = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const {signed, user, signIn} = useAuth();
  const [formData, setData] = useState({});
  const [errors, setErrors] = useState({});

  console.log("dados", signed, user)
  function handleSignIn(props) {
    signIn(props)
  }

  const definirTipoUsuario = async (value) => {
    await AsyncStorage.setItem('@tipoUsuario', value)
    setLoading(true)
    await new Promise(resolve => setTimeout(resolve, 5000))
    setLoading(false)
    navigation.navigate('Login')
    // navigation.navigate('Dashboard',{ screen: 'View' })
  }

  const validate = () => {
    setErrors({})
    console.log("formData", errors)
    if (formData.name === undefined) {
      setErrors({
        ...errors,
        name: 'O Email é obrigatório',
      });
      return false;
    } else if (formData.name.length < 3) {
      setErrors({
        ...errors,
        name: 'Email inválido',
      });
      return false;
    }else if (formData.password === undefined) {
      setErrors({
        ...errors,
        password: 'A Senha é obrigatória',
      });
      return false;
    } else if (formData.password.length < 6) {
      setErrors({
        ...errors,
        password: 'A Senha não pode ser menor que 8 caracteres',
      });
      return false;
    }
    return true;
  };

  const onSubmit = () => {
    validate()
    if(validate()){
      console.log("Passou")
      handleSignIn({
        'email' : formData.name,
        'password' : formData.password
      })
    }else{
      console.log("Dados errado")
    }
  };

  return (
      // <View style={styles.container}>
      //     <Button title="Login" onPress={() => {handleSignIn()}} />
      //     <Text>Teste</Text>
      // </View>
      <NativeBaseProvider config={config}>
        <Center flex={1} px="3">
        <Box safeArea p="2" py="8" w="90%" maxW="290">
          <Heading
            size="lg"
            fontWeight="600"
            color="coolGray.800"
            _dark={{
              color: "warmGray.50",
            }}
          >
            Seja bem-vindo
          </Heading>
          <Heading
            mt="1"
            _dark={{
              color: "warmGray.200",
            }}
            color="coolGray.600"
            fontWeight="medium"
            size="xs"
          >
            Como deseja usar o app?
          </Heading>

          <VStack space={3} mt="5">

          <HStack space={3} justifyContent="center">
            <Center h="150 " w="150" rounded="md">
              <Button 
                onPress={() => {
                  definirTipoUsuario('Passageiro')
                }}
                style={styles.btn} size={'lg'} _text={{
                  color: "#1F2937"
                }}>
                <Icon as={FontAwesome5} name="street-view" />
                Passageiro
              </Button>
            </Center>
            <Center h="150" w="150" rounded="md">
              <Button 
                onPress={() => {
                  definirTipoUsuario('Motorista')
                }}
                style={styles.btn} size={'lg'} _text={{
                  color: "#1F2937"
                }}>
                <Icon as={Ionicons} name="car-sport-sharp" />
                Motorista
              </Button>
            </Center>
          </HStack>
          </VStack>
        </Box>
        {loading && (
          <View
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              flex: 1,
              backgroundColor: '#fff',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <LottieView
              source={require('../../../assets/buscando_veiculo.json')} 
              autoPlay loop 
              style={{
                width: 100
              }}
            />
            <Text>Estamos configurando ...</Text>
          </View>
        )}
        </Center>
      </NativeBaseProvider>
  );
}

export default PageTipoUsuario

const styles = StyleSheet.create({
  stack: {
    marginBottom: 10
  },
  btn:{
    backgroundColor: '#FFFAFA',
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
});
