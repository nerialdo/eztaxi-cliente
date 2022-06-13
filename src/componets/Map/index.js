import React, { useEffect, useState, useRef } from 'react';
import MapView, { Marker }from "react-native-maps";
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import { StyleSheet, View, Dimensions, Platform, Image} from 'react-native';
import * as Location from 'expo-location';
import Search from '../Search';
import Directions from '../Directions';
import { getPixelSize } from '../utils';
import markerImage from '../../../assets/marker.png';
import backImage from '../../../assets/back.png';
import styled, { css } from 'styled-components/native';
import Geocoder from 'react-native-geocoding';
import Details from '../../componets/Details';
import Esperando from '../../componets/Esperando';
import { MaterialCommunityIcons, AntDesign, Entypo } from "@expo/vector-icons"
import { Text, Button } from "native-base";

import { useAuth } from '../../contexts/auth';
import Checkout from '../../pages/Checkout';


Geocoder.init("AIzaSyA5E67B45xsd69Z2SKIhWuVbVlb736lWvk"); 

const Map = ({ navigation, handleMenuTop, handleMenuTop2 }) => {

    const {region, location, yourLocation, salvarOrder, user } = useAuth()
    // const isFocused = useIsFocused();
    // const [region, setRegion] = useState(null)
    // const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [destination, setDestination] = useState(null);
    const [duration, setDuration] = useState(null);
    const [distancia, setDistancia] = useState(null);
    const [mapView, setMapView] = useState(null);

    const [showModal, setShowModal] = useState(false);
    const [dadosCorrida, setDadosCorrida] = useState(null);
    const [valor, setValor] = useState(0);
    const [telaConfirmacao, setTelaConfirmacao] = useState(false);
    const map = useRef();

    
    // useFocusEffect(
    //     React.useCallback(() => {
    //         alert('aasa')
    //         setTelaConfirmacao(false)
    //     }, [])
    // );

    useEffect(() => {
        console.log('regionregionregion', region)
        const unsubscribe = navigation.addListener('focus', () => {
            setTelaConfirmacao(false)
        });
    
        // Return the function to unsubscribe from the event so it gets removed on unmount
        return unsubscribe;
    }, [navigation]);

    // useEffect(() => {
    //     (async () => {
    //       let { status } = await Location.requestForegroundPermissionsAsync();
    //       if (status !== 'granted') {
    //         setErrorMsg('Permission to access location was denied');
    //         return;
    //       }
    
    //       let locationGeo = await Location.getCurrentPositionAsync({});
    //     //   console.log('location', locationGeo)
    //       console.log('location', locationGeo.coords)
    //     //   setLocation(location);
    //       setRegion({
    //         latitude: locationGeo.coords.latitude,
    //         longitude: locationGeo.coords.longitude,
    //         latitudeDelta: 0.0143,
    //         longitudeDelta: 0.0134,
    //       })

    //       // buscar localidade atual
    //       const response = await Geocoder.from({
    //         latitude : locationGeo.coords.latitude,
    //         longitude : locationGeo.coords.longitude
    //       });
    //       const address = response.results[0].formatted_address;
    //       const addressComponents = response.results[0].address_components;
    //       console.log('address', address)
    //       //  console.log('addressComponents', addressComponents)
    //       var cidadeEstado = []
    //       //buscar informação de CIDADE e ESTADO
    //       console.log('addressComponents', addressComponents)
    //       let resCidadade = addressComponents.filter(addres => addres.types[0] === 'administrative_area_level_2')
    //       let resEstado = addressComponents.filter(addres => addres.types[0] === 'administrative_area_level_1')
          
    //       cidadeEstado.push({
    //         'cidade' : resCidadade[0].long_name,
    //         'estado' : resEstado[0].long_name
    //       })

    //       console.log('if', cidadeEstado)
    //       setLocation(address.substring(0, address.indexOf(",")))
    //     })();
    // }, []);

    const desabilitarTelaEspera = () => {
        setTelaConfirmacao(false)
    }

    const salvarPedido = (dadosCorrida, valor, distancia, destination, duration, yourLocation, region) => {
        salvarOrder(dadosCorrida, valor, distancia, destination, duration, user, yourLocation, region)
    }

    const abrirConfirmacao = ( dadosCorrida, valor, distancia, destination, duration, yourLocation, region) => {
        console.log('dadossoo', dadosCorrida, valor, distancia, destination, duration, yourLocation, region)
        salvarPedido(dadosCorrida, valor, distancia, destination, duration, yourLocation, region)
        // setShowModal(!showModal)
        handleBack()
        // handleMenuTop()
        handleMenuTop2()
        setTelaConfirmacao(true)
        // navigation.push('Confirmacao');
    }

    const abrirModal = (e, valor) => {
        setShowModal(!showModal)
        setDadosCorrida(e)
        setValor(valor)
    }

    const onRegionChange = (region) => {
        // console.log('Region ', region)
    }

    handleLocationSelected = (data, { geometry }) => {
        console.log('handleLocationSelected', data, geometry)
        const {location: { lat: latitude, lng: longitude }} = geometry;
        handleMenuTop()
        setDestination({
            latitude,
            longitude,
            title: data.structured_formatting.main_text,
            title_secondary: data.structured_formatting.secondary_text,
        })
    }

    const handleBack = () => {
        setDestination(null)
        handleMenuTop()
        // setTelaConfirmacao(!telaConfirmacao)
    }

    const converterMinuto = (min) => {
        if(min === 0){
            return 1 +'min'
        }
        if(min <= 60){
            return min +'min'
        }else{
            return parseFloat(min / 60).toFixed(2) + 'hs'
        }
    }

    const converterKm = (km) => {
        if(Math.floor(km) === 0){
            var decPart = (km+"").split(".")[1]
            return decPart + 'm'
        }else{
            return Math.floor(km) + 'km'
        }
    }

    return (
        <View style={styles.container}>
            {/* <MapView
            style={styles.map}
            initialRegion={{
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }}
            //-2.515378462731104, -45.08319901273059
            /> */}
            {region && (
                <MapView
                    style={styles.map}
                    region={region}
                    onRegionChange={onRegionChange}
                    mapType={Platform.OS == "android" ? "none" : "standard"}
                    showsUserLocation
                    loadingEnabled
                    styles={{
                        textInputContainer: {
                        backgroundColor: 'grey',
                        },
                        textInput: {
                        height: 38,
                        color: '#5d5d5d',
                        fontSize: 16,
                        },
                        predefinedPlacesDescription: {
                        color: '#1faadb',
                        },
                    }}
                    ref={map}
                >
                     {destination && (
                         <>
                            <Directions 
                                origin={region}
                                destination={destination}
                                onReady={result => {
                                    console.log('DADOS DA VIAGEM', result)
                                    console.log(`Distance: ${result.distance} km`)
                                    console.log(`Duration: ${result.duration} min.`)
                                    setDistancia(result.distance);
                                    setDuration(Math.floor(result.duration));
                                    map.current.fitToCoordinates(result.coordinates, {
                                        edgePadding: {
                                        top: getPixelSize(50),
                                        right: getPixelSize(50),
                                        left: getPixelSize(50),
                                        bottom: getPixelSize(350),
                                        },
                                    });
                                }}
                            />
                            <Marker
                                coordinate={destination}
                                anchor={{ x: 0, y: 0 }}
                                image={markerImage}
                            >
                                <LocationBox>
                                    {/* <LocationTimeBox>
                                        <LocationTimeText>{duration}</LocationTimeText>
                                        <LocationTimeTextSmall>MIN</LocationTimeTextSmall>
                                    </LocationTimeBox> */}
                                    <LocationText>{destination.title}</LocationText>
                                </LocationBox>
                            </Marker>
                            <Marker coordinate={region} anchor={{ x: 0, y: 0 }}>
                                <LocationBox>
                                    {/* <LocationTimeBox>
                                        <LocationTimeText>{duration}</LocationTimeText>
                                        <LocationTimeTextSmall>MIN</LocationTimeTextSmall>
                                    </LocationTimeBox> */}
                                    <LocationText>{location}</LocationText>
                                </LocationBox>
                            </Marker>
                         </>
                     )}
                </MapView>
            )}
            
            {destination 
            ? 
            <>
                <View style={styles.infoTop}>
                    <Back onPress={handleBack}>
                        <Image source={backImage} />
                    </Back>
                    <View style={styles.infoTopViagem}>
                        {distancia && duration && (
                            <View>
                                <Text style={{fontWeight: 'bold'}} fontSize="md">{converterMinuto(duration)}</Text>
                                <Text fontSize="xs">{distancia} Km</Text>
                            </View>
                        ) }
                        {/* <View>
                            <Text fontSize="xs">xs</Text>
                        </View> */}
                    </View>
                </View>
                {distancia && (
                    <Details 
                        distancia={distancia} 
                        navigation={navigation} 
                        destination={destination}
                        duration={duration}
                        abrirConfirmacao={abrirConfirmacao}
                        yourLocation={yourLocation}
                    /> 
                )}
            </>
            : 
            <>
                <Search onLocationSelected={handleLocationSelected} yourLocation={yourLocation}/>
            </>
            }
            {telaConfirmacao && (
                <View>
                    <Esperando 
                        navigation={navigation}
                        handleMenuTop={handleMenuTop} 
                        handleBack={handleBack}
                        desabilitarTelaEspera={desabilitarTelaEspera}
                    />
                </View>
            )}
            {/* {dadosCorrida && valor && (
                <Checkout 
                    showModal={showModal}
                    abrirModal={abrirModal} 
                    distancia={distancia} 
                    dadosCorrida={dadosCorrida}
                    valor={valor}
                    navigation={navigation} 
                    abrirConfirmacao={abrirConfirmacao}
                    destination={destination}
                    duration={duration}
                />
            )} */}
        </View> 
    )
}

