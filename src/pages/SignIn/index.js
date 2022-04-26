import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, ActivityIndicator, View} from 'react-native';
import { Linking } from 'react-native'
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
} from "native-base";
import Perfil from '../Perfil';

const config = {
  dependencies: {
    'linear-gradient': require('expo-linear-gradient').LinearGradient
  }
}

const SignIn = ({navigation, route}) => {
  const [loading, setLoading] = useState(false);
  const {signed, user, signIn, signInSocial} = useAuth();
  const [formData, setData] = useState({});
  const [errors, setErrors] = useState({});
  const [novoCadastro, setNovoCadastro] = useState(false);
  const [loginMotorista, setLoginMotorista] = useState(false);

  // console.log("dados", signed, user)
  console.log("route", navigation)
  function handleSignIn(props) {
    signIn(props)
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

  const loginGoogle = () => {
    signInSocial('google')
  }

  const onSubmit = () => {
    validate()
    if(validate()){
      console.log("Passou", formData)
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
          {/* {!novoCadastro && !loginMotorista && ( */}
            <Box safeArea p="2" py="8" w="90%" maxW="290">
              <Heading
                size="lg"
                fontWeight="600"
                color="coolGray.800"
                _dark={{
                  color: "warmGray.50",
                }}
              >
              Bem-Vindo
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
                Faça o login para continuar!
              </Heading>

              <VStack space={3} mt="5">

                  <Button onPress={loginGoogle} mt="2" colorScheme="indigo">
                    Login Google
                  </Button>

                {/* {usuarioDefinido && usuarioDefinido === 'Motorista' && (
                  <View>
                    <Text>Já tenho meu cadastro</Text>
                    <Button onPress={() => { setLoginMotorista(true) }} mt="2" colorScheme="indigo">
                      Login
                    </Button>
                  </View>
                )}
                {usuarioDefinido && usuarioDefinido === 'Motorista' && (
                  <View>
                    <Text>Não tenho cadastro, quero solicitar</Text>
                    <Button onPress={() => {
                      // navigationRef.navigate('Home')
                      setNovoCadastro(true)
                    }} mt="2" colorScheme="indigo">
                      Solicitar cadastro
                    </Button>  
                  </View>
                )} */}
              </VStack>
            </Box>
          {/* )} */}
          {/* {!novoCadastro && loginMotorista && (
            <Box safeArea p="2" py="8" w="90%" maxW="290">
              <Heading
                size="lg"
                fontWeight="600"
                color="coolGray.800"
                _dark={{
                  color: "warmGray.50",
                }}
              >
              Olá Motorista
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
               Faça seu login
              </Heading>

              <VStack space={3} mt="5">
                <FormControl isRequired isInvalid={'name' in errors}>
                  <FormControl.Label _text={{bold: true}}>Email</FormControl.Label>
                  <Input
                    type="email"
                    onChangeText={(value) => setData({ ...formData, name: value })}
                  />
                  {'name' in errors ?
                    <FormControl.ErrorMessage _text={{fontSize: 'xs', color: 'error.500', fontWeight: 500}}>
                      {errors.name}
                    </FormControl.ErrorMessage>
                  :
                  <FormControl.HelperText _text={{fontSize: 'xs'}}>
                    Digite o email do seu cadastro
                  </FormControl.HelperText>
                  } 
                </FormControl>
                <FormControl isRequired isInvalid={'password' in errors}>
                  <FormControl.Label _text={{bold: true}}>Senha</FormControl.Label>
                  <Input
                    type="password"
                    onChangeText={(value) => setData({ ...formData, password: value })}
                  />
                  {'password' in errors ?
                    <FormControl.ErrorMessage _text={{fontSize: 'xs', color: 'error.500', fontWeight: 500}}>
                      {errors.password}
                    </FormControl.ErrorMessage>
                  :
                  <FormControl.HelperText _text={{fontSize: 'xs'}}>
                    Digite a senha do seu cadastro
                  </FormControl.HelperText>
                  } 
                </FormControl>
                <Button onPress={onSubmit} mt="2" colorScheme="indigo">
                  Entrar
                </Button>
                <Button 
                    onPress={() => {
                      setLoginMotorista(false)
                    }} 
                    mt="2" style={{backgroundColor: 'orange'}}>
                    Retornar
                </Button> 
              </VStack>
            </Box>
          )} */}
          {/* {novoCadastro && (
            <Box safeArea p="2" py="8" w="90%" maxW="290">
              <Heading
                size="lg"
                fontWeight="600"
                color="coolGray.800"
                _dark={{
                  color: "warmGray.50",
                }}
              >
              Solicitação de cadastro 
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
               A seguir listamos todos os documentos necessários para a adesão
              </Heading>

              <VStack space={3} mt="5">
                <View>
                  <Text bold>Identificação: </Text>
                  <Text italic>Precisamos de copia de todos os seus documentos, tais como 
                  RG ou CNH e CPF.</Text>
                </View>
                <View>
                  <Text bold>Veículo: </Text>
                  <Text italic>
                    Precisamos comprovar as condições e documentação do veículo.
                  </Text>
                </View>
                <View>
                  <Button 
                    onPress={() => {
                      Linking.canOpenURL("whatsapp://send?text=Ol%C3%A1%20EzTaxi%2C%20eu%20sou%20motorista%20e%20quero%20me%20cadastrar").then(supported => {
                        if (supported) {
                          return Linking.openURL(
                            "whatsapp://send?phone=5598987757873&text=Ol%C3%A1%20EzTaxi%2C%20eu%20sou%20motorista%20e%20quero%20me%20cadastrar"
                          );
                        } else {
                          return Linking.openURL(
                            "https://api.whatsapp.com/send?phone=5598987757873&text=Ol%C3%A1%20EzTaxi%2C%20eu%20sou%20motorista%20e%20quero%20me%20cadastrar"
                          );
                        }
                      })
                    }} 
                    mt="2" style={{backgroundColor: 'red'}}>
                    Quero iniciar meu cadastro
                  </Button>  
                  <Button 
                    onPress={() => {
                      setNovoCadastro(false)
                    }} 
                    mt="2" style={{backgroundColor: 'orange'}}>
                    Retornar
                  </Button>  
                </View>
              </VStack>
            </Box>
          )} */}
        </Center>
      </NativeBaseProvider>
  );
}

export default SignIn

const styles = StyleSheet.create({
  stack: {
    marginBottom: 10
  },
});
