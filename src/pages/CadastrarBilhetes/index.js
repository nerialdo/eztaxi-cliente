import React, {useState, useEffect} from 'react';
import {
    Container,
    Heading,
    Box,
    Center,
    FormControl,
    Input,
    Button
  } from "native-base";
import { StyleSheet, View, Text, Platform, Alert, ActivityIndicator } from 'react-native';
// import { BarCodeScanner } from 'expo-barcode-scanner';
import LerQrCode from './lerQrCode';
import * as SQLite from "expo-sqlite";
// import { initializeApp } from 'firebase/app';
// import { collection, query, where, addDoc, setDoc, getDocs, getFirestore, doc  } from "firebase/firestore";
import {useAuth} from '../../contexts/auth';
import { format } from 'date-fns';
import MaskInput from 'react-native-mask-input';

// const firebaseConfig = {
//     apiKey: "AIzaSyD3vi63BxmzuxWXrpu_zUMUAwQDD2NoD_w",
//     authDomain: "extaxi-50c37.firebaseapp.com",
//     projectId: "extaxi-50c37",
//     storageBucket: "extaxi-50c37.appspot.com",
//     messagingSenderId: "1054676875897",
//     appId: "1:1054676875897:web:6cbbc168db79a2df4fb2a8",
//     measurementId: "G-5HF9XBLCK7"
// };

// initializeApp(firebaseConfig);


// const db = openDatabase();
// const fb = getFirestore();

