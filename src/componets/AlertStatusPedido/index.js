import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Dimensions, Platform} from 'react-native';
import MapViewDirections from "react-native-maps-directions";
import { Box, Collapse, Alert, VStack, HStack, Text, IconButton, CloseIcon, Button, Avatar} from 'native-base';

const AlertStatusPedido = ({ orderStatus, limparOrderStatus }) => {
    const [show, setShow] = useState(false);
    const [dados, setDados] = useState(null);

    useEffect(() => {
      console.log('++++ ',orderStatus,  orderStatus?.dados.data) 
      setDados(orderStatus?.dados.data)
      setShow(orderStatus)
    }, [])


    function closed(){
      limparOrderStatus()
      setShow(!show)
    }

    const AlertApp = () => {
        return <Box w="100%">
            <Collapse isOpen={show}>
              <Alert w="100%" maxW="1000" background={'white'}>
                <VStack space={1} flexShrink={1} w="100%">
                  <HStack flexShrink={1} space={2} alignItems="center" justifyContent="space-between">
                    <HStack flexShrink={1} space={2} alignItems="center">
                        <Avatar bg="amber.500" source={{
                        uri: show.quemCancelou === 'Cliente' ? dados.user.picture : dados?.dadosCorrida?.picture
                        }} size="md">
                            EZ
                            <Avatar.Badge bg="green.500" />
                        </Avatar>
                        <VStack>
                            <Text fontSize="md" fontWeight="medium" _dark={{
                                color: "coolGray.800"
                            }}>
                                {show.status}
                            </Text>
                            <Text fontSize="xs" fontWeight="normal" _dark={{
                                color: "coolGray.800"
                            }}>
                                {show.status === 'Cancelado' ? 'A corrida foi cancelada': 'A corrida foi aceita'}
                            </Text>
                        </VStack>
                    </HStack>
                    <IconButton variant="unstyled" _focus={{
                    borderWidth: 0
                  }} icon={<CloseIcon size="3" color="coolGray.600" />} onPress={() => {closed()}} />
                  </HStack>
                </VStack>
              </Alert>
            </Collapse>
          </Box>;
    }
    
    return (
        <AlertApp />
    )
};

export default AlertStatusPedido