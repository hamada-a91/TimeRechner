
import React, { Component } from 'react';
import { StyleSheet, View, Text, Button, TouchableOpacity } from 'react-native';


class BreadScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {
            counter: 0
        }
        this.countUp = this.countUp.bind(this);

    }
    countUp() {
        this.setState({ counter: this.state.counter + 1 })
    }
    render() {
        return (
            <View style={styles.container}>
                <Text>Break SCreen</Text>
                <TouchableOpacity style={styles.button} onPress={() => this.countUp}
                >
                    <Text style={{
                        color: "#ffe6cc", textShadowColor: 'rgba(0, 0, 0, 1)',
                        textShadowOffset: { width: -1, height: 1 }, textShadowRadius: 10
                        , fontWeight: "bold", fontSize: 22
                    }} >count</Text>

                </TouchableOpacity>

                <Text>{this.state.counter}</Text>
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
});

export default BreadScreen;