export default function CadastrarBilhetes() {
    const [loading, setLoading] = useState(false);
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [formData, setData] = useState({});
    const [errors, setErrors] = useState({});
    const [qrHabilitado, setQrHabilitado] = useState(true);
    const [formHabilitado, setFormHabilitado] = useState(false);
    const [bilhetes, setBilhetes] = useState([]);
    const [bilhetesDuplicadosFirebase, setBilhetesDuplicadosFirebase] = useState(false);
    const {user} = useAuth()
    const [phone, setPhone] = useState('');

    useEffect(() => {
        // (async () => {
        //     const { status } = await BarCodeScanner.requestPermissionsAsync();
        //     setHasPermission(status === 'granted');
        // })();
        // db.transaction((tx) => {
        //     tx.executeSql(
        //       `select * from items where done = ?;`,
        //       (_, { rows: { _array } }) => console.log("teste sqlite", _array)
        //     );
        // });
        
    }, []);

    
    
    // const bilhetesArray = []

    async function cadastrarBilhetesFirebase(valueForm, valuesSQL){
        // console.log("buscando bilhetes", valuesSQL)
        
        // try {
        //     // const q = query(collection(fb, "bilhetesVendidos"), where("numeroBilhete", "==", valuesSQL.numero), where("numeroSorteio", "==", valuesSQL.sorteio), where("numerosBilhetes", "==", valuesSQL.numeros));
        //     const q = query(collection(fb, "bilhetesVendidos"), where("numeroBilhete", "==", valuesSQL.numero), where("numeroSorteio", "==", valuesSQL.sorteio), where("numerosBilhetes", "==", valuesSQL.numeros));
        //     const querySnapshot = await getDocs(q);

        //     // setLoading(true)

        //     console.log('Buscando', querySnapshot.size);
            
        //     setBilhetesDuplicadosFirebase(false)
        //     if(querySnapshot.size === 0) {
        //         var data = format(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx")
        //         try {
        //             await addDoc(collection(fb, "bilhetesVendidos"), {
        //                 name: valueForm.name,
        //                 telefone: phone,
        //                 numeroSorteio: valuesSQL.sorteio,
        //                 numeroBilhete: valuesSQL.numero,
        //                 numerosBilhetes: valuesSQL.numeros,
        //                 cpfVendendor: user.cpf,
        //                 nomeVendendor: user.name,
        //                 data: data,
        //                 cidade: user.cidade,
        //                 status: 'Ativo',
        //                 obs: ''
        //             })
        //             console.log("Adicinou no banco")
        //             setFormHabilitado(false)
        //             setQrHabilitado(true)
        //             // setLoading(false)
        //             setBilhetes([])
        //             setPhone()
        
        //         } catch (error) {
        //             console.log("error cadastro de dados do usuário", error)
        //             // setLoading(false)
        //         }
                
        //     }else{
        //         // setLoading(false)
        //         console.log("Bilhete já está vendido")
        //         setBilhetesDuplicadosFirebase(true)
        //         await new Promise(resolve => setTimeout(resolve, 2000))
        //     }
            
        // } catch (error) {
        //     console.log("erro buscar bilhete no firebase", error)
        //     // setLoading(false)
        // }
    }

    function deletarItens(){
        // db.transaction(
        //     (tx) => {
        //         db.transaction(
        //             (tx) => {
        //               tx.executeSql(`delete from items`);
        //               setBilhetes([])
        //             },
        //             null,
        //         )
        //     }
        // )
    }

    function listarItens(){
        // db.transaction(
        //     (tx) => {
        //         tx.executeSql("select * from items", [], (_, { rows }) =>{
        //             //   console.log("Dados no sqllte", JSON.stringify(rows))
        //             //   console.log("Dados no sqllte", rows._array)
        //               setBilhetes(rows._array)
        //         });
        //     }
        // );
    }

    const add = (numero, sorteio, numeros) => {
        // // is text empty?
        // var numerosBilhete = JSON.stringify(numeros)
        // //.replace("JavaScript", "PHP");
        // console.log("numero, sorteio, numeros", numero, sorteio, numerosBilhete.replace("[", "").replace("]", ","))
        // if (numero === null || numero === "" || sorteio === null || sorteio === "" || numeros === null || numeros === "") {
        //   return false;
        // }
    
        // db.transaction(
        //     (tx) => {
        //         tx.executeSql("select * from items where numeros = ?;", [numerosBilhete.replace("[", "").replace("]", ",")], (_, { rows }) =>{
        //             //   console.log("Dados no sqllte", JSON.stringify(rows))
        //               console.log("Bilhete já estiste? ", rows.length)
        //             //   setBilhetes(rows._array)
        //             if(rows.length === 0){
        //                 tx.executeSql("insert into items (numero, sorteio, numeros) values (?, ?, ?)", [numero, sorteio, numerosBilhete.replace("[", "").replace("]", ",")]);
        //                 tx.executeSql("select * from items", [], (_, { rows }) =>{
        //                     // console.log("Dados no sqllte", JSON.stringify(rows))
        //                     // console.log("Dados no sqllte", )
        //                     setBilhetes(rows._array)
        //                 });
        //                 listarItens()
        //             }else{
        //                 Alert.alert('Atenção: ','Bilhete já foi salvo na lista')
        //             }
        //         });
        //     }
        // )

    };


    function habilitarTelas(){
        setQrHabilitado(false)
    }

    function dadosQr(props){
        // // arrayQrCode.push(props)
        // // setQrHabilitado(false)
        // add(props.numero, props.sorteio, props.numeros)
        // // setBilhetes(arrayQrCode)
        // console.log("dadosQrCode", props)
    }

    const onSubmit = () => {
        // if(!phone){
        //     Alert.alert('Atenção', 'O telefone ou celular é obrigatório')
        //     return
        // }
        // validate()
        // if(validate()){
        //     // setLoading(true)
        //     if(formData.name && phone){
        //         // console.log("Dados do forme ", formData)
        //         // buscar todos os dados no banco
        //         // [{
        //         //     'numero': 19,
        //         //     'sorteio': "005",
        //         //     'numeros': "1091,1092,1093,1094,1091,",
        //         // },{
        //         //     'numero': 13, 
        //         //     'sorteio': "005", 
        //         //     'numeros': "1061,1062,1063,1064,1066,"
        //         // },{
        //         //     'numero': 14, 
        //         //     'sorteio': "005", 
        //         //     'numeros': "1066,1067,1068,1069,1076,"
        //         // }].map((item, key) => {
        //         //     cadastrarBilhetesFirebase(formData, item)
        //         // })
        //         // cadastrarBilhetes(formData, {
        //         //     'numero': 19,
        //         //     'sorteio': "005",
        //         //     'numeros': "1091,1092,1093,1094,1095,",
        //         // },{
        //         //     'numero': 13, 
        //         //     'sorteio': "005", 
        //         //     'numeros': "1061,1062,1063,1064,1065,"
        //         // },{
        //         //     'numero': 14, 
        //         //     'sorteio': "005", 
        //         //     'numeros': "1066,1067,1068,1069,1070,"
        //         // })


        //         db.transaction(
        //             (tx) => {
        //                 tx.executeSql("select * from items", [], (_, { rows }) =>{
        //                     //   console.log("Dados no sqllte", JSON.stringify(rows))
        //                     //   console.log("Dados no sqllte", rows._array)
        //                       var dadosSqlite = rows._array
        //                       for (let d = 0; d < dadosSqlite.length; d++) {
        //                           const element = dadosSqlite[d];
        //                         //   console.log("Dados no sqllte", element)
        //                           cadastrarBilhetes(formData, element)
        //                       }
        //                 });
        //             }
        //         );
        //     }
        // //   handleSignIn({
        // //     'email' : formData.name,
        // //     'password' : formData.password
        // //   })
        // }else{
        //   console.log("Dados errado")
        // }
    };

    const validate = () => {
        // setErrors({})
        // console.log("formData erros", errors)
        // if (formData.name === undefined) {
        //   setErrors({
        //     ...errors,
        //     name: 'O Nome é obrigatório',
        //   });
        //   return false;
        // }
        // return true;
    };

    const Loading = () => (
        <View style={[styles.containerLoading, styles.horizontal]}>
          <ActivityIndicator size="large" color="#00ff00" />
          <Text style={{color: '#fff'}}>Carregando...</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            {qrHabilitado && (
                <LerQrCode style={styles.containerQr} dadosQr={dadosQr} habilitarTelas={habilitarTelas} />
            )}
 
            {!qrHabilitado && (
                <Center
                    bg="primary.400"
                    _text={{
                        color: "white",
                        fontWeight: "bold",
                    }}
                    height={'100%'}
                    width={'100%'}
                >
                    {!formHabilitado && (
                        <Box
                            bg={{
                                linearGradient: {
                                colors: ['lightBlue.300', 'violet.800'],
                                start: [0, 0],
                                end: [1, 0],
                                },
                            }}
                            p="12"
                            rounded="xl"
                        >
                            {bilhetes.map((item, key) => (
                                <View style={styles.listItem} key={key}>
                                    <Text pt="4" style={styles.txtKey} fontWeight="md">
                                        {key + 1}
                                    </Text>
                                    <Text pt="3" fontWeight="md">
                                        {JSON.stringify(item.numeros)}
                                    </Text>
                                </View>
                            ))}
                            <View  style={styles.btns}>
                                <Button style={{margin: 5, width: bilhetes.length > 0 ? '50%' : '100%'}} onPress={() => {setQrHabilitado(true)}} size="md" colorScheme="primary">
                                    Novo Bilhete
                                </Button>
                                {bilhetes.length > 0 && (
                                    <Button style={{margin: 5, width: '50%'}} onPress={() => {deletarItens()}} size="md" colorScheme="secondary">
                                        Limpar
                                    </Button>
                                )}
                            </View>
                            {bilhetes.length > 0 && (
                                <View  style={styles.btns}>
                                    <Button style={{margin: 5, backgroundColor: 'green', width: '100%'}} onPress={() => {setFormHabilitado(true)}} size="md" colorScheme="primary">
                                        Finalizar
                                    </Button>
                                </View>
                            )}
                        </Box>
                    )}
                    {formHabilitado && (
                        <Box
                            style={{
                                backgroundColor: '#fff'
                            }}
                            p="12"
                            rounded="xl"
                        >
                            <FormControl isRequired isInvalid={'name' in errors}>
                                <FormControl.Label _text={{bold: true}}>Nome do comprador</FormControl.Label>
                                <Input
                                    type="text"
                                    width='300'
                                    onChangeText={(value) => setData({ ...formData, name: value })}
                                />
                                {'name' in errors ?
                                    <FormControl.ErrorMessage _text={{fontSize: 'xs', fontWeight: 500}}>
                                    {errors.name}
                                    </FormControl.ErrorMessage>
                                :
                                <FormControl.HelperText _text={{fontSize: 'xs'}}>
                                    O nome do comprador é obrigatório
                                </FormControl.HelperText>
                                } 
                            </FormControl>
                            <FormControl isRequired isInvalid={'telefone' in errors}>
                                <FormControl.Label _text={{bold: true}}>Telefone</FormControl.Label>
                                {/* <Input
                                    type="text"
                                    width='300'
                                    onChangeText={(value) => setData({ ...formData, telefone: value })}
                                /> */}
                                <MaskInput
                                    style={{width: 300, height: 35, borderWidth: 1, borderColor: '#e9e9e9', borderRadius: 5}}
                                    value={phone}
                                    onChangeText={(masked, unmasked) => {
                                        setPhone(masked); // you can use the unmasked value as well

                                        // assuming you typed "9" all the way:
                                        console.log(masked); // (99) 99999-9999
                                        console.log(unmasked); // 99999999999
                                    }}
                                    mask={['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                                />
                            </FormControl>
                            <View style={{padding: 5}}>
                                <Button style={{margin: 5, width: '100%'}} onPress={onSubmit} size="md" colorScheme="secondary">
                                    Salvar
                                </Button>
                                <Button style={{margin: 5, backgroundColor: 'green', width: '100%'}} onPress={() => {setFormHabilitado(false)}} size="md" colorScheme="primary">
                                    Voltar
                                </Button>
                            </View>
                            
                        </Box>
                    )}
                    {bilhetesDuplicadosFirebase && (
                        <View style={styles.bilheteDuplicado}>
                            <Text style={{color: '#ffff'}}>Bilhete duplicado</Text>
                        </View>
                    )}
                </Center>
            )}
            {loading && (
                <Loading />
            )}
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
    },
    containerQr:{
        zIndex: 9999
    },
    listItem:{
        marginBottom: 10,
        backgroundColor: '#fff',
        padding: 5,
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    txtKey:{
        width: 20,
        height: 20,
        backgroundColor: 'green',
        color: '#fff',
        padding: 2,
        textAlign: 'center',
        borderRadius: 10,
        marginRight: 10,
        fontSize: 9
    },
    btns:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
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
    bilheteDuplicado:{
        position: 'absolute',
        bottom: 0,
        padding: 10,
        backgroundColor: 'red',
        width: '100%',
        height: 50,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
});