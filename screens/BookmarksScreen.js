import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const BookmarksScreen = () => {
    return (
        <View style={styles.container}>
            <Text>Book Marks Screen</Text>
        </View>
    )
}

export default BookmarksScreen

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center' }
})