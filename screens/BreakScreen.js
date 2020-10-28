import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, Button, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';


const BreakScreen = props => {

    const [breaking, setBreaking] = useState(props.route.params.breaking);
    console.log("................");
    console.log(breaking);

    const renderPost = item => {


        return (

            <View style={styles.listWrapper} >
                <Text style={styles.row} >{new Date(item.breakTime * 1000).toISOString().substr(11, 8)}</Text>

                <Text style={styles.row1} >{item.startTime}</Text>
                <Text style={styles.row2} >{item.endTime}</Text>


            </View>







        );


    }
    return (
        < View >
            <View style={styles.header}>
                <TouchableOpacity disable style={{ marginLeft: "-30%" }} onPress={() => props.navigation.goBack()}>
                    <Ionicons name='md-arrow-back' size={24} color='#D8D9DB'></Ionicons>

                </TouchableOpacity>
                <Text style={styles.headerTitle}>My breaking</Text>
            </View>
            <View style={styles.listWrapper}>
                <Text style={styles.head} >breakTime</Text>
                <Text style={styles.head} >starTime</Text>
                <Text style={styles.head} >endTime</Text>

            </View>
            <FlatList
                data={breaking}
                renderItem={({ item }) => renderPost(item)}
                keyExtractor={item => item.startTime} />




        </View >
    );

}

const styles = StyleSheet.create({
    container: {
        marginTop: 40,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center'
    },
    listWrapper: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        borderBottomWidth: 1,
        borderBottomColor: '#994d00',
        borderBottomStartRadius: 7,
        borderBottomEndRadius: 7,
    },
    header: {
        justifyContent: 'space-around',
        flexDirection: "row",
        paddingTop: 30,
        paddingBottom: 16,
        backgroundColor: '#ff6600',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ebecf4',
        shadowColor: '#454d65',
        shadowOffset: { height: 5 },
        shadowRadius: 15,
        fontSize: 40,
        shadowOpacity: 0.2,
        zIndex: 10,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '500',
        color: '#fff',
        marginLeft: "-40%"
    },
    row: {
        backgroundColor: '#fff',
        flex: 1,
        width: 100,
        fontSize: 20,
        fontWeight: 'bold',
        color: '#47476b',
        paddingHorizontal: 2,
        paddingVertical: 15,
    },
    row1: {
        backgroundColor: '#fff',
        flex: 1,
        width: 100,
        fontSize: 20,
        fontWeight: 'bold',
        color: 'green',
        paddingHorizontal: 2,
        paddingVertical: 20,
    },
    row2: {
        backgroundColor: '#fff',
        flex: 1,
        width: 100,
        fontSize: 20,
        fontWeight: 'bold',
        color: '#e6005c',
        paddingHorizontal: 2,
        paddingVertical: 20,
    },
    head: {
        backgroundColor: '#ff8c1a',
        flex: 1,
        fontSize: 17,
        color: '#fff',
        fontWeight: '200',
        paddingHorizontal: 2,
        //  paddingVertical: 30,
        fontSize: 20
    }
});
export default BreakScreen;