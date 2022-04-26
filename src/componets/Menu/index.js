import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components/native';
import {
  IconButton,
  Icon
} from "native-base";
import {AntDesign, EvilIcons, FontAwesome5, MaterialIcons, Ionicons} from "@expo/vector-icons"
import uberx from "../../../assets/uberx.png";
import { useAuth } from '../../contexts/auth';
import { StackActions } from '@react-navigation/native';


const MyMenu = ({rotasTelas}) => {
    const {user, logout} = useAuth()

    const pushAction = StackActions.push('Profile', { user: 'Wojtek' });

    const handleMenu = (page) => {
      rotasTelas(page)
    }
    
    const sair = () => {
      console.log('=====>')
      logout()
    }

    return (
        <Container>
            <IconMenu>
              <IconButton
                onPress={() => {
                  handleMenu('Perfil')
                }}
                icon={<Icon as={FontAwesome5} name="user-cog" />}
                borderRadius="full"
                _icon={{
                  color: "#708090",
                  size: "md",
                }}
                _hover={{
                  bg: "orange.600:alpha.20",
                }}
                _pressed={{
                  bg: "orange.600:alpha.20",
                  _icon: {
                    name: "user-cog",
                  },
                  _ios: {
                    _icon: {
                      size: "35",
                    },
                  },
                }}
                _ios={{
                  _icon: {
                    size: "35",
                  },
                }}
              />
              <Txt>Eu</Txt>
            </IconMenu>
            {/* <IconMenu >
              <IconButton
                onPress={() => {
                  handleMenu('Conversas')
                }}
                icon={<Icon as={MaterialIcons} name="chat" />}
                borderRadius="full"
                _icon={{
                  color: "#708090",
                  size: "md",
                }}
                _hover={{
                  bg: "orange.600:alpha.20",
                }}
                _pressed={{
                  bg: "orange.600:alpha.20",
                  _icon: {
                    name: "chat",
                  },
                  _ios: {
                    _icon: {
                      size: "35",
                    },
                  },
                }}
                _ios={{
                  _icon: {
                    size: "35",
                  },
                }}
              />
              <Txt>Chat</Txt>
            </IconMenu> */}
            <IconMenu>
              <IconButton
                onPress={() => {
                  handleMenu('Histórico')
                }}
                icon={<Icon as={Ionicons} name="car-sport-sharp" />}
                borderRadius="full"
                _icon={{
                  color: "#708090",
                  size: "md",
                }}
                _hover={{
                  bg: "orange.600:alpha.20",
                }}
                _pressed={{
                  bg: "orange.600:alpha.20",
                  _icon: {
                    name: "car-sport-sharp",
                  },
                  _ios: {
                    _icon: {
                      size: "35",
                    },
                  },
                }}
                _ios={{
                  _icon: {
                    size: "35",
                  },
                }}
              />
              <Txt>Histórico</Txt>
            </IconMenu>
            <IconMenu >
              <IconButton
                onPress={() => {sair()}}
                icon={<Icon as={Ionicons} name="remove-circle-outline" />}
                borderRadius="full"
                _icon={{
                  color: "#708090",
                  size: "md",
                }}
                _hover={{
                  bg: "orange.600:alpha.20",
                }}
                _pressed={{
                  bg: "orange.600:alpha.20",
                  _icon: {
                    name: "car-sport-sharp",
                  },
                  _ios: {
                    _icon: {
                      size: "35",
                    },
                  },
                }}
                _ios={{
                  _icon: {
                    size: "35",
                  },
                }}
              />
              <Txt>Sair</Txt>
            </IconMenu>
        </Container>
    )
}

export default MyMenu

const Container = styled.View`
  background: #fff;
  height: 300px;
  width: 100%;
  position: absolute;
  bottom: 0;
  shadow-color: #000;
  shadow-offset: 0 0;
  shadow-opacity: 0.2;
  shadow-radius: 10;
  elevation: 3;
  border: 1px solid #ddd;
  align-items: center;
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
`;

const IconMenu = styled.TouchableOpacity`
  padding: 5px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Txt = styled.Text`
  font-size: 12px
`;
