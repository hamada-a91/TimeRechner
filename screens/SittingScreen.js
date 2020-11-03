
import React, { Component, useState, useContext } from 'react';
import { StyleSheet, View, Text, ImageBackground, TouchableOpacity, SectionList, Dimensions } from 'react-native';

import { AutContext, AuthContext } from '../components/contex';

const { width, height } = Dimensions.get('window');

export default function Sitting() {
    const { signOut } = useContext(AuthContext);
    function SettingsItem(props) {
        return <Text style={styles.item}>{props.text}</Text>;
    }

    function SettingsHeader(props) {
        return <Text style={styles.section}>{props.text}</Text>;
    }

    return (
        <View style={styles.container}>
            <ImageBackground source={require("../assets/images/doegel2.jpg")} style={styles.image}>

                {/* <Image style={styles.image} source={require("../assets/images/doegel.jpg")}   ></Image> */}
                <SectionList
                    sections={[
                        {
                            title: 'Version',
                            data: [{ key: '1', info: '1.0' }]
                        }, {
                            title: 'Infos',
                            data: [{ key: '1', info: 'www.doegel.de' }]
                        },
                        {
                            title: 'Impressum',
                            data: [
                                { key: '2', info: 'Dögel GmbH' },
                                { key: '3', info: 'copyright 2020' }
                            ]
                        }
                    ]}
                    renderItem={({ item }) => <SettingsItem text={item.info} />}
                    renderSectionHeader={({ section }) => (
                        <SettingsHeader text={section.title} />
                    )}
                />
                <View style={{ marginTop: -0 }}>
                    <TouchableOpacity style={styles.button} onPress={() => signOut()}
                    >
                        <Text style={styles.title} >Abmelden</Text>

                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column'

    },
    image: {
        flex: 1,
        alignItems: 'center',
        opacity: 10,
    },
    title: {
        color: '#fff',
        fontSize: 20,
        fontWeight: '700',
    },
    button: {
        marginTop: -100,
        backgroundColor: "#ff8c1a",
        borderRadius: 10,
        height: 60,
        width: 200,
        alignItems: "center",
        justifyContent: "center"
    },
    section: {
        width: width,
        backgroundColor: 'whitesmoke',
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: 'lightgrey',
        fontSize: 18,
        padding: 5
    },
    item: {
        color: 'dimgrey',
        fontSize: 18,
        padding: 5
    }
});