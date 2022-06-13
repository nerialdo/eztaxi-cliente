import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Dimensions, Platform} from 'react-native';
import MapViewDirections from "react-native-maps-directions";
import { Box, Collapse, Alert, VStack, HStack, Text, IconButton, CloseIcon, Button, Avatar} from 'native-base';

const AlertMsg = ({  }) => {
    const [show, setShow] = React.useState(true);

    const AlertApp = () => {
        return <Box w="100%">
            <Collapse isOpen={show}>
              <Alert w="100%" maxW="1000" background={'white'}>
                <VStack space={1} flexShrink={1} w="100%">
                  <HStack flexShrink={1} space={2} alignItems="center" justifyContent="space-between">
                    <HStack flexShrink={1} space={2} alignItems="center">
                        <Avatar bg="amber.500" source={{
                        uri: "https://images.unsplash.com/photo-1614289371518-722f2615943d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
                        }} size="md">
                            NB
                            <Avatar.Badge bg="green.500" />
                        </Avatar>
                        <VStack>
                            <Text fontSize="md" fontWeight="medium" _dark={{
                                color: "coolGray.800"
                            }}>
                                Nome motorista
                            </Text>
                            <Text fontSize="xs" fontWeight="normal" _dark={{
                                color: "coolGray.800"
                            }}>
                                Ultima mensagem do motirista
                            </Text>
                        </VStack>
                    </HStack>
                    <IconButton variant="unstyled" _focus={{
                    borderWidth: 0
                  }} icon={<CloseIcon size="3" color="coolGray.600" />} onPress={() => setShow(false)} />
                  </HStack>
                  {/* <Box pl="6" _dark={{
                    _text: {
                        color: "coolGray.600"
                    }
                  }}>
                    Your coupon could not be processed at this time.
                  </Box> */}
                </VStack>
              </Alert>
            </Collapse>
            {/* <Button size={"sm"} onPress={() => setShow(true)} mt={8} mx="auto">
              Re-Open
            </Button> */}
          </Box>;
    }
    
    return (
        <AlertApp />
    )
};

export default AlertMsg