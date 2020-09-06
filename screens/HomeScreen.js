import React, { Component } from 'react'
import { Text, StyleSheet, View, Button, StatusBar } from 'react-native'

import { useTheme } from '@react-navigation/native';

const HomeScreen = ({ navigation }) => {
    const { colors } = useTheme();
    const theme = useTheme()

    return (
        <View style={styles.container}>
            <StatusBar barStyle={theme.dark ? "light-content" : "dark-content"} />
            <Text style={{ color: colors.text }}>Home Screen</Text>
            <Button title="Go to Detail Screen" onPress={() => navigation.navigate('Detail')} />
        </View>
    )
}
export default HomeScreen;

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center' }
})
