import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import { Alert } from 'react-native';
import { StyleSheet, ActivityIndicator, View} from 'react-native';
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
import { initializeApp } from 'firebase/app';
// import { collection, query, where, addDoc, setDoc, getDocs, getFirestore, doc  } from "firebase/firestore";
import { collection, query, where, orderBy, getDocs, getFirestore } from "firebase/firestore";
import { format, parseISO, formatISO } from 'date-fns'

const firebaseConfig = {
  apiKey: "AIzaSyBNGkmf5kWpFb_w6xFzqAEhOCQC5ND5IUk",
  authDomain: "whatsapp-82efa.firebaseapp.com",
  databaseURL: "https://whatsapp-82efa.firebaseio.com",
  projectId: "whatsapp-82efa",
  storageBucket: "whatsapp-82efa.appspot.com",
  messagingSenderId: "1056876714892",
  appId: "1:1056876714892:web:3dcb8a67476a505938d4a9"
};
initializeApp(firebaseConfig);


const Extrato = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const {signOut, user} = useAuth();
  const db = getFirestore();
  const [extrato, setExtrato] = useState(null)
  const arrayEstrato = []
  useEffect(() => {
    listarExtrato()
  }, []);

  async function listarExtrato(){
    // setLoading(true)
    arrayEstrato.push()
    const q = query(collection(db, "bilhetesVendidos"), where("cpfVendendor", "==", user.cpf), orderBy("numeroBilhete", 'asc'));

    const querySnapshot = await getDocs(q);
    // console.log('querySnapshot', querySnapshot.si)
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      var data = doc.data()
      arrayEstrato.push({
        'id': doc.id,
        'cpfVendendor': data.cpfVendendor,
        'data': data.data,
        'name': data.name,
        'nomeVendendor': data.nomeVendendor,
        'numeroBilhete': data.numeroBilhete,
        'numeroSorteio': data.numeroSorteio,
        'numerosBilhetes': data.numerosBilhetes,
        'telefone': data.telefone,
      })
    });
    // setLoading(false)
    console.log('arrayEstrato', arrayEstrato)
    setExtrato(arrayEstrato)
  }

  function handleSignOut() {
    signOut()
  }

  const Loading = () => (
    <View style={[styles.containerLoading, styles.horizontal]}>
      <ActivityIndicator size="large" color="#00ff00" />
      <Text style={{color: '#fff'}}>Carregando...</Text>
    </View>
  );

  return (
      // <View style={styles.container}>
      //     <Button title="Sign Out" onPress={() => {handleSignOut()}} />
      //     <Text>{user?.name}</Text>
      // </View>
      <Center flex={1} px="3">
        <Box
          w={{
            base: "100%",
            md: "25%",
          }}
        >
          <Heading style={{marginTop: 50}} fontSize="xl" p="4" pb="3">
            Extrato de vendas
          </Heading>
          <FlatList
            data={extrato}
            style={{marginBottom: 100}}
            renderItem={({ item }) => (
              <Box
                borderBottomWidth="1"
                _dark={{
                  borderColor: "gray.600",
                }}
                borderColor="coolGray.200"
                pl="4"
                pr="5"
                py="2"
              >
                <HStack space={3} justifyContent="space-between">
                  {/* <Avatar
                    size="48px"
                    source={{
                      uri: item.avatarUrl,
                    }}
                  /> */}
                  <VStack>
                    <Text
                      _dark={{
                        color: "warmGray.50",
                      }}
                      color="coolGray.800"
                      bold
                    >
                      {item.name} 
                    </Text>
                    <Text
                      color="coolGray.600"
                      _dark={{
                        color: "warmGray.200",
                      }}
                      bold
                    >
                      &#128512; {item.numerosBilhetes}
                    </Text>
                    <Text
                      color="coolGray.600"
                      _dark={{
                        color: "warmGray.200",
                      }}
                    >
                    N° Sorteio: {item.numeroSorteio}
                    </Text>
                    <Text
                      color="coolGray.600"
                      _dark={{
                        color: "warmGray.200",
                      }}
                    >
                    N° Bilhete: {item.numeroBilhete}
                    </Text>
                    <Text
                      color="coolGray.600"
                      _dark={{
                        color: "warmGray.200",
                      }}
                    >
                    Telefone: {item.telefone}
                    </Text>
                  </VStack>
                  <Spacer />
                  <Text
                    fontSize="xs"
                    _dark={{
                      color: "warmGray.50",
                    }}
                    color="coolGray.800"
                    alignSelf="flex-start"
                  >
                    {format(new Date(item.data), 'dd/MM/yyyy')}
                  </Text>
                </HStack>
              </Box>
            )}
            keyExtractor={(item) => item.id}
          />
        </Box>
        {loading && (
            <Loading />
        )}
      </Center>
  );
}

export default Extrato

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headeUser:{
    padding: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  },
  containerLoading: {
    position: 'absolute',
    display: 'flex',
    backgroundColor: 'background-color:rgba(0, 0, 0, 0.9)',
    justifyContent: "center",
    width: '100%',
    height: '100%'
  },
  horizontal: {
      flexDirection: 'column',
      justifyContent: "center",
      alignItems: 'center',
      padding: 10
  },
});

