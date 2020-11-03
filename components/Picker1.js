import React, { Component, useState, useEffect } from 'react';
import { StyleSheet, Picker, View, Text, FlatList, Button, TouchableOpacity, ScrollView, VirtualizedList } from 'react-native';
//import { Picker } from '@react-native-community/picker'


const Picker1 = props => {
    const currenMonth = new Date().getMonth().toString();

    const [selectedValue, setSelectedValue] = useState(currenMonth);

    useEffect(() => {
        props.month(selectedValue)

    }, [selectedValue]

    )
    return (
        <View>
            <Picker
                selectedValue={selectedValue}
                mode='dropdown'
                style={{ height: 23, marginTop: 15, width: 150, color: '#fff' }}
                onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
            >
                <Picker.Item label="all" value="0" />
                <Picker.Item label="Januer" value="01" />
                <Picker.Item label="Febreur" value='02' />
                <Picker.Item label="März" value="03" />
                <Picker.Item label="April" value='04' />
                <Picker.Item label="Mai" value="05" />
                <Picker.Item label="Juni" value='06' />
                <Picker.Item label="Juli" value="07" />
                <Picker.Item label="August" value='08' />
                <Picker.Item label="September" value="09" />
                <Picker.Item label="Oktober" value='10' />
                <Picker.Item label="November" value="11" />
                <Picker.Item label="December" value='12' />
            </Picker>
        </View>
    )

}
const styles = StyleSheet.create({

})
export default Picker1;