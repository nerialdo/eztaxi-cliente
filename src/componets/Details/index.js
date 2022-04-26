import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components/native';
import uberx from "../../../assets/uberx.png";
import { StyleSheet, View, Dimensions, Platform, Image, ScrollView, TouchableOpacity} from 'react-native';
import { Text, Icon, Avatar, HStack, Spinner, Heading, Center} from "native-base";
import {Ionicons, FontAwesome5} from "@expo/vector-icons"
import { useAuth } from '../../contexts/auth';

const Details = ({distancia, navigation, destination, duration, abrirConfirmacao, yourLocation}) => {

  const { buscarMotoristaLivre, motoristaLivre} = useAuth()

  const [ selected, setSelected ] = useState(null)
  const [ valor, setValor ] = useState(null)

  useEffect(() => {
    buscarMotoristaLivre()
    console.log('*** motoristaLivre', motoristaLivre, distancia)

  }, [])

  // const checkout = () => {
  //   navigation.push('Checkout')
  // }


  function valorViagem(km, tarifa){
    console.log('tarifa', tarifa)
    var kmString = km.toString();
    // var arr = kmString.split('.'); 
    var arr = kmString.split('.'); 
    var km = arr[0];
    var m = arr[1]
    

    var kmInteger = parseInt(km)
    var mInteger = parseInt(m)

    // calcular KM
    var totalValorKm = kmInteger * tarifa.km

    // calcular Metros
    var valorMetro = tarifa.km / 1000
    var totalValorM = mInteger * valorMetro

    var totalCorrida = totalValorKm + totalValorM + tarifa.minimo

    console.log('arr ', totalValorKm, totalValorM, totalCorrida)
    return totalCorrida
  }

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
    <>
      <Container 
        // horizontal={true}
        // contentContainerStyle={{ width: `${100 * 3}%` }}
        // showsHorizontalScrollIndicator={false}
        // scrollEventThrottle={200}
        // decelerationRate="fast"
        // pagingEnabled
        // style={styles.scrollView}
      >
        <View >
            <View style={{ padding: 5, marginBottom: 5}}>
                <Text style={{fontWeight:'bold', textAlign: 'center'}}>
                  Escolha uma viagem ou deslize para cima para ver mais
                </Text>
                <Text style={{fontWeight:'normal', textAlign: 'center'}} numberOfLines={1}>
                  De: {yourLocation}
                </Text>
            </View>
        </View>
        {motoristaLivre.map((item, key) => (
          <TouchableOpacity 
            onPress={() => {
              setSelected(item)
              setValor(valorViagem(distancia, item.tarifa))
            }} 
            key={key} 
            style={{
              width: '100%',
              borderColor: '#dcfce7',
              borderWidth: 1,
              padding: 8,
              borderRadius: 5,
              // marginRight: 5,
              marginBottom: 10,
              backgroundColor: selected?.id == item?.id ? '#a7f3d0' : 'white'
            }}
          >
            <View style={styles.containerDetalhes}>
              <View style={styles.detalhesCarro}>
                <View style={styles.subDetalhesCarro}>
                  <Text style={{fontWeight:'bold', fontSize: 13}}>{item.carros.categoria} </Text><Text style={{fontWeight:'bold', fontSize: 19}}>{moedaBR(valorViagem(distancia, item.tarifa))}</Text>
                </View>
                <View style={styles.subDetalhesCarro}>
                  {/* <Text style={{fontWeight:'bold'}}>Honda Civic </Text> */}
                  <Text>{item.carros.marca} {item.carros.modelo} - {item.carros.placa}</Text>
                  {/* <Icon
                    as={Ionicons}
                    name="star"
                    color="yellow.500"
                    size={'5'}
                    _dark={{
                      color: "yellow.500",
                    }}
                  /> 
                  <Text>5</Text> */}
                </View>
              </View>
              <View>
                <Icon
                  as={Ionicons}
                  name="ios-car-sport"
                  color="coolGray.800"
                  size={'10'}
                  _dark={{
                    color: "warmGray.50",
                  }}
                />
              </View>
            </View>
            <View style={styles.containerDetalhesMotorista}>
              <View>
                <Avatar
                  bg="indigo.500"
                  alignSelf="center"
                  size={'10'}
                  source={{
                    uri: item.picture,
                  }}
                >
                  EZ
                </Avatar>
              </View>
              <View style={styles.detalhesCarro}>
                <View style={styles.subDetalhesCarro}>
                  <Text style={{fontWeight:'bold'}}>{item.nome}</Text><Text></Text>
                </View>
                <View style={styles.subDetalhesCarro}>
                  {/* <Icon
                    as={Ionicons}
                    name="star"
                    color="yellow.500"
                    size={'5'}
                    _dark={{
                      color: "yellow.500",
                    }}
                  /> 
                  <Text>5</Text> */}
                  <View>
                    {/* {item.formas_pagamento.map((item, key) => { */}
                    {item.formas_pagamento.length > 0 && (
                      <Text>
                        {item.formas_pagamento[0]}, {item.formas_pagamento[1]}, {item.formas_pagamento[2]}
                      </Text>
                    )}
                    {item.formas_pagamento.length === 0 && (
                      <Text>
                        Nenhuma forma de pagamento foi definida
                      </Text>
                    )}
                    {/* })} */}
                  </View>
                </View>
              </View>
            </View>
            {/* <RequestButton onPress={() => {abrirModal(item, valorViagem(distancia, item.tarifa))}}>
              <RequestButtonText>SOLICITAR</RequestButtonText>
            </RequestButton> */}
          </TouchableOpacity>
        ))}
        {motoristaLivre.length === 0 && (
          <HStack 
            space={2} 
            justifyContent="center"
          >
            <Center h="40" w="20" rounded="md">
              <Spinner color="indigo.500" accessibilityLabel="Loading posts" />
              <Heading color="indigo.500" fontSize="md">
                Buscando
              </Heading>
            </Center>
          </HStack>
        )}
      </Container>
      {selected && (
        <View style={styles.btnConfirmar}>
            <RequestButton onPress={() => {
              // abrirModal(item, valorViagem(distancia, item.tarifa))
              abrirConfirmacao(
                selected, 
                valor, 
                distancia,
                destination,
                duration,
                yourLocation
              )
            }}>
              <RequestButtonText>Confirmar {selected.carros.categoria}</RequestButtonText>
            </RequestButton>
        </View>
      )}
    </>
  )
}

