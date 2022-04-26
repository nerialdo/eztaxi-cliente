import React from "react";
import PageTipoUsuario from "../pages/TipoUsuario";
import PageLogin from "../pages/SignIn";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

const TipoUsuarioStack = createNativeStackNavigator();

const TipoUsuario = () => (
    <TipoUsuarioStack.Navigator>
        <TipoUsuarioStack.Screen 
            name="TipoUsuario" 
            component={PageTipoUsuario} 
            options={({ navigation, route }) => ({
                headerShown:false,
            })}
        />
        <TipoUsuarioStack.Screen 
            name="Login" 
            component={PageLogin} 
            options={({ navigation, route }) => ({
                headerShown:false,
            })}
        />
    </TipoUsuarioStack.Navigator>
);

export default TipoUsuario