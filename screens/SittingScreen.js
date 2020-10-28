
import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';


export default class Sitting extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>Sitting</Text>
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