import React, { Component, useEffect, useContext, useState } from 'react';
import {
    View,
    Text,
    Button,
    TouchableOpacity,
    Dimensions,
    TextInput,
    Platform,
    StyleSheet,
    StatusBar,
    Alert,
    Image
} from 'react-native';

import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

import { AuthContext } from '../components/contex';
import Users from '../components/User';

const { width, height } = Dimensions.get('window')

const LoginScreen = ({ navigation }) => {

    const [data, setData] = React.useState({
        username: '',
        password: '',
        check_textInputChange: false,
        secureTextEntry: true,
        isValidUser: true,
        isValidPassword: true,

    });

    const textInputChange = (val) => {
        if (val.trim().length >= 4) {
            setData({
                ...data,
                username: val,
                check_textInputChange: true,
                isValidUser: true
            });
        } else {
            setData({
                ...data,
                username: val,
                check_textInputChange: false,
                isValidUser: false
            });
        }
    }
    const handlePasswordChange = (val) => {
        if (val.trim().length >= 8) {
            setData({
                ...data,
                password: val,
                isValidPassword: true
            });
        } else {
            setData({
                ...data,
                password: val,
                isValidPassword: false
            });
        }
    }
    const handleValidUser = (val) => {
        if (val.trim().length >= 4) {
            setData({
                ...data,
                isValidUser: true
            });
        } else {
            setData({
                ...data,
                isValidUser: false
            });
        }
    }

    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        });
    }
    const { signIn } = useContext(AuthContext);

    const loginHandle = (userName, password) => {
        if (data.username.length == 0 || data.password == 0) {
            Alert.alert('type Fehler', 'username oder Passwort ist leer', [
                { text: 'okay' }
            ]);
            return;
        }


        // const foundUser = Users.filter(item => {
        //     return userName == item.username && password == item.password;
        // });

        // if (foundUser.length == 0) {
        //     Alert.alert('nicht validiert', 'username oder Passwort ist falsch', [
        //         { text: 'okay' }
        //     ]);
        //     return;
        // }
        signIn(userName, password);
    }

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='orange' barStyle="light-content" />
            <View style={styles.header}>
                <Text style={styles.text_header}>Willkommen WD Rechner</Text>
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
                        onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
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
                {data.isValidUser ? null : <Animatable.View animation="fadeInLeft" duration={500}>
                    <Text style={styles.errorMsg}>username ist weniger als 4 Buchstaben </Text>
                </Animatable.View>}

                <Text style={[styles.text_footer, { marginTop: 20 }]}>Password</Text>
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
                        onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
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
                {data.isValidPassword ? null : <Animatable.View animation="fadeInLeft" duration={500}>
                    <Text style={styles.errorMsg}>password ist weniger als 6 Buchstaben </Text>
                </Animatable.View>}
                <View style={styles.button}>
                    <TouchableOpacity
                        style={[styles.signIn, {
                            borderColor: 'orange',
                            borderWidth: 1,
                            marginTop: 15,
                            color: 'orange'
                        }]}
                        onPress={() => { loginHandle(data.username, data.password) }}
                    >
                        <Text style={[styles.textSign, {
                            color: 'orange'
                        }]}>Sign In</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => navigation.navigate('RegisterScreen')}
                        style={[styles.signIn, {
                            borderColor: 'orange',
                            borderWidth: 1,
                            marginTop: 15
                        }]}
                    >
                        <Text style={[styles.textSign, {
                            color: 'orange'
                        }]}>Sign Up</Text>
                    </TouchableOpacity>
                    <Image style={styles.image} source={require("../assets/images/doegel.jpg")}   ></Image>

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
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
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
    },
    image: {
        width: '40%',
        resizeMode: 'stretch',
        height: '40%',
        marginBottom: '26%'

    },
});
export default LoginScreen;