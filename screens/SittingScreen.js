
import React, { Component, useState, useContext } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';

import { AutContext, AuthContext } from '../components/contex';


export default function Sitting() {
    const { signOut } = useContext(AuthContext);

    return (
        <View style={styles.container}>
            <Image style={styles.image} source={require("../assets/images/doegel.jpg")}   ></Image>
            <TouchableOpacity style={styles.button} onPress={() => signOut()}
            >
                <Text style={styles.title} >Abmelden</Text>

            </TouchableOpacity>
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        width: '120%',
        marginTop: '-20%',
        resizeMode: 'stretch',
        height: '80%',
        marginBottom: '26%',
        opacity: 0.1,

    },
    title: {
        color: '#fff',
        fontSize: 20,
        fontWeight: '700',
    },
    button: {
        backgroundColor: "#ff8c1a",
        marginTop: '-70%',
        borderRadius: 10,
        height: 60,
        width: 200,
        alignItems: "center",
        justifyContent: "center"
    },
});