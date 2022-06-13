import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Dimensions, Platform, } from 'react-native';
import MapViewDirections from "react-native-maps-directions";
import { 
    Box, 
    Collapse, 
    Alert, 
    VStack, 
    HStack, 
    Text, 
    IconButton, 
    CloseIcon, 
    Button, 
    Avatar, 
    Stagger, 
    useDisclose,
    Center,
    Icon,
   
} from 'native-base';
import {
    MaterialIcons,
    MaterialCommunityIcons
} from "@expo/vector-icons"
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../contexts/auth';

const StaggerApp = () => {
    const {user, logout} = useAuth()
    const {
        isOpen,
        onToggle
    } = useDisclose();
    const navigation = useNavigation();


    const goRota = (rota) => {
        navigation.navigate(rota);
        onToggle()
    }

    const sair = () => {
        console.log('=====>')
        logout()
    }

    return <Center>
        <Box alignItems="center">
            <Stagger visible={isOpen} initial={{
                opacity: 0,
                scale: 0,
                translateY: 34
            }} animate={{
                translateY: 0,
                scale: 1,
                opacity: 1,
                transition: {
                type: "spring",
                mass: 0.8,
                stagger: {
                    offset: 30,
                    reverse: true
                }
                }
            }} exit={{
                translateY: 34,
                scale: 0.5,
                opacity: 0,
                transition: {
                duration: 100,
                stagger: {
                    offset: 30,
                    reverse: true
                }
                }
            }}>
                <IconButton mb="4" onPress={sair} variant="solid" bg="indigo.500" colorScheme="indigo" borderRadius="full" icon={<Icon as={MaterialIcons} size="6" name="logout" _dark={{
                color: "warmGray.50"
                }} color="warmGray.50" />} />
                <IconButton onPress={() => {goRota('Perfil')}} mb="4" variant="solid" bg="yellow.400" colorScheme="yellow" borderRadius="full" icon={<Icon as={MaterialCommunityIcons} _dark={{
                color: "warmGray.50"
                }} size="6" name="account" color="warmGray.50" />} />
                <IconButton onPress={() => {goRota('Histórico')}} mb="4" variant="solid" bg="teal.400" colorScheme="teal" borderRadius="full" icon={<Icon as={MaterialCommunityIcons} _dark={{
                color: "warmGray.50"
                }} size="6" name="car" color="warmGray.50" />} />
                <IconButton onPress={() => {goRota('Dashboard')}} mb="4" variant="solid" bg="red.500" colorScheme="red" borderRadius="full" icon={<Icon as={MaterialIcons} size="6" name="home" _dark={{
                color: "warmGray.50"
                }} color="warmGray.50" />} />
            </Stagger>
        </Box>
        <HStack alignItems="center">
            <IconButton 
                variant="solid" 
                borderRadius="full" 
                size="lg" 
                onPress={onToggle} 
                bg="violet.900" 
                icon={
                    <Icon 
                        as={MaterialCommunityIcons} 
                        size="6" 
                        name="menu" 
                        color="warmGray.50"
                         _dark={{
                            color: "warmGray.50"
                        }} />
                } 
            />
        </HStack>
        </Center>;
};

export default StaggerApp