export default Map

const ContainerTopo = styled.View`
    display: flex;
    justify-content: center,
`;

const LocationBox = styled.View`
    background: #fff;
    shadow-color: #000;
    shadow-offset: 0 0;
    shadow-opacity: 0.1;
    elevation: 1;
    border: 1px solid #ddd;
    border-radius: 3px;
    flex-direction: row;
    ${Platform.select({
    ios: css`
        margin-top: 20px;
    `,
    android: css`
        margin-top: 10px;
        margin-left: 10px;
    `
    })}
`;

const LocationText = styled.Text`
  margin: 8px 10px;
  font-size: 14px;
  color: #333;
`;

const LocationTimeBox = styled.View`
  background: #222;
  padding: 3px 8px;
`;

const LocationTimeText = styled.Text`
  color: #fff;
  font-size: 12px;
  text-align: center;
`;

const LocationTimeTextSmall = styled.Text`
  color: #fff;
  font-size: 10px;
  text-align: center;
`;

// const InfoTop = styled.View`
//   position: absolute;
//   display: flex;
//   top: ${Platform.select({ ios: 60, android: 40 })};
//   left: 20px;
//   padding: 15px
//   background: #fff;
//   border-radius: 30px;
// `;

const Back = styled.TouchableOpacity`
    display: flex;
    justify-content: center;
    background: #fff;
    padding: 15px;
    border-radius: 30px
`;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      
    },
    map: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
      flex: 1,
    },
    infoTop: {
        position: 'absolute',
        display: 'flex',
        top: Platform.select({ ios: 60, android: 40 }),
        padding: 15,
        // backgroundColor: '#fff',
        // borderRadius: 30,
        flexDirection: 'row',
        width: '100%'
    },
    infoTopViagem: {
        backgroundColor: '#fff',
        left: 10,
        borderTopLeftRadius: 20,
        borderBottomRightRadius: 20,
        paddingBottom: 10,
        paddingTop: 10,
        paddingLeft: 30,
        paddingRight: 30,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        shadowColor: '#171717',
        shadowOffset: {width: -1, height: 2},
        shadowOpacity: 0.1,
        // shadowRadius: 3,
    }
});
  