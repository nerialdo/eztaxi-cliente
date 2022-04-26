import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, Alert} from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import {Icon} from "native-base"
import { MaterialCommunityIcons, AntDesign, Entypo } from "@expo/vector-icons"

export default function LerQrCode({dadosQr, habilitarTelas}) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [scanned2, setScanned2] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    var dadosQrCode = JSON.parse(data)
    dadosQr(dadosQrCode)
    Alert.alert('Sucesso', 'QrCode validado com sucesso!')
  };

  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text>Precisamos de permissão para acessar sua camera</Text>
      </View>
    )
  }
  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text>Não temos acesso a sua camera</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />

      <View style={[styles.containerLoading, styles.horizontal]}>
        <Icon
          as={AntDesign}
          size="10"
          name="scan1"
          color="#fff"
          _dark={{
            color: "warmGray.50",
          }}
        />
      </View>
       {scanned && (
          <View style={styles.btn}>
              <Button title={'NOVO BILHETE'} onPress={() => {
                  setScanned(false)
              }} />
          </View>
        )} 
        <View style={styles.btnTop}>
            <Button title={'VOLTAR'} onPress={() => {
                setScanned(false)
                habilitarTelas()
            }} />
        </View>
    </View>
  );
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    btn:{
        position: 'absolute',
        bottom: 0,
        width: '100%',
        marginBottom: 10,
    },
    btnTop:{
        position: 'absolute',
        top: 0,
        width: '100%',
        marginBottom: 10,
    },
    containerTelaCamera: {
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