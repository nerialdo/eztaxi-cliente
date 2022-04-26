import React from "react";
import Dashboard from "../pages/Dashboard";
import CadastrarBilhetes from "../pages/CadastrarBilhetes";
import Perfil from "../pages/Perfil";
import Historico from "../pages/Historico";
import Chats from "../pages/Chats";
import Extrato from "../pages/Extrato";
import Checkout from "../pages/Checkout";
import Confirmacao from "../pages/Confirmacao";
import Chat from "../pages/Chat";
import { Button, Icon } from "native-base";
import { Ionicons } from "@expo/vector-icons"

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from '@react-navigation/drawer';

const AppStack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const AppRoutes = () => (
    <AppStack.Navigator 
        initialRouteName="Dashboard"
        screenOptions={{
            headerMode: 'screen',
            headerTintColor: 'black',
            headerStyle: { backgroundColor: 'transparent' },
        }}
    >
        <AppStack.Screen
            name="Dashboard" 
            component={Dashboard} 
            options={({ navigation, route }) => ({
                headerShown:false,
                // headerRight: () => (
                //     <Button
                //         onPress={() => navigation.navigate('Perfil')}
                //         colorScheme="primary"
                //         variant="ghost"
                //         _text={{
                //             color: "#047857",
                //         }}
                //         leftIcon={
                //             <Icon as={Ionicons} name="person-circle-outline" size="sm" />
                //         }
                //     >
                //     </Button>
                // )
            })}
        />
        <AppStack.Screen
            name="Cadastrar" 
            component={CadastrarBilhetes} 
            options={({ navigation, route }) => ({
                headerRight: () => (
                    <Button
                        onPress={() => navigation.navigate('Perfil')}
                        colorScheme="primary"
                        variant="ghost"
                        _text={{
                            color: "#047857",
                        }}
                        leftIcon={
                            <Icon as={Ionicons} name="person-circle-outline" size="sm" />
                        }
                    >
                    </Button>
                )
            })}
        />
        <AppStack.Screen
            name="Perfil" 
            component={Perfil} 
            options={({ navigation, route }) => ({
                headerBackTitleVisible: false,
                headerRight: () => (
                    <Button
                        onPress={() => navigation.navigate('Perfil')}
                        colorScheme="primary"
                        variant="ghost"
                        _text={{
                            color: "#047857",
                        }}
                        leftIcon={
                            <Icon as={Ionicons} name="person-circle-outline" size="sm" />
                        }
                    >
                    </Button>
                )
            })}
        />
        <AppStack.Screen
            name="Histórico" 
            component={Historico} 
            options={({ navigation, route }) => ({
                headerBackTitleVisible: false,
                headerRight: () => (
                    <Button
                        onPress={() => navigation.navigate('Perfil')}
                        colorScheme="primary"
                        variant="ghost"
                        _text={{
                            color: "#047857",
                        }}
                        leftIcon={
                            <Icon as={Ionicons} name="person-circle-outline" size="sm" />
                        }
                    >
                    </Button>
                )
            })}
        />
        <AppStack.Screen
            name="Conversas" 
            component={Chats} 
            options={({ navigation, route }) => ({
                headerBackTitleVisible: false,
                headerRight: () => (
                    <Button
                        onPress={() => navigation.navigate('Perfil')}
                        colorScheme="primary"
                        variant="ghost"
                        _text={{
                            color: "#047857",
                        }}
                        leftIcon={
                            <Icon as={Ionicons} name="person-circle-outline" size="sm" />
                        }
                    >
                    </Button>
                )
            })}
        />
        <AppStack.Screen
            name="Extrato" 
            component={Extrato} 
            options={({ navigation, route }) => ({
                headerRight: () => (
                    <Button
                        onPress={() => navigation.navigate('Perfil')}
                        colorScheme="primary"
                        variant="ghost"
                        _text={{
                            color: "#047857",
                        }}
                        leftIcon={
                            <Icon as={Ionicons} name="person-circle-outline" size="sm" />
                        }
                    >
                    </Button>
                )
            })}
        />
        <AppStack.Screen
            name="Checkout" 
            component={Checkout} 
            options={({ navigation, route }) => ({
                headerTitle: 'Checkout',
                headerRight: () => (
                    <Button
                        onPress={() => navigation.navigate('Perfil')}
                        colorScheme="primary"
                        variant="ghost"
                        _text={{
                            color: "#047857",
                        }}
                        leftIcon={
                            <Icon as={Ionicons} name="person-circle-outline" size="sm" />
                        }
                    >
                    </Button>
                )
            })}
        />
        <AppStack.Screen
            name="Chat" 
            component={Chat} 
            options={({ navigation, route }) => ({
                headerTitle: 'Chat',
                headerBackTitleVisible: false
                // headerRight: () => (
                //     <Button
                //         onPress={() => navigation.navigate('Perfil')}
                //         colorScheme="primary"
                //         variant="ghost"
                //         _text={{
                //             color: "#047857",
                //         }}
                //         leftIcon={
                //             <Icon as={Ionicons} name="person-circle-outline" size="sm" />
                //         }
                //     >
                //     </Button>
                // )
            })}
        />
        <AppStack.Screen
            name="Confirmacao" 
            component={Confirmacao} 
            options={({ navigation, route }) => ({
                headerShown:false,
            })}
        />
    </AppStack.Navigator>
    // <Drawer.Navigator initialRouteName="Dashboard">
    //     <Drawer.Screen name="Dashboard" component={Dashboard} />
    //     <Drawer.Screen name="Perfil" component={Perfil} />
    //     <Drawer.Screen name="Checkout" component={Checkout} />
    //     <Drawer.Screen name="Chat" component={Chat} />
    // </Drawer.Navigator>
);

export default AppRoutes