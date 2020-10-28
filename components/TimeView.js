
import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';


class TimeView extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>{new Date(this.props.time * 1000).toISOString().substr(11, 8)}</Text>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#ff6600",
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        width: '65%',
        height: '17%',
        marginBottom: '5%'
    },
    text: {
        fontSize: 60,
        color: '#fff',
        fontWeight: 'bold',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 20
    }
});

export default TimeView;