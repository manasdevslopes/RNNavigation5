import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import Icon from 'react-native-vector-icons/Ionicons';

const ExploreScreen = ({ navigation }) => {
    return (
        <View >
            <Icon.Button style={{ height: 80 }} name="ios-menu" size={25} backgroundColor='#d02860' onPress={() => navigation.openDrawer()} />

            <Text>Explore Screen</Text>
        </View>
    )
}

export default ExploreScreen

const styles = StyleSheet.create({})
