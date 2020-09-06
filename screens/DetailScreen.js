import React, { Component } from 'react'
import { Text, StyleSheet, View, Button } from 'react-native'

const DetailScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text>Detail Screen</Text>
            <Button title="Go to Detail Screen again....." onPress={() => navigation.push('Detail')} />

            <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />

            <Button title="Go Back" onPress={() => navigation.goBack()} />

            {/* <Button title="Go to the first screen" onPress={() => navigation.popToTop()} /> */}

        </View>
    )
}
export default DetailScreen;

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center' }
})