export default Details

const Container = styled.ScrollView`
  background: #fff;
  height: 400px;
  width: 100%;
  position: absolute;
  bottom: 0;
  shadow-color: #000;
  shadow-offset: 0 0;
  shadow-opacity: 0.2;
  shadow-radius: 10;
  elevation: 3;
  border: 1px solid #ddd;
  padding: 8px 8px 100px 8px;
`;

// const TypeTitle = styled.Text`
//   font-size: 20px;
//   color: #222;
// `;

// const TypeDescription = styled.Text`
//   color: #666;
//   font-size: 14px;
// `;

const TypeImage = styled.Image`
  width: 50px;
  height: 50px;
  margin: 5px;
`;

const RequestButton = styled.TouchableOpacity`
  background: #222;
  justify-content: center;
  align-items: center;
  height: 60px;
  align-self: stretch;
  margin-top: 10px;
  border-radius: 5px;
`;

const RequestButtonText = styled.Text`
  color: #fff;
  font-weight: bold;
  font-size: 18px;
  text-transform: uppercase
`;

const styles = StyleSheet.create({
  items:{
    width: '100%',
    borderColor: '#dcfce7',
    borderWidth: 1,
    padding: 8,
    borderRadius: 5,
    // marginRight: 5,
    marginBottom: 10
  },
  containerDetalhes: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 20,
    marginBottom: 10
  },
  containerDetalhesMotorista: {
    // backgroundColor: '#F5FFFA',
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 20,
    marginBottom: 10
  },
  detalhesCarro:{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    flexDirection: 'column',
    marginLeft: 5,
    marginRight: 5
  },
  subDetalhesCarro:{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    flexDirection: 'row'
  },
  btnConfirmar:{
    width: '100%',
    padding: 20,
    backgroundColor: 'white',
    shadowColor: "gray",
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 1
    }
    // height: 40
  }
})