
import React, { Component } from 'react';
import { StyleSheet, View, Text, Button, Image, TouchableOpacity, Dimensions } from 'react-native';
import moment from 'moment';
import * as Animatable from 'react-native-animatable';
const { width, height } = Dimensions.get('window')





export default class HomeScreen extends Component {

    timeNow() {
        var date = moment()
            .format(' HH:mm ');
        return date;
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title} >Working Timer</Text>
                <Image style={styles.image} source={require("../assets/images/doegel.jpg")}   ></Image>

                <Animatable.View
                    animation="fadeInUpBig"
                    style={styles.footer}>

                    <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('TimerScreen',
                        {
                            timeStart: this.timeNow()
                        })}
                    >
                        <Text style={{
                            color: "orange", textShadowColor: 'rgba(0, 0, 0, 1)',
                            textShadowOffset: { width: -1, height: 1 }, textShadowRadius: 1
                            , fontWeight: "bold", fontSize: 22
                        }} >Start deine Arbeit</Text>

                    </TouchableOpacity>
                </Animatable.View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        width: '50%',
        resizeMode: 'stretch',
        height: '30%',
        marginBottom: '26%'
    },
    footer: {
        flex: 2,
        width: width,
        backgroundColor: 'orange',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        paddingHorizontal: 20,
        paddingVertical: 30,
        alignItems: 'center',
        justifyContent: 'center'

    },
    title: {
        color: '#ff8c1a',
        marginTop: 30,
        fontSize: 50,
        fontWeight: '100',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: -1, height: 2 },
        textShadowRadius: 10
    },
    button: {
        backgroundColor: "#fff",
        borderRadius: 10,
        height: 60,
        width: 200,
        alignItems: "center",
        justifyContent: "center"
    },
});