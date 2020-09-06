import React from 'react'
import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity } from 'react-native'

import * as Animatable from 'react-native-animatable';

import Icon from 'react-native-vector-icons/MaterialIcons';

import { useTheme } from '@react-navigation/native';


const SplashScreen = ({ navigation }) => {

    const { colors } = useTheme();

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Animatable.Image animation="bounceIn" source={require('../assets/arya_stark.jpg')} style={styles.logo} resizeMode='cover' />
            </View>
            <Animatable.View style={{ ...styles.footer, backgroundColor: colors.background }} animation="fadeInUpBig">
                <Text style={{ ...styles.title, color: colors.text }}>Stay connected with everyone!</Text>
                <Text style={styles.text}>Sign in with account</Text>
                <View style={styles.button}>
                    <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
                        <View style={styles.signIn}>
                            <Text style={styles.textSign}>Get Started</Text>
                            <Icon name="navigate-next" color="#fff" size={20} />
                        </View>
                    </TouchableOpacity>
                </View>
            </Animatable.View>
        </View>
    )
}

export default SplashScreen

const { height } = Dimensions.get('screen');
const height_logo = height * 0.28;

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#009387' },
    header: { flex: 2, justifyContent: 'center', alignItems: 'center' },
    footer: { flex: 1, backgroundColor: '#fff', borderTopLeftRadius: 30, borderTopRightRadius: 30, paddingVertical: 50, paddingHorizontal: 30 },
    logo: { width: height_logo, height: height_logo, borderRadius: height_logo / 2 },
    title: { color: '#05375a', fontSize: 30, fontWeight: 'bold' },
    text: { color: 'grey', marginTop: 5 },
    button: { alignItems: 'flex-end', marginTop: 30 },
    signIn: { width: 150, height: 40, justifyContent: 'center', alignItems: 'center', borderRadius: 50, flexDirection: 'row', backgroundColor: '#01ab9d' },
    textSign: { color: '#fff', fontWeight: 'bold' },
})