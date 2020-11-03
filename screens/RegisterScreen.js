import React, { Component, useEffect, useContext, useState } from 'react';
import {
    View,
    Text,
    Alert,
    TouchableOpacity,
    Dimensions,
    TextInput,
    Platform,
    StyleSheet,
    StatusBar
} from 'react-native';

import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-community/async-storage';
import { AuthContext } from '../components/contex';


const { width, height } = Dimensions.get('window')

const RegisterScreen = ({ navigation }) => {

    const [data, setData] = React.useState({
        username: '',
        password: '',
        check_textInputChange: false,
        secureTextEntry: true,
        confirmsecureTextEntry: true,
    });
    const [user, setuser] = React.useState([]);
    useEffect(() => {
        _retrieveData()
    }, [])

    const { signUp } = useContext(AuthContext);


    const textInputChange = (val) => {
        if (val.length !== 0) {
            setData({
                ...data,
                username: val,
                check_textInputChange: true
            });
        } else {
            setData({
                ...data,
                username: val,
                check_textInputChange: false
            });
        }
    }
    const handlePasswordChange = (val) => {
        setData({
            ...data,
            password: val
        });
    }
    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        });
    }
    const updateConfirmSecureTextEntry = () => {
        setData({
            ...data,
            confirmsecureTextEntry: !data.confirmsecureTextEntry
        });
    }
    const _storDataun = async (u) => {
        console.log(u)
        try {

            await AsyncStorage.setItem('user', JSON.stringify(user))
            console.log("undata")
        } catch (e) {
            console.log(e)
        }
    }
    const _storData = async (u) => {

        try {

            await AsyncStorage.setItem('user', JSON.stringify(u))
            console.log("successe")
            console.log(user)


        } catch (e) {
            console.log(e)
        }
    }
    const _retrieveData = async () => {
        let value = await AsyncStorage.getItem('user');
        if (value !== null) {
            value = JSON.parse(value);
            setuser(value)
            console.log("success");
            console.log(user)
        }
    }
    const halndeRegister = (username, password) => {
        let users = user;
        if (username !== '' && password !== '') {
            if (username.length < 4 || password.length < 7) {
                Alert.alert('type Fehler', 'username muss mehr als 4 Buchstaben und Password mehr als 8', [
                    { text: 'okay' }
                ]);
                return;
            }
            users.unshift({ username, password })
            setuser(users)
            _storData(users)
            signUp(username, password)
        }
        else {
            Alert.alert('type Fehler', 'username oder Passwort ist leerrr', [
                { text: 'okay' }
            ]);

        }



    }

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='orange' barStyle="light-content" />
            <View style={styles.header}>
                <Text style={styles.text_header}>Regestrieren</Text>
            </View>
            <Animatable.View
                animation="fadeInUpBig"
                style={styles.footer}>
                <Text style={styles.text_footer}>Email</Text>
                <View style={styles.action}>
                    <FontAwesome
                        name="user-o"
                        color="#05375a"
                        size={20}
                    />
                    <TextInput
                        placeholder="Your Email"
                        style={styles.textInput}
                        autoCapitalize="none"
                        onChangeText={(val) => textInputChange(val)}
                    />
                    {data.check_textInputChange ? <Animatable.View
                        animation="bounceIn">
                        <Feather
                            name="check-circle"
                            color="green"
                            size={20}
                        />

                    </Animatable.View>
                        : null}



                </View>
                <Text style={[styles.text_footer, { marginTop: 20 }]}>Passwort</Text>
                <View style={styles.action}>
                    <Feather
                        name="lock"
                        color="#05375a"
                        size={20}
                    />
                    <TextInput
                        placeholder="Your Password"
                        secureTextEntry={data.secureTextEntry ? true : false}
                        style={styles.textInput}
                        autoCapitalize="none"
                        onChangeText={(val) => handlePasswordChange(val)}
                    />
                    <TouchableOpacity
                        onPress={updateSecureTextEntry}
                    >
                        {data.secureTextEntry ?
                            <Feather
                                name="eye-off"
                                color="grey"
                                size={20}
                            />
                            :
                            <Feather
                                name="eye"
                                color="grey"
                                size={20}
                            />
                        }
                    </TouchableOpacity>

                </View>
                <Text style={[styles.text_footer, { marginTop: 20 }]}>Passwort Bestätigen</Text>
                <View style={styles.action}>
                    <Feather
                        name="lock"
                        color="#05375a"
                        size={20}
                    />
                    <TextInput
                        placeholder="Your Password"
                        secureTextEntry={data.secureTextEntry ? true : false}
                        style={styles.textInput}
                        autoCapitalize="none"
                        onChangeText={(val) => handlePasswordChange(val)}
                    />
                    <TouchableOpacity
                        onPress={updateConfirmSecureTextEntry}
                    >
                        {data.secureTextEntry ?
                            <Feather
                                name="eye-off"
                                color="grey"
                                size={20}
                            />
                            :
                            <Feather
                                name="eye"
                                color="grey"
                                size={20}
                            />
                        }
                    </TouchableOpacity>

                </View>
                <View style={styles.button}>
                    <TouchableOpacity
                        style={[styles.signIn, {
                            borderColor: 'orange',
                            borderWidth: 1,
                            marginTop: 15,
                            color: 'orange'

                        }]}
                        onPress={() => halndeRegister(data.username, data.password)}
                    >
                        <Text style={[styles.textSign, {
                            color: 'orange'
                        }]}>Regestrieren</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => navigation.navigate('LoginScreen')}
                        style={[styles.signIn, {
                            borderColor: 'orange',
                            borderWidth: 1,
                            marginTop: 15
                        }]}
                    >
                        <Text style={[styles.textSign, {
                            color: 'orange'
                        }]}>Anmelden</Text>
                    </TouchableOpacity>
                </View>
            </Animatable.View>
        </View>
    )

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'orange',
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: 3,
        backgroundColor: '#fff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    button: {
        alignItems: 'center',
        marginTop: 50
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    }
});
export default RegisterScreen;