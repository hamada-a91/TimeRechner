
import React, { Component, useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, Button, TouchableOpacity, ScrollView, VirtualizedList } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'
import moment from 'moment';
import { TouchableHighlight } from 'react-native-gesture-handler';




class MyWorkScreen extends Component {



    constructor(props) {
        super(props)
        this.state = {
            working: this.props.working
        }
    }
    onFocusFunction = () => {
        console.log("navigation")
    }

    retrieveData = async () => {
        let value = await AsyncStorage.getItem('WORKING10');
        if (value !== null) {
            value = JSON.parse(value);
            this.setState({ working: value });
            //this.state.working = value;
            console.log("success");
            // console.log(this.state.working)

        }
    }



    async componentDidMount() {


        this.retrieveData();
        //console.log(this.state.working[2].date)
    }
    componentWillUnmount() {
    }
    renderPost = item => {

        return (

            <TouchableOpacity onPress={() => this.props.navigation.navigate("BreakScreen", { breaking: item.breaking })} style={styles.listWrapper} >
                <Text style={styles.row} >{new Date(item.worktime * 1000).toISOString().substr(11, 8)}</Text>
                <Text style={styles.row} >{new Date(item.breakTime * 1000).toISOString().substr(11, 8)}</Text>
                <Text style={styles.row1} >{item.startTime}</Text>
                <Text style={styles.row2} >{item.endTime}</Text>

                <Text style={styles.row} >{item.date.slice(0, 5)}</Text>
            </TouchableOpacity>







        );


    }
    render() {
        console.log(this.state.working)
        return (
            <ScrollView >
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>My worklist</Text>
                </View>
                <View style={styles.listWrapper}>
                    <Text style={styles.head} >work hours</Text>
                    <Text style={styles.head} >break hours</Text>
                    <Text style={styles.head} >sart time</Text>
                    <Text style={styles.head} >end time</Text>

                    <Text style={styles.head} >date</Text>




                </View>


                <FlatList
                    data={this.state.working}
                    renderItem={({ item }) => this.renderPost(item)}
                    keyExtractor={item => item.startTime} />
            </ScrollView>
        );
    }
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
        borderBottomEndRadius: 7
    },
    header: {
        paddingTop: 30,
        paddingBottom: 16,
        backgroundColor: '#006bb3',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ebecf4',
        shadowColor: '#454d65',
        shadowOffset: { height: 5 },
        shadowRadius: 15,
        fontSize: 40,
        shadowOpacity: 0.2,
        zIndex: 10
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '500',
        color: '#fff'
    },
    row: {
        backgroundColor: '#fff',
        flex: 1,
        width: 100,
        fontSize: 15,
        fontWeight: 'bold',
        color: '#47476b',
        paddingHorizontal: 2,
        paddingVertical: 15,
    },
    row1: {
        backgroundColor: '#fff',
        flex: 1,
        width: 100,
        fontSize: 15,
        fontWeight: 'bold',
        color: 'green',
        paddingHorizontal: 2,
        paddingVertical: 20,
    },
    row2: {
        backgroundColor: '#fff',
        flex: 1,
        width: 100,
        fontSize: 15,
        fontWeight: 'bold',
        color: '#e6005c',
        paddingHorizontal: 2,
        paddingVertical: 20,
    },
    head: {
        backgroundColor: '#00bfff',
        flex: 1,
        fontSize: 17,
        color: '#fff',
        fontWeight: '200',
        paddingHorizontal: 2,
        //  paddingVertical: 30,
    }
});
export default MyWorkScreen;