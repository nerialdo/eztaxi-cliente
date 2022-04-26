import { StatusBar} from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, View, Text, SafeAreaView, ScrollView, ActivityIndicator, TouchableOpacity} from 'react-native';
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
  Spinner
} from "native-base";
import {useAuth} from '../../contexts/auth';
import { getAuth, updatePassword, reauthenticateWithCredential } from "firebase/auth";
import { useForm, Controller } from 'react-hook-form';

const Perfil = ({ navigation }) => {
  const {user, updateUser, loadi} = useAuth()
  const { colors } = useTheme()
  const [formData, setData] = useState({});
  // const [errors, setErrors] = useState({});
  const auth = getAuth();
  const userLogado = auth.currentUser;

  const { register, formState: { errors }, handleSubmit, control, setValue, watch } = useForm();

  // useEffect(() => {
  //   const unsubscribe = navigation.addListener('blur', () => {
  //     alert('aqui')
  //   });

  //   // Return the function to unsubscribe from the event so it gets removed on unmount
  //   return unsubscribe;
  // }, [navigation]);
  

  useEffect(() => {
    console.log('useEffect perfil', user)
    setValue('nome', user.name)
    setValue('contato', user.contato)
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


  const onSubmit = (data) => {
    updateUser(user.id, data)
  };

 
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <LinearGradient 
          // style={{
          //   height: 45, 
          //   width: 100, 
          //   marginTop: 15, 
          //   borderRadius: 5
          // }}
          style={styles.viewAvatar}
          colors={['#A62A5C','#6A2597']}
        >
          <Avatar 
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
          </Center>
        </LinearGradient>
        <View style={styles.containerForm}>
            <View style={styles.mainForm}>
              <FormControl isRequired isInvalid={'nome' in errors}>
                <FormControl.Label _text={{bold: true}}>Nome</FormControl.Label>
                <Controller
                  control={control}
                  render={({ field: { onChange }, onBlur, value }) => (
                    <Input
                      style={styles.form}
                      onBlur={onBlur}
                      placeholder="Seu nome"
                      onChangeText={(val) => {onChange(val)}}
                      value={watch("nome")}
                    />
                  )}
                  name="nome"
                  rules={{ required: 'Field is required', minLength: 3 }}
                  defaultValue=""
                />
              </FormControl>
              <FormControl isRequired isInvalid={'contato' in errors}>
                <FormControl.Label _text={{bold: true}}>Telefone/WhatsApp</FormControl.Label>
                <Controller
                  control={control}
                  render={({ field: { onChange }, onBlur, value }) => (
                    <Input
                      style={styles.form}
                      onBlur={onBlur}
                      placeholder="(00)0000-0000"
                      onChangeText={(val) => {onChange(val)}}
                      value={watch("contato")}
                    />
                  )}
                  name="contato"
                  rules={{ required: 'Field is required', minLength: 3 }}
                  defaultValue=""
                />
              </FormControl>
              {/* <FormControl isRequired isInvalid={'name' in errors}>
                  <FormControl.Label _text={{bold: true}}>Email</FormControl.Label>
                  <Input
                    style={styles.form}
                    type="email"
                    // value={user.email}
                    onChangeText={(value) => setData({ ...formData, name: value })}
                  />
              </FormControl> */}
              {/* <FormControl isRequired isInvalid={'cpf' in errors}>
                  <FormControl.Label _text={{bold: true}}>CPF</FormControl.Label>
                  <Input
                    type="cpf"
                    value={user.cpf}
                    onChangeText={(value) => setData({ ...formData, name: value })}
                  />
                  {'cpf' in errors ?
                    <FormControl.ErrorMessage _text={{fontSize: 'xs', color: 'error.500', fontWeight: 500}}>
                      {errors.cpf}
                    </FormControl.ErrorMessage>
                  :
                  <FormControl.HelperText _text={{fontSize: 'xs'}}>
                    Digite o email do seu cadastro
                  </FormControl.HelperText>
                  } 
              </FormControl> */}
              {/* <FormControl isRequired isInvalid={'endereco' in errors}>
                  <FormControl.Label _text={{bold: true}}>Endereço</FormControl.Label>
                  <Input
                    type="endereco"
                    style={styles.form}
                    value={user.endereco}
                    onChangeText={(value) => setData({ ...formData, name: value })}
                  />
              </FormControl> */}
              {/* <FormControl isRequired isInvalid={'telefone' in errors}>
                  <FormControl.Label _text={{bold: true}}>Telefone</FormControl.Label>
                  <Input
                    type="text"
                    name="telefone"
                    style={styles.form}
                    value={user.telefone}
                    onChangeText={(value) => setData({ ...formData, name: value })}
                  />
              </FormControl> */}
              {/* <FormControl isRequired isInvalid={'whatsapp' in errors}>
                  <FormControl.Label _text={{bold: true}}>WhatsApp</FormControl.Label>
                  <Input
                    type="text"
                    name="whatsapp"
                    style={styles.form}
                    value={user.whatsapp}
                    onChangeText={(value) => setData({ ...formData, name: value })}
                    // onChangeText={(value) => setData({ ...formData, name: value })}
                  />
              </FormControl> */}
              {/* <FormControl isRequired isInvalid={'password' in errors}>
                <FormControl.Label _text={{bold: true}}>Senha</FormControl.Label>
                <Input
                  type="password"
                  style={styles.form}
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
              </FormControl> */}
              <LinearGradient 
                style={{
                  width: '100%',
                  borderRadius: 10,
                  marginTop: 20
                }}
                colors={['#A62A5C','#6A2597']}
              >
                <TouchableOpacity 
                  style={{
                    backgroundColor: 'transparent',
                    height: 50,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                  onPress={handleSubmit(onSubmit)}
                >
                  <Text style={{color:'white'}}>Atualizar</Text>
                </TouchableOpacity>
              </LinearGradient>
            </View>
        </View>
      </ScrollView>
      {loadi && (
        <View style={styles.loadi}>
            <Spinner size="lg" color="emerald.500" />
            <Text style={{ fontSize: 12, color: 'gray'}}>Aguarde</Text>
        </View>
      )}
    </SafeAreaView>
  );
}

export default Perfil

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
  scrollView: {
    backgroundColor: '#fafafa',
    // marginHorizontal: 20,
  },
  viewAvatar: {
    backgroundColor: '#a1a1aa',
    paddingTop: 20,
    paddingBottom: 20,
    marginBottom: 20,
    // minHeight: 500
  },
  containerForm: {
    padding: 10
  },
  mainForm: {
    backgroundColor: 'white',
    marginTop: -50,
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
  form:{
    height: 40,
    backgroundColor: '#f4f4f5',
    marginBottom: 20
  }
});

