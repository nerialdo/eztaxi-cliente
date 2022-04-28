import React, { createContext, useState, useEffect, useContext, useCallback, useRef } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as AuthSession from 'expo-auth-session';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import api from '../services/api' 
import * as authen from '../services/auth' ;
import * as Location from 'expo-location';
import { initializeApp } from 'firebase/app';
import { 
    getAuth, 
    signOut, 
    onAuthStateChanged, 
    signInWithCredential, 
    signInWithEmailAndPassword ,
    signInWithPopup,
    GoogleAuthProvider,
    signInWithRedirect,
} from 'firebase/auth';
import { Firestore, 
    collection, query, where, getDocs, getFirestore, addDoc, setDoc, 
    doc, deleteDoc, onSnapshot, orderBy, updateDoc, arrayUnion, Timestamp,
} from "firebase/firestore";
import { getDatabase, ref, onValue} from "firebase/database";

import { async } from "@firebase/util";
import Geocoder from 'react-native-geocoding';
import { useNavigation } from '@react-navigation/native';

import { GiftedChat } from 'react-native-gifted-chat';

Geocoder.init("AIzaSyA5E67B45xsd69Z2SKIhWuVbVlb736lWvk"); 

const firebaseConfig = {
    apiKey: "AIzaSyBNGkmf5kWpFb_w6xFzqAEhOCQC5ND5IUk",
    authDomain: "whatsapp-82efa.firebaseapp.com",
    databaseURL: "https://whatsapp-82efa.firebaseio.com",
    projectId: "whatsapp-82efa",
    storageBucket: "whatsapp-82efa.appspot.com",
    messagingSenderId: "1056876714892",
    appId: "1:1056876714892:web:3dcb8a67476a505938d4a9"
};

if(firebaseConfig){
  initializeApp(firebaseConfig);
}
    

const AuthContext = createContext({});

