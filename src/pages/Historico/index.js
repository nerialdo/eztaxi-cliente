import { StatusBar} from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, View, Text, SafeAreaView, ImageBackground, ActivityIndicator, TouchableOpacity, TextComponent} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  Button, 
  Icon,
  // ScrollView,
  VStack,
  Center,
  useTheme,
  Heading,
  NativeBaseProvider,
  Flex,
  Input, 
  Stack,
  FormControl,
  WarningOutlineIcon,
  Avatar,
  Spinner,
  FlatList,
  HStack,
  Box,
  Spacer
} from "native-base";
import {useAuth} from '../../contexts/auth';
import { getAuth, updatePassword, reauthenticateWithCredential } from "firebase/auth";
import { useForm, Controller } from 'react-hook-form';
import { format, parseISO, parseJSON, parse} from 'date-fns';
import InfoOrder from '../../componets/InfoOrder'

const Historico = ({ navigation }) => {
  const {user, updateUser, loadi, historicoCorridas, historico} = useAuth()
  // const { colors } = useTheme()
  // const [formData, setData] = useState({});
  // const [data, setData] = useState(historico);
  // const [errors, setErrors] = useState({});
  const [selected, setSelected] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const auth = getAuth();
  const userLogado = auth.currentUser;

  const [isFetching, setIsFetching] = useState(false);

  const { register, formState: { errors }, handleSubmit, control, setValue, watch } = useForm();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // alert('aqui')
      historicoCorridas(user.id)
    });

    console.log('historico ', historico)
    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);
  
  // useEffect(() => {
  //   console.log('historico ', historico, typeof historico)
  //   historicoCorridas(user.id)
  // }, []);


  function abrirModal(){
    setShowModal(!showModal)
  }

  function chamarTelaChat(props){
    setShowModal(!showModal)
    console.log('Props chamarTelaChat ', props)
    navigation.navigate('Chat',{
      idMotorista: props.data.dadosCorrida.id,
      nomeMotorista: props.data.dadosCorrida.nome,
      pictureMotorista: props.data.dadosCorrida.picture,
      idTransacao: props.id
    });
  }

  // useEffect(() => {
  //   setData(historico)
  // }, []);

  //   // Return the function to unsubscribe from the event so it gets removed on unmount
  //   return unsubscribe;
  // }, [navigation]);
  // const data = [
  //   {
  //     id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
  //     fullName: "Aafreen Khan",
  //     timeStamp: "12:47 PM",
  //     recentText: "Good Day!",
  //     avatarUrl: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
  //   }, {
  //     id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
  //     fullName: "Sujitha Mathur",
  //     timeStamp: "11:11 PM",
  //     recentText: "Cheer up, there!",
  //     avatarUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyEaZqT3fHeNrPGcnjLLX1v_W4mvBlgpwxnA&usqp=CAU"
  //   }, {
  //     id: "58694a0f-3da1-471f-bd96-145571e29d72",
  //     fullName: "Anci Barroco",
  //     timeStamp: "6:22 PM",
  //     recentText: "Good Day!",
  //     avatarUrl: "https://miro.medium.com/max/1400/0*0fClPmIScV5pTLoE.jpg"
  //   }, {
  //     id: "68694a0f-3da1-431f-bd56-142371e29d72",
  //     fullName: "Aniket Kumar",
  //     timeStamp: "8:56 PM",
  //     recentText: "All the best",
  //     avatarUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSr01zI37DYuR8bMV5exWQBSw28C1v_71CAh8d7GP1mplcmTgQA6Q66Oo--QedAN1B4E1k&usqp=CAU"
  //   }, 
  //   {
  //     id: "28694a0f-3da1-471f-bd96-142456e29d72",
  //     fullName: "Kiara",
  //     timeStamp: "12:47 PM",
  //     recentText: "I will call today.",
  //     avatarUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBwgu1A5zgPSvfE83nurkuzNEoXs9DMNr8Ww&usqp=CAU"
  //   }
  // ];

  useEffect(() => {
    // console.log('User', user)
    // setValue('nome', user.name)
    // setValue('contato', user.contato)
  }, []);

  function reautenticarUsuario(){
    reauthenticateWithCredential(userLogado, credential).then((e) => {
      // User re-authenticated.
      console.log('usuario reautenticado')
    }).catch((error) => {
      // An error ocurred
      // ...
    });
  }


  // const onSubmit = (data) => {
  //   updateUser(user.id, data)
  // };


  const convertDate = (userDate) => {
    const newDate = new Date(userDate.seconds*1000)
    const newDateFormated = format(newDate, 'dd/MM/yy HH:mm')
    // console.log('format', newDateFormated)
    // return new Date(userDate.seconds*1000).toLocaleDateString()
    return newDateFormated
  }

  function definirVeiculo(item){
    for (let i = 0; i < item.length; i++) {
      const element = item[i];
      // console.log('Veiculo ', element)
      if(element.status){
        return {
          ano: element.ano,
          categoria: element.categoria,
          marca: element.marca,
          modelo: element.modelo,
          placa: element.placa,
          tipo: element.tipo
        }
      }
    }
  }
  
  const fetchData = () => {
    historicoCorridas(user.id)
    setIsFetching(false);
  };

  const onRefresh = () => {
    setIsFetching(true);
    fetchData()
  };

  function definirAceite(value){
    if(value){
      return 'Aceitou'
    }else if( !value ){
      return 'Cancelado'
    }else{
      return 'Pendente'
    }
  }


 
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.viewContent}>
        <LinearGradient 
          // style={{
          //   height: 45, 
          //   width: 100, 
          //   marginTop: 15, 
          //   borderRadius: 5
          // }}
          style={styles.viewAvatar}
          colors={['#7f1d1d','#dc2626']}
        >
          {/* <ImageBackground source={{ uri: "https://reactjs.org/logo-og.png" }} resizeMode="cover" style={styles.image}>
            <Text style={styles.text}>Inside</Text>
          </ImageBackground> */}
          {/* <Avatar 
            style={{
              borderWidth: 5,
              borderColor: '#a3e635',
            }}
            bg="purple.600" 
            alignSelf="center" 
            size="2xl" 
            source={{
              uri: user.picture
            }}
          >
            RB
          </Avatar>
          <Center style={{marginTop: 10, marginBottom: 20}}>
            <Heading fontSize={20} textAlign="center" color={'white'}>
              {user.given_name}
            </Heading>
            <Text style={{color: 'white'}}>{user.email}</Text>
          </Center> */}
        </LinearGradient>
        <View style={styles.containerHistorico}>
            <View style={styles.mainHitorico}>
              {historico && (
                <FlatList 
                  style={{
                    flex: 1
                  }}
                  data={historico} 
                  renderItem={({item}) => 
                    <Box 
                      borderBottomWidth="1" 
                      borderLeftWidth="4"
                      borderLeftColor={item.data.aceite ? 'success.600' : 'error.700'}
                      paddingLeft="1"
                      _dark={{borderColor: "gray.600"}} 
                      borderColor="coolGray.200" 
                      pl="4" 
                      pr="5" 
                      py="2"
                      marginBottom={2}
                      // backgroundColor='coolGray.100'
                      backgroundColor={item.data.status === 'Aberto' ? 'teal.100' : 'coolGray.100'}
                    >
                        <TouchableOpacity
                           onPress={() => {
                            setSelected(item)
                            setShowModal(!showModal)
                           }}
                        >
                          <HStack 
                            space={3} 
                            justifyContent="space-between" 
                            alignItems={'center'}
                            
                            backgroundColor={'red'}
                          >
                            <Avatar size="48px" source={{
                              uri: item.data.dadosCorrida.picture
                            }} />
                            <VStack>
                              <Text>
                                {item.data.dadosCorrida.veiculos[0].ategoria}{' '}({definirAceite(item.data.aceite)})
                              </Text>
                              <Text style={{fontWeight: 'bold'}}>
                                {item.data.dadosCorrida.veiculos[0].modelo}{'/'}
                                {item.data.dadosCorrida.veiculos[0].placa}
                              </Text>
                              {/* <Text style={{overflow: 'hidden', width: 250}} color="coolGray.600" _dark={{color: "warmGray.200"}} numberOfLines={1}>
                                De: {item.data.yourLocation}
                              </Text>
                              <Text style={{overflow: 'hidden', width: 150}} color="coolGray.600" _dark={{color: "warmGray.200"}}>
                                Para: {item.data.destination.title_secondary}
                              </Text> */}
                            </VStack>
                            <Spacer />
                            <Text fontSize="xs" _dark={{color: "warmGray.50"}} color="coolGray.800" alignSelf="flex-start">
                              {/* {format(parse(item.data.data), 'dd/MM/yyyy')} */}
                              {convertDate(item.data.data)}
                            </Text>
                          </HStack>
                          <HStack space={3}marginTop={1} padding={1} justifyContent="center" alignItems={'center'}>
                              {item.data.status === 'Aberto' && (
                                <Text>
                                  Aguardando o motorista
                                </Text>
                              )}
                              {item.data.status === 'Finalizado' && (
                                <Text>
                                  Esta corrida já foi finalizada
                                </Text>
                              )}
                              {item.data.status === 'Cancelado' && (
                                <Text>
                                  O Motorista cancelou esta corrida
                                </Text>
                              )}
                          </HStack>
                          {item.data.aceite === null && (
                            <HStack space={3}marginTop={1} padding={1} justifyContent="center" alignItems={'center'}>
                              <Text>
                                Aguardando motorista acaitar
                              </Text>
                            </HStack>
                          )}
                        </TouchableOpacity>
                    </Box>
                  }  
                  keyExtractor={item => item.id} 
                  onRefresh={onRefresh}
                  refreshing={isFetching}
                />
              )}
              {!historico && (
                <View style={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}>
                  <Text>Não possui historico</Text>
                </View>
              )}
            </View>
        </View>
      </View>
      {selected && showModal && (
        <InfoOrder
          showModal={showModal}
          abrirModal={abrirModal}
          selected={selected}
          chamarTelaChat={chamarTelaChat}
        />
      )}
      {loadi && (
        <View style={styles.loadi}>
            <Spinner size="lg" color="emerald.500" />
            <Text style={{ fontSize: 12, color: 'gray'}}>Aguarde</Text>
        </View>
      )}
    </SafeAreaView>
  );
}

export default Historico

const styles = StyleSheet.create({
  loadi: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    backgroundColor: 'white'
  },
  image: {
    flex: 1,
    justifyContent: "center"
  },
  viewContent: {
    backgroundColor: '#fafafa',
    // backgroundColor: '#fafafa',
    flex: 1,
    // marginHorizontal: 20,
  },
  viewAvatar: {
    backgroundColor: '#a1a1aa',
    paddingTop: 20,
    paddingBottom: 20,
    marginBottom: 20,
    position: 'absolute',
    top: 0,
    width: '100%',
    height: '10%',
  },
  containerHistorico: {
    padding: 10,
    position: 'absolute',
    top: '10%',
    width: '100%',
    height: '90%',
  },
  mainHitorico: {
    flex: 1,
    backgroundColor: 'white',
    marginTop: -30,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 20,
    paddingBottom: 10,
    borderRadius: 5,
    shadowColor: "#a1a1aa",
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 1
    }
  },

});

