
import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';


class TimerButtons extends Component {
    state = {};
    render() {

        if (this.props.running === true) {

            return (
                <View style={styles.container}>
                    <TouchableOpacity style={styles.buttonStyle} onPress={this.props.pause}>
                        <Text style={styles.buttonText}>Pause</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonStyle} onPress={this.props.reset}>
                        <Text style={styles.buttonText}>Reset</Text>
                    </TouchableOpacity>
                </View>

            );
        }
        else {
            return (
                <View style={styles.container}>
                    <TouchableOpacity style={styles.buttonStyle} onPress={this.props.play}>
                        <Text style={styles.buttonText}>starten</Text>
                    </TouchableOpacity>
                </View>
            )
        }

    }
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        flexDirection: "row",
        marginLeft: 20,
        justifyContent: 'space-between',
        marginBottom: 20,
        padding: 5

    },
    buttonStyle: {
        alignItems: "center",
        backgroundColor: "#ff9900",
        padding: 30,
        height: '10%',
        flexDirection: "row",
        borderRadius: 150,
        shadowOpacity: 100,
        marginHorizontal: 10
    },
    buttonText: {
        color: "#fff",
        fontSize: 25,
        fontWeight: "700",
    }
})


export default TimerButtons;