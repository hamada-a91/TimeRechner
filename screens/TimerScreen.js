
import React, { Component } from 'react';
import { StyleSheet, View, Text, AppState, ImageBackground, TouchableOpacity, Alert, ScrollView, FlatList, Dimensions } from 'react-native';
import moment from 'moment';
import AsyncStorage from '@react-native-community/async-storage'
import TimeView from '../components/TimeView';
import TimerButtons from '../components/TimerButtons';

const { width, height } = Dimensions.get('window');


export default class TimerScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {
            running: false,
            time1: null,
            running: false,
            time: null,
            timeBreak: null,
            currentTimeBreak: null,
            break: false,
            working: [],
            breaking: [],
            appState: AppState.currentState,
            timebackground: null,

        }
    }


    _storeDate(working) {
        AsyncStorage.setItem('WORKING11', JSON.stringify(working)).then(res => {
            console.log("success", res);
            this.setState({ time: null, currentTimeBreak: null, timeBreak: null, running: false, break: false })
        }
        );
        var time = new Date(this.state.time * 1000).toISOString().substr(11, 8);
        var timebreak = new Date(this.state.timeBreak * 1000).toISOString().substr(11, 8);
        return (

            Alert.alert(
                "Perfect",
                "your Job hours:" + time + "your Break hours:" + timebreak,
                [

                    {
                        text: "OK", onPress: () => this.props.navigation.navigate("MyWork")
                    }
                ],
                { cancelable: false }
            ))
    }
    _retrieveData = async () => {
        let value = await AsyncStorage.getItem('WORKING11');
        if (value !== null) {
            value = JSON.parse(value);
            this.setState({ working: value })
            console.log("success");
        }
    }
    timeNow() {
        var time = moment()
            .format('HH:mm:ss');
        return time
    }
    dateNow() {
        var date = moment()
            .format('DD/MM/YYYY ');
        return date
    }

    _handleAppStateChange = nextAppState => {
        if (
            this.state.appState.match(/inactive|background/) &&
            nextAppState === "active"
        ) {
            console.log("App has come to the foreground!");
            let timenow = moment();
            let diff = Math.round(timenow.diff(this.state.timebackground) / 1000);
            if (this.state.running) {
                let plus = this.state.time + diff;
                this.setState({ time: plus })
            }
            if (this.state.break) {
                let plus = this.state.currentTimeBreak + diff;
                this.setState({ currentTimeBreak: plus })

            }
        }
        if (
            this.state.appState.match(/inactive|active/) &&
            nextAppState === "background"

        ) {
            console.log("App has come to the background!");
            this.setState({ timebackground: moment() });
        }
        this.setState({ appState: nextAppState });
        console.log(this.state.appState)
    };

    componentDidMount() {
        this._retrieveData();
        AppState.addEventListener("change", this._handleAppStateChange);

    }
    componentWillUnmount() {
        AppState.removeEventListener("change", this._handleAppStateChange);
    }
    handlePlay = () => {
        this.setState({
            running: true,
        })
        this.timerId = setInterval(() => {
            this.setState({
                time: this.state.time + 1
            })
        }, 1000);


        if (this.state.break == true) {
            clearInterval(this.timerId2)
            let lastBreak = this.state.timeBreak;
            let time = lastBreak + this.state.currentTimeBreak
            let { breaking } = this.state;
            let breakTime = this.state.currentTimeBreak;
            let startTime = this.timeNow();
            let endTime = this.timeNow();
            if (breakTime) {
                breaking.unshift({ breakTime, startTime, endTime });
                this.setState({ breaking: breaking })
            }
            this.setState({ currentTimeBreak: null, timeBreak: time, break: false });
            clearInterval(this.timerId2)
        }

    }
    handleReset = () => {
        clearInterval(this.timerId)
        this.setState({
            running: false,
            time: 0,
            breaking: [],
            timebreak: null,
            currentTimeBreak: null

        })
    }
    handlePause = () => {
        clearInterval(this.timerId)
        this.setState({
            running: false
        })
        this.setState({ break: true, currentTimeBreak: 0 });
        this.timerId2 = setInterval(() => {
            this.setState({
                currentTimeBreak: this.state.currentTimeBreak + 1
            })
        }, 1000);
    }
    handleJob = () => {
        let { working } = this.state;
        let worktime = this.state.time;
        var breakTime = this.state.currentTimeBreak;
        if (this.state.timeBreak) {
            breakTime = this.state.timeBreak;
        }
        let breaking = this.state.breaking;
        let date = this.dateNow();
        let startTime = this.timeNow();
        let endTime = this.timeNow();
        if (worktime) {
            working.unshift({ worktime, breakTime, breaking, date, startTime, endTime });
            this.setState({ working: working })
            this._storeDate(working);
        }

    }
    endJob = () => {

        return (
            Alert.alert(
                "Achtung",
                "Sind Sie sicher,um die Arbeit zu enden",
                [
                    {
                        text: "Cancel",
                        onPress: () => console.log("Cancel Pressed"),
                        style: "cancel"
                    },
                    {
                        text: "OK", onPress: () => {
                            this.handleJob();

                            this.props.navigation.navigate("HomeScreen")

                        }
                    }
                ],
                { cancelable: false }
            )
        );
    }
    separator = () => {
        return (
            <View style={{ height: 4, width: '100%', backgroundColor: '#e5e5e5' }}></View>
        )
    }
    renderItem = (item, index) => {
        return (
            <TouchableOpacity style={styles.listWrapper} >
                <Text style={styles.rowB} >Pause {index + 1}:</Text>
                <Text style={styles.row} >{new Date(item.breakTime * 1000).toISOString().substr(11, 8)}</Text>
                <Text style={styles.row1} >von {item.startTime}</Text>
                <Text style={styles.row1} > _ {item.endTime}</Text>
            </TouchableOpacity>
        );
    }
    render() {
        return (
            <View style={styles.container}>
                <ImageBackground source={require("../assets/images/doegel2.jpg")} style={styles.image}>
                    <Text style={styles.header}>Meine Arbeit</Text>
                    <TimeView time={this.state.time} />
                    <TimerButtons play={this.handlePlay}
                        running={this.state.running}
                        reset={this.handleReset}
                        pause={this.handlePause}
                        color={"orange"} />
                    {this.state.break ? <Text style={styles.header}>Meine Pause</Text>
                        : null}
                    {this.state.break ?
                        <TimeView time={this.state.currentTimeBreak} /> : null}
                    {this.state.time ? <TouchableOpacity style={styles.buttonStyle} onPress={this.endJob}>
                        <Text style={styles.buttonText}>Arbeit fertig</Text>
                    </TouchableOpacity> : null}
                    {this.state.breaking ? <ScrollView style={{
                        height: 199, width: width - 35, borderRadius: 150,
                        shadowOpacity: 100,
                    }}>
                        <FlatList
                            data={this.state.breaking}
                            renderItem={({ item, index }) => this.renderItem(item, index)}
                            keyExtractor={(item) => item.startTime}
                            ItemSeparatorComponent={() => this.separator()} />

                    </ScrollView> : null

                    }
                </ImageBackground>

            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column'


    },
    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
        justifyContent: 'center',
        alignItems: 'center',
        opacity: 10,
    },
    header: {
        fontSize: 30,
        fontWeight: '700',
        color: '#ff6600',
        marginBottom: 10,
        padding: 5,
        textShadowColor: 'rgba(120, 30, 0, 0.75)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 10
    },
    buttonStyle: {
        alignItems: "center",
        backgroundColor: "#ff0080",
        padding: 10,
        height: '10%',
        flexDirection: "row",
        borderRadius: 20,
        shadowOpacity: 100,
        marginHorizontal: 10,
        marginTop: '10%'
    },
    buttonText: {
        color: "white",
        fontSize: 25,
        fontWeight: "700",
    },
    listWrapper: {
        marginTop: '5%',
        backgroundColor: '#ff6600',
        flexDirection: 'row',
        flexWrap: 'wrap',
        shadowOpacity: 5,
        borderRadius: 16,
    },
    row: {
        marginLeft: '1%',
        backgroundColor: '#ff6600',
        width: 80,
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
        borderRadius: 15,
        paddingVertical: 15,
    },
    rowB: {
        marginLeft: '1%',
        backgroundColor: '#ff6600',
        width: 80,
        fontSize: 16,
        fontWeight: 'bold',
        color: 'pink',
        borderRadius: 15,
        paddingVertical: 15,
    },
    row1: {
        backgroundColor: '#ff6600',
        width: 95,
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
        borderRadius: 15,
        paddingVertical: 15,
    },


});