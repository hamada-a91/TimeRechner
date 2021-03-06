import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, Button, TouchableOpacity, ScrollView, SafeAreaView, TextInput } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'

import Picker1 from '../components/Picker1';

// import * as BackgroundFetch from "expo-background-fetch";
// import * as TaskManager from "expo-task-manager";

// let setStateFn = (data) => {
//     console.log("State not yet initialized");
//     return (data)
// };

// function myTask() {
//     try {
//         // fetch data here...
//         var d = 1;
//         this.timerId = setInterval(() => {
//             d = d + 1;
//         }, 10);
//         const backendData = "Simulated fetch " + d;
//         this.timerId = setInterval(() => {
//             d = d + 1;
//         }, 1000);
//         console.log("myTask() ", backendData);
//         setStateFn(backendData);
//         return backendData
//             ? BackgroundFetch.Result.NewData
//             : BackgroundFetch.Result.NoData;
//     } catch (err) {
//         return BackgroundFetch.Result.Failed;
//     }
// }
// async function initBackgroundFetch(taskName,
//     taskFn,
//     interval = 60) {
//     try {
//         if (!TaskManager.isTaskRegisteredAsync(taskName)) {
//             TaskManager.defineTask(taskName, taskFn);
//         }
//         TaskManager.defineTask(taskName, taskFn);




//         const options = {
//             minimumInterval: interval // in seconds
//         };
//         await BackgroundFetch.registerTaskAsync(taskName, options);
//         initBackgroundFetch('myTaskName', myTask, 1);

//     } catch (err) {
//         console.log("registerTaskAsync() failed:", err);
//     }
// }
// initBackgroundFetch('myTaskName', myTask);

const currentYear1 = new Date().getFullYear().toString();
const currenMonth = new Date().getMonth().toString();


function MyWorkScreen({ route, navigation }) {
    const [working, setWorking] = useState();
    const [dataSource, setdataSource] = useState();
    const [res, setRes] = useState();
    const [month, setmonth] = useState(currenMonth);
    const [summ, setsumm] = useState(0);
    const [year, setyear] = useState(currentYear1);





    useEffect(() => {

        const unsubscribe = navigation.addListener('focus', () => {
            retrieveData();
        });

    }, []

    );

    useEffect(() => {

        filter()

    }, [month, year]

    );
    const filter = () => {
        console.log("filter aufrufen")

        console.log(month)
        let currentYear = new Date().getFullYear()
        if (working) {
            let event = working.filter(e => {
                if (month === "0") {
                    var dateStr = year;
                    return (e.date.indexOf(dateStr) !== -1)
                } else {
                    var dateStr = month + '/' + year;
                    //  console.log(dateStr)
                    return (e.date.indexOf(dateStr) !== -1)
                }
            });
            //console.log(event);
            setdataSource(event)

            if (event.length != 0) {
                setsumm(summing(event))
                // console.log(summing(event))


            } else {
                setsumm(0)
            }
        }
    }

    const retrieveData = async () => {
        let value = await AsyncStorage.getItem('WORKING11');
        if (value !== null) {
            value = JSON.parse(value);
            setWorking(value);
            setdataSource(value);
            filter();
            console.log("success");
            console.log(value)
            setRes(true)
            setsumm(summing(value))


            // console.log(this.state.working)

        }
    }
    const summing = (data) => {

        return data.map(item => item.worktime).reduce((prev, next) => prev + next);


    }
    const handleMonth = (month) => {

        setmonth(month)
    }

    const separator = () => {
        return (
            <View style={{ height: 4, width: '100%', backgroundColor: '#e5e5e5' }}></View>
        )
    }
    const textInputChange = (val) => {
        setyear(val)
    }

    const renderItem = item => {
        return (
            <TouchableOpacity onPress={() => {
                navigation.navigate("BreakScreen", { breaking: item.breaking })
            }} style={styles.listWrapper} >
                <Text style={styles.row} >{new Date(item.worktime * 1000).toISOString().substr(11, 8)}</Text>
                <Text style={styles.row} >{new Date(item.breakTime * 1000).toISOString().substr(11, 8)}</Text>
                <Text style={styles.row1} >{item.startTime}</Text>
                <Text style={styles.row2} >{item.endTime}</Text>
                <Text style={styles.row} >{item.date.slice(0, 5)}</Text>
            </TouchableOpacity>
        );
    }
    return (

        <View >
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Meine Arbeitsunde</Text>
                <View style={{ flexDirection: 'row' }}>
                    <TextInput
                        //   placehlder={currentYear1}
                        placeholder={currentYear1}
                        keyboardType="numeric"
                        style={styles.textInput}
                        onChangeText={(val) => textInputChange(val)}
                    />

                    <Picker1 month={handleMonth} />
                    <Text style={{ marginTop: 15, marginLeft: 10, color: '#fff', fontWeight: 'bold', fontSize: 15 }}>summe:
                      </Text>
                    <Text style={{ marginTop: 15, marginLeft: 10, color: 'yellow', fontWeight: 'bold', fontSize: 15 }}>
                        {(summ / 3600).toString().slice(0, 5)}</Text>
                    <Text style={{ marginTop: 18, marginLeft: 10, color: 'yellow', fontWeight: '200', fontSize: 12 }}>Stunden
                      </Text>
                </View>
            </View>
            <View style={styles.listWrapper}>
                <Text style={styles.head} >Arbeit</Text>
                <Text style={styles.head} >Pause</Text>
                <Text style={styles.head} >Anfang</Text>
                <Text style={styles.head} >Beendet</Text>
                <Text style={styles.head} >Datum</Text>
            </View>
            <FlatList
                nestedScrollEnabled
                data={dataSource}
                renderItem={({ item }) => renderItem(item)}
                keyExtractor={item => item.startTime}
                ItemSeparatorComponent={() => separator()} />


        </View>


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
    },
    header: {
        paddingTop: 30,
        paddingBottom: 16,
        backgroundColor: '#ff6600',
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
        color: '#ff6600',
        paddingHorizontal: 2,
        paddingVertical: 20,
    },
    row2: {
        backgroundColor: '#fff',
        flex: 1,
        width: 100,
        fontSize: 15,
        fontWeight: 'bold',
        color: '#ff6600',
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
    },
    textInput: {
        fontSize: 15,
        fontWeight: 'bold',
        marginTop: 10,
        marginRight: 10,
        width: 40,
    },
});
export default MyWorkScreen;
