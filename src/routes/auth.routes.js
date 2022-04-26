import React from "react";
import SignIn from "../pages/SignIn";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

const AuthStack = createNativeStackNavigator();

const AuthRoutes = () => (
    <AuthStack.Navigator>
        <AuthStack.Screen 
            name="Login/Cadastro" 
            component={SignIn} 
            options={({ navigation, route }) => ({
                headerShown:false,
            })}
        />
    </AuthStack.Navigator>
);

export default AuthRoutes