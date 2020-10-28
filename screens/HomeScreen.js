
import React, { Component } from 'react';
import { StyleSheet, View, Text, Button, Image, TouchableOpacity } from 'react-native';
import moment from 'moment';



export default class HomeScreen extends Component {

    timeNow() {
        var date = moment()
            .utcOffset('+01:00')
            .format(' HH:mm ');
        return date;
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title} >Working Timer</Text>
                <Image style={styles.image} source={require("../assets/images/doegel.jpg")}   ></Image>

                <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('TimerScreen',
                    {
                        timeStart: this.timeNow()
                    })}
                >
                    <Text style={{
                        color: "#ffe6cc", textShadowColor: 'rgba(0, 0, 0, 1)',
                        textShadowOffset: { width: -1, height: 1 }, textShadowRadius: 10
                        , fontWeight: "bold", fontSize: 22
                    }} >Start your Job</Text>

                </TouchableOpacity>

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
    title: {
        color: 'orange',
        fontSize: 50,
        fontWeight: '100',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: -1, height: 2 },
        textShadowRadius: 10
    },
    button: {
        backgroundColor: "#006bb3",
        borderRadius: 10,
        height: 60,
        width: 200,
        alignItems: "center",
        justifyContent: "center"
    },
});