// const auth = getAuth();

Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
});
  
    
export const AuthProvider = ({children}) => { 
    // console.log('childrenchildren', children)
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [loadi, setLoadi] = useState(false)
    // const [usuarioDefinido, setUsuarioDefinido] = useState(null)
    const [motoristaLivre, setMotoristaLivre] = useState([])
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    const db = getFirestore();


    const [region, setRegion] = useState(null)
    const [location, setLocation] = useState(null);
    const [yourLocation, setYourLocation] = useState(null);
    const [cidadeEstado, setCidadeEstado] = useState(null);
    const [idTransacao, setIdTransacao] = useState(null);
    const [aceite, setAceite] = useState('aguardando');
    // const [infoCorrida, setInfoCorrida] = useState(null);

    const [historico, setHistorico] = useState(null);
    const [chats, setChats] = useState(null);

    const navigation = useNavigation();

    const [messages, setMessages] = useState([]);


    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();

    // Ouvintes de notificações
    useEffect(() => {

        console.log('new Date(Timestamp.now().seconds*1000).toLocaleDateString()', new Date(Timestamp.now().seconds*1000).toLocaleDateString())
        registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
        setNotification(notification);
        });

        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
        console.log("response notification ",  response);
        });

        return () => {
        Notifications.removeNotificationSubscription(notificationListener.current);
        Notifications.removeNotificationSubscription(responseListener.current);
        };
    }, []);

    useEffect(() => {
        setMotoristaLivre([])
    }, [])
    
    useEffect(() => {
        //verificar se usuario está definido
        // navigation.navigate('Chat');
        try {
            async function verific(){
                const token = await AsyncStorage.getItem('@RNAuth:token')
                if(token){
                    // console.log('token 1° useEffect', token)
                    userLogado(token)
                }else{
                    console.log('Não está logado')
                    setLoading(false)
                }
            }
            verific()
            
        } catch (error) {
            console.log('error useEffect auth', error)
        }

        // return () => verific().abort();
    }, [])

    useEffect(() => {
        (async () => {
          let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
          }
    
          let locationGeo = await Location.getCurrentPositionAsync({});
          console.log('location', locationGeo)
          console.log('location', locationGeo.coords)
          setLocation(location);
          setRegion({
            latitude: locationGeo.coords.latitude,
            longitude: locationGeo.coords.longitude,
            latitudeDelta: 0.0143,
            longitudeDelta: 0.0134,
          })

          // buscar localidade atual
          const response = await Geocoder.from({
            latitude : locationGeo.coords.latitude,
            longitude : locationGeo.coords.longitude
          });
          const address = response.results[0].formatted_address;
          const addressComponents = response.results[0].address_components;
          console.log('address', address)
        //   console.log('response.results[0]', response.results[0])
           console.log('addressComponents', addressComponents)
        //   setYourLocation(addressComponents[1].short_name)
          setYourLocation(address)
          var cidadeEstado = []
          //buscar informação de CIDADE e ESTADO
        //   console.log('addressComponents', addressComponents)
          let resCidadade = addressComponents.filter(addres => addres.types[0] === 'administrative_area_level_2')
          let resEstado = addressComponents.filter(addres => addres.types[0] === 'administrative_area_level_1')
          
          setCidadeEstado({
            'cidade' : resCidadade[0].long_name,
            'estado' : resEstado[0].long_name
          })

          console.log('if', cidadeEstado)
          setLocation(address.substring(0, address.indexOf(",")))
        })();
    }, []);


    // buscar hitorico de corridas
    async function historicoChats(id){
        setLoadi(true)
        try {
            const q = query(collection(db, "users"), where('id', '==', id));
            const querySnapshot = await getDocs(q);
            var dadosChats = []
            querySnapshot.forEach((doc) => {
                // console.log(doc.id, ' => historicoCorridas ', doc.data());
                console.log(' => historicoChats ', doc.data().chats);
                var cha = doc.data().chats
                // dadosChats.push({id: doc.id, data: doc.data().chats})
                for (let c = 0; c < cha.length; c++) {
                    const element = cha[c];
                    dadosChats.push(element)
                }
            });
            setChats(dadosChats)
            setLoadi(false)
    
        } catch (error) {
            console.log('Erro ao buscar chats ', error)
            setLoadi(false)
        }
    }

    // // buscar hitorico de conversas no chat
    // async function showOrder(id){
    //     setLoadi(true)
    //     try {
    //         const q = doc(db, "users", id);
    //         console.log('ShowOrder', q)
    //         // const querySnapshot = await getDocs(q);

    //         //     console.log(doc.id, ' => showOrder ', querySnapshot);
    //         // // querySnapshot.forEach((doc) => {
    //         //     //     console.log(doc.id, ' => showOrder ', doc.data());
    //         // // });

    //         // onValue(docRef(db, '/users/' + id), (snapshot) => {
    //         //     // const username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
    //         //     console.log('ShowOder', snapshot)
    //         //   }, {
    //         //     onlyOnce: true
    //         //   });

    
    //     } catch (error) {
    //         console.log('Erro ao buscar dados da order ', error)
    //     }
    // }

    // buscar hitorico de conversas no chat
    async function historicoCorridas(id){
        console.log('idcliente ', id)
        setLoadi(true)
        try {
            const q = query(collection(db, "order"), where('idCliente', '==', id));
            const querySnapshot = await getDocs(q);
            var dadosHistorico = []
            querySnapshot.forEach((doc) => {
                console.log(doc.id, ' => historicoCorridas ', doc.data());
                dadosHistorico.push({id: doc.id, data: doc.data()})
            });
            setHistorico(dadosHistorico.length === 0 ? null : dadosHistorico)
            setLoadi(false)
    
        } catch (error) {
            console.log('Erro ao buscar veículos disponíveis ', error)
            setLoadi(false)
        }
    }


    // chat
    //https://blog.jscrambler.com/build-a-chat-app-with-firebase-and-react-native

    async function monitorarChat(id){
        const q = query(collection(db, "chats"), where("sentBy", "==", id));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
            // console.log('doc.data() monitorarChat', doc.data())
        });
        // console.log("unsubscribe ", unsubscribe);
        });
    }
    
    async function addNewChat({_id, text, createdAt, user : usuario}) {
        console.log('Dados em addNewCha ', _id, text, createdAt, usuario)
        // var data = Timestamp.fromDate(new Date())
        try {
            
            const mymsg = {
                _id,
                text,
                user: {
                    _id: usuario._id,
                    name: usuario.name,
                    avatar: usuario.avatar,
                },
                sentBy:usuario._id,
                sentTo:usuario.to._id,
                idTransacao: usuario.idTransacao,
                createdAt
            }
    
            setMessages(previousMessages => GiftedChat.append(previousMessages,mymsg))
            const docid  = usuario.to._id > usuario._id ? usuario._id+ "-" + usuario.to._id :  usuario.to_id+"-"+usuario._id 
            console.log('mymsg', mymsg)
            console.log('docid', docid)

            //cadastra o chat no banco de dados
            await addDoc(collection(db, 'chats'), {
                chatId: docid,
                status: true,
                ...mymsg
            });

            //buscar e atualiza o array de chats do usuario
            const userRef = doc(db, "users", usuario._id);
            await updateDoc(userRef, {
                chats: arrayUnion({
                    chatId: docid,
                    title: usuario.to.name,
                    image: usuario.to.avatar,
                    with: usuario.to._id,
                    idTransacao: usuario.idTransacao,
                })
            });
    
            //buscar e atualiza o array de chats do motorista
            const motoristaRef = doc(db, "motoristas", usuario.to._id);
            await updateDoc(motoristaRef, {
                chats: arrayUnion({
                    chatId: docid,
                    title: usuario.name,
                    image: usuario.avatar,
                    with: usuario._id,
                    idTransacao: usuario.idTransacao,
                })
            });   

            // envia notificação para o destinatário
            schedulePushNotification('', 'Mensagem do passageiro', text)
             
        } catch (error) {
            console.log('Error addNewChat', error)
        }
        
    }
    
    const onSend = useCallback((messages = []) =>  {
        // setMessages(previousMessages =>
        //   GiftedChat.append(previousMessages, messages)
        // );
        // const { _id, createdAt, text, user } = messages[0];    
        const msg = messages[0];    
        console.log('dados da mensagem', messages[0])
        // addNewChat(_id, createdAt, text, user)
        addNewChat(msg)
        // addDoc(collection(db, 'chats'), {
        //   _id,
        //   createdAt,
        //   text,
        //   user
        // });
    }, []);

    async function iniciarChat(idChat){

        setLoadi(true)
        // try {
        //     const q = query(collection(db, "chats"), where('idTransacao', '==', idChat));
        //     const querySnapshot = await getDocs(q);
        //     var mensagensDoChat = []
        //     setMessages(
        //         querySnapshot.docs.map(doc => ({
        //             _id: doc.data()._id,
        //             createdAt: doc.data().createdAt.toDate(),
        //             text: doc.data().text,
        //             user: doc.data().user
        //         })
        //     ))
        //     // querySnapshot.forEach((doc) => {
        //     //     console.log(doc.id, ' => mensagensDoChat ', doc.data());
        //     //     mensagensDoChat.push({id: doc.id, data: doc.data()})
        //     // });
        //     // // setHistorico(dadosHistorico)
        //     setLoadi(false)
    
        // } catch (error) {
        //     console.log('Erro ao buscar veículos disponíveis ', error)
        //     setLoadi(false)
        // }
        
        const collectionRef = collection(db, 'chats');
        const q = query(collectionRef, where('idTransacao', '==', idChat));
    
        onSnapshot(q, querySnapshot => {
            console.log('querySnapshot', querySnapshot)
            setMessages(
                querySnapshot.docs.map(doc => ({
                    _id: doc.data()._id,
                    createdAt: doc.data().createdAt.toDate(),
                    text: doc.data().text,
                    user: doc.data().user
                })
            )
            );
        });
    }

    // fim chat

    async function userLogado(token){
        try {
            console.log('token passado na função userLogado ', token)
            const response = await fetch(`https://www.googleapis.com/oauth2/v2/userinfo?alt=json&access_token=${token}`);
            const userInfo = await response.json();
            console.log('dados do usuario', userInfo);
            // setUser(userInfo)
            buscarDadosUser(userInfo.id)
            monitorarChat(userInfo.id)
            // setLoading(false)
            // const value = await AsyncStorage.getItem('@RNAuth:user')
            // console.log('AsyncStorage.setItem', JSON.parse(value))
            // setUser(JSON.parse(value))
        } catch (error) {
            console.log('erro função userLogado', error)
            alert(error)
            setLoading(false)
        }
    }

    useEffect(() => {
        // console.log('useruseruser', user)
        // setLoading(false)
        // userLogado()
        // onAuthStateChanged(auth, use => {
        //     console.log('usario logado trtrtrtr', use)
        //     // if (user != null) {
        //     //     console.log('Está logado agora');
        //     // }else{
        //     //     console.log('Não está logado');
        //     // }
        
        // // Do other things
        // });
        // // async function loadStoragedData(){

        // //     //varificar qual o tipo de usuario: Passagero ou Motorista
        // //     const value = await AsyncStorage.getItem('@tipoUsuario')
        // //     if(value) {
        // //         setUsuarioDefinido(true)
        // //     }else{
        // //         setUsuarioDefinido(false)
        // //     }


        // //     const storagedUser = await AsyncStorage.getItem('@RNAuth:user');
        // //     const storagedToken =  await AsyncStorage.getItem('@RNAuth:token');

        // //     console.log("dados salvos auth", JSON.parse(storagedUser))
        // //     console.log("dados salvos auth storagedToken", storagedToken)

        // //     // await new Promise(resolve => setTimeout(resolve, 2000))

        // //     const userLogado = await auth.currentUser;
        // //     console.log("usuario logado", userLogado)
        // //     if (userLogado) {
        // //         // buscar dados do usuario no firebase
        // //         try {
        // //             const q = query(collection(db, "users"), where("email", "==", userLogado.email));

        // //             const querySnapshot = await getDocs(q);
        // //             querySnapshot.forEach((doc) => {
        // //                 // doc.data() is never undefined for query doc snapshots
        // //                 console.log("usuario", doc.data());
        // //                 // setUser(doc.data())
        // //                 async function atualiarStorage(){
        // //                     await AsyncStorage.setItem('@RNAuth:user', JSON.stringify(doc.data()))
        // //                 }
        // //                 atualiarStorage()
        // //             });
        // //         } catch (error) {
        // //             console.log("Erro select users", error)
        // //         }
        // //     } else {
        // //         console.log("Deslogado")
        // //         // setUser(null)
        // //     }

        // //     if(storagedToken && storagedUser){
        // //         // console.log("Iniciando ...")
        // //         api.defaults.headers['Authorization'] = `Bearer ${storagedToken}`
        // //         if(storagedUser){
        // //             // setUser(JSON.parse(storagedUser))
        // //         }else{
        // //             // setUser([])
        // //         }
        // //         setLoading(false)
        // //     }else{
        // //         setLoading(false) 
        // //     }
        // // }

        // // loadStoragedData();
    }, [])

    async function removerOrder(id){
        await deleteDoc(doc(db, "order", id));
        navigation.navigate('Dashboard');
        
    }

    /**
     * 
     * @param {*} seg segundos para o delay
     * @param {*} dadosCorrida dadosCorrida são os dados do motorista
     */
    async function delay(seg, dadosCorrida){
        console.log('Redirecionando aqui', seg, dadosCorrida)
        await new Promise(resolve => setTimeout(resolve, seg));
        // console.log('Redireciounou agora aqui')
        navigation.navigate('Chat',{
            idMotorista: dadosCorrida.id,
            nomeMotorista: dadosCorrida.nome,
            pictureMotorista: dadosCorrida.picture
        });
    }

    async function verificarOrder(id, dadosCorrida){
        onSnapshot(doc(db, "order", id), (doc) => {
            if(doc.data() && doc.data().aceite === true){
                console.log('Motorista aceitou')
                setAceite('sim')
                delay(3000, dadosCorrida)
                
            }else if(doc.data() && doc.data().aceite === false){
                console.log('Motorista recusou')
                setAceite('nao')
                delay(7000, dadosCorrida)
            }
            // console.log( " data: ", doc.data(), doc.data().aceite);
        });
    }

    async function salvarOrder(
        dadosCorrida, 
        valor, 
        distancia, 
        destination, 
        duration, 
        user,
        yourLocation
    ){
        // console.log('Salvando ordem para o motorista', dadosCorrida, valor, distancia, destination, duration, user)
        setAceite('aguardando')
        try {
            const docRef = await addDoc(collection(db, "order"), {
                idMotorista: dadosCorrida.id,
                idCliente: user.id,
                dadosCorrida: dadosCorrida,
                yourLocation: yourLocation,
                valor: valor,
                distancia: distancia,
                destination: destination,
                duration: duration,
                user: user,
                aceite: null,
                status: 'Aberta',
                data: Timestamp.fromDate(new Date())
            });
            setIdTransacao(docRef.id)
            verificarOrder(docRef.id, dadosCorrida)
            // setInfoCorrida(dadosCorrida)
            // console.log("Document written with ID: ", docRef.id);
            schedulePushNotification('', 'Passageiro chamando ...', 'Abra o app e aceite sua corrida!')
        
        } catch (error) {
            console.log('Erro ao salvar ordem', error, error.response)    
        }
    }

    async function buscarMotoristaLivre(){
        try {
            setMotoristaLivre([])
            const museums = query(collection(db, 'motoristas'));
            const querySnapshot = await getDocs(museums);
            var dadosMotoristas = []
            querySnapshot.forEach((doc) => {
                // console.log(doc.id, ' => ********** ', doc.data());
                dadosMotoristas.push(doc.data())
            });
            setMotoristaLivre(dadosMotoristas)
    
        } catch (error) {
            console.log('Erro ao buscar veículos disponíveis ', error)
        }
    }

    async function updateUser(id, data){
        setLoadi(true)
        // console.log('submiting with ', data);
        // console.log('===> dados user passado da função updateUser', id)
        try {
            const userRef = doc(db, "users", id);
            await updateDoc(userRef, {
                name: data.nome,
                contato: data.contato
            });
            console.log('Usuário editado com sucesso')
            setLoadi(false)
        } catch (error) {
            console.log('Erro ao atualizar perfil', error)
            setLoadi(false)
        }
    }

    async function buscarDadosUser(id){
        // await AsyncStorage.setItem('@RNAuth:token', tok)
        // console.log('dados para buscardadosdouser', id)
        try {
            const q = query(collection(db, "users"), where("id", "==", id));
            const querySnapshot = await getDocs(q);
            // console.log('querySnapshot', querySnapshot, querySnapshot.size)
            querySnapshot.forEach((doc) => {
                console.log("buscarDadosUser =>", doc.id, " => ", doc.data());
                setUser(doc.data())
                addAsync(doc.data())
                setLoading(false)
            });
        } catch (error) {
            console.log('Erro ao buscar dados do usuário', error)
            setLoading(false)
        }
    }

    async function addAsync(res){
        console.log('resssssss', res)
        await AsyncStorage.setItem('@RNAuth:user', JSON.stringify(
            {
                'email': res.email,
                'family_name': res.family_name,
                'given_name': res.given_name,
                'locale': res.locale,
                'name': res.name,
                'picture': res.picture,
                'verified_email': res.verified_email,
                'cidade': cidadeEstado ? cidadeEstado.cidade : '',
                'estado': cidadeEstado ? cidadeEstado.estado : '',
                'tokenPush': res.tokenPush,
                'contato' : res.contato
                // 'tipoUsuario': usuarioDefinido
            }
        ))

        
        // const value = await AsyncStorage.getItem('@RNAuth:user')
        // console.log('AsyncStorage.setItem', JSON.parse(value))
        // return res
    }

    async function saveProfile(info, token=expoPushToken){
        console.log('Salvando dados do usuario aqui', token)
        console.log('Info', info, info.id)
        try {
            const q = query(collection(db, "users"), where("id", "==", info.id));
            const querySnapshot = await getDocs(q);
            // console.log('userRef', querySnapshot.size)
            // if(querySnapshot.size != 0){
                const userRef = doc(db, "users", info.id);
                await setDoc(userRef, { 
                    email: info.email,
                    family_name: info.family_name,
                    given_name: info.given_name,
                    locale: info.locale,
                    name: info.name,
                    picture: info.picture,
                    verified_email: info.verified_email,
                    cidade: cidadeEstado ? cidadeEstado.cidade : '',
                    estado: cidadeEstado ? cidadeEstado.estado : '',
                    id: info.id,
                    tokenPush: token
                    // tipoUsuario: usuarioDefinido
                 }, { merge: true });
                // await setDoc(doc(db, "users", info.id), {
                //     email: info.email,
                //     family_name: info.family_name,
                //     given_name: info.given_name,
                //     locale: info.locale,
                //     name: info.name,
                //     picture: info.picture,
                //     verified_email: info.verified_email,
                //     cidade: cidadeEstado ? cidadeEstado.cidade : '',
                //     estado: cidadeEstado ? cidadeEstado.estado : '',
                //     id: info.id,
                //     tokenPush: token
                //     // tipoUsuario: usuarioDefinido
                // }, 
                // {marge:true}
                // );
            // }
            addAsync(info)
            buscarDadosUser(info.id)
        
        } catch (error) {
            console.log('Erro ao salvar usuario', error, error.response)    
            setLoading(false)
        }
    }

    
    async function loadProfile(token){
        try {
            console.log('token na função loadProfile', token)
            const response = await fetch(`https://www.googleapis.com/oauth2/v2/userinfo?alt=json&access_token=${token}`);
            const userInfo = await response.json();
            console.log('dados do usuario', userInfo);
            await AsyncStorage.setItem('@RNAuth:token', token)
            // addAsync(userInfo)
            saveProfile(userInfo, expoPushToken)
            // setUser(userInfo)
            // buscarDadosUser(userInfo.id)
            // setLoading(false)
        } catch (error) {
            console.log('Erro loadProfile ', error)
            setLoading(false)
        }
    }

    async function signInSocial(){
        console.log('Logando ....')
        const CLIENT_ID = '741352224001-9b8pjmsf756mtitpjdfes7092310ar0j.apps.googleusercontent.com';
        const REDIRECT_URI = 'https://auth.expo.io/@nerialdo/eztaxi';
        const RESPONSE_TYPE = 'token';
        const SCOPE = encodeURI('profile email');
        const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`
        setLoading(true)
        const {type, params} =  await AuthSession.startAsync({authUrl})

        // console.log('response signInSocial', type, params)

        if(type === 'error'){
            console.log('Não permitido')
            setLoading(false)
        }
       
        if(type === 'cancel'){
            console.log('Cancelado pelo usuário')
            setLoading(false)
        }

        if(type === 'success'){
            loadProfile(params.access_token)
        }
    }
    
    async function signIn({email, password}) {
        // console.log("user", user)
        // // setLoading(true)
        // await signInWithEmailAndPassword(auth, email.trim(), password)
        // .then((userCredential) => {
        //     const userLogado = userCredential.user;
        //     console.log("signInWithEmailAndPassword ", userLogado)
        //     api.defaults.headers['Autorization'] = `Bearer ${userLogado.accessToken}`;
            

        //     // async function addAsync(){
        //     //     await AsyncStorage.setItem('@RNAuth:token', userLogado.accessToken)
        //     //     // await AsyncStorage.setItem('@RNAuth:user', JSON.stringify(
        //     //     //     {
        //     //     //         'name': '',
        //     //     //         'avatar': '#',
        //     //     //         'role': ''
        //     //     //     }
        //     //     // ))
        //     //     setUser(userLogado)
        //     // }
        //     // addAsync()

        //     // // setLoading(false)
        // })
        // .catch((error) => {
        //     const errorCode = error.code;
        //     const errorMessage = error.message;
        //     console.log("Erro ao logar usuário", errorCode, errorMessage)
        //     if(errorCode === 'auth/user-not-found'){
        //         alert('Nenhuma usuário foi encontrado')
        //     }else{
        //         alert('Erro ao tentar fazer o login')
        //     }
        //     // setLoading(false)
        // });

        // // api.defaults.headers['Authorization'] = `Bearer ${response.token}`

        // // await AsyncStorage.setItem('@RNAuth:user', JSON.stringify(response.user))
        // // await AsyncStorage.setItem('@RNAuth:token', response.token)
    }

    async function signOut2() {
        try {
            // signOut(auth).then(() => {
            //     // Sign-out successful.
                
            //     // AsyncStorage.clear().then(() => {
            //     //     console.log('Saiu do sistema')
            //     //     setUser(null)
            //     // });
            // }).catch((error) => {
            // // An error happened.
            //     console.log('Erro ao sair do sistema', error)
            // });
            AsyncStorage.clear().then(() => {
                console.log('Saiu do sistema')
                setUser(null)

                signOut(auth).then(() => {
                    // Sign-out successful.
                    
                    // AsyncStorage.clear().then(() => {
                    //     console.log('Saiu do sistema')
                    //     setUser(null)
                    // });
                }).catch((error) => {
                // An error happened.
                    console.log('Erro ao sair do sistema', error)
                });
            });
        } catch (error) {
            console.log('Erro ao sair do sistema trycatch', error)
        }
    }

    async function logout(){
        setLoading(true)
        setUser(null)
        AsyncStorage.clear().then(() => {
            console.log('Saiu do APP')
        })
        setLoading(false)
    }

    return (
        <AuthContext.Provider value={{
            signed: !!user, 
            user, 
            signIn, 
            signInSocial,
            signOut2, 
            buscarDadosUser, 
            loading,
            loadi,
            logout,
            region,
            location,
            yourLocation,
            buscarMotoristaLivre,
            motoristaLivre,
            salvarOrder,
            idTransacao,
            removerOrder,
            aceite,
            iniciarChat,
            onSend,
            messages,
            // infoCorrida,
            updateUser,
            historicoCorridas,
            historico,
            historicoChats,
            chats,
            // showOrder
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext)
    return context
};

async function schedulePushNotification(token, title, body) {
//   alert('tete')
  // await Notifications.scheduleNotificationAsync({
  //   content: {
  //     title: "You've got mail! 📬",
  //     body: 'Here is the notification body',
  //     data: { data: 'goes here' },
  //   },
  //   trigger: { seconds: 2 },
  // });
  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ 
      to: "ExponentPushToken[HoRWXVB76JN2coSrVbZp96]",
      title: title,
      body: body,
    })
  });
}



async function registerForPushNotificationsAsync() {
  let token = '';
  if (Constants.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log("Token notificarion", token);
  } else {
    // alert('Deve usar o dispositivo físico para notificações push');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }
  console.log("Token notificarion fora", token);
  return token;
}