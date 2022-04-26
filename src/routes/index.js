import React from "react";

import { StyleSheet, View, ActivityIndicator } from "react-native";

import {useAuth} from "../contexts/auth";

import AuthRoutes from "./auth.routes";

import AppRoutes from "./app.routes";

import TipoUsuario from "./tipousuario.routes";

const Routes = () => {
    const { signed, loading} = useAuth()
    console.log("loading page Routes", signed, loading)

    if(loading){
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#666" />
            </View>
        )
    }

    return signed ? <AppRoutes /> : <AuthRoutes />;
}

export default Routes;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});