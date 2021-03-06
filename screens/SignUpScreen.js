import React from 'react'
import { StyleSheet, Text, View, Platform, Dimensions, Image, TouchableOpacity, TextInput, StatusBar } from 'react-native'

import * as Animatable from 'react-native-animatable';

import Icon from 'react-native-vector-icons/Feather';
import Icon1 from 'react-native-vector-icons/FontAwesome';

const SignUpScreen = ({ navigation }) => {

    const [data, setData] = React.useState({
        email: '',
        password: '',
        confirmPass: '',
        check_textInputChange: false,
        secureTextEntry: true,
        confirm_secureTextEntry: true
    })

    textInputChange = (val) => {
        if (val.length !== 0) {
            setData({
                ...data, email: val, check_textInputChange: true
            })
        } else {
            setData({
                ...data, email: val, check_textInputChange: false
            })
        }
    }
    handlePasswordChange = (val) => {
        setData({
            ...data, password: val
        })
    }
    handleConfirmPasswordChange = (val) => {
        setData({
            ...data, confirmPass: val
        })
    }
    updateSecureTextEntry = () => {
        setData({
            ...data, secureTextEntry: !(data.secureTextEntry)
        })
    }
    updateConfirmSecureTextEntry = () => {
        setData({
            ...data, confirm_secureTextEntry: !(data.confirm_secureTextEntry)
        })
    }
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="#009387" barStyle="light-content" />
            <View style={styles.header}>
                <Text style={styles.text_header}>Register Now!</Text>
            </View>
            <Animatable.View animation="fadeInUpBig" style={styles.footer}>
                <Text style={styles.text_footer}>Email</Text>
                <View style={styles.action}>
                    <Icon1 name="user-o" color="#05375a" size={20} />
                    <TextInput
                        placeholder="Your Email"
                        placeholderTextColor="#666666"
                        style={styles.textInput}
                        autoCapitalize="none"
                        onChangeText={(val) => textInputChange(val)}
                    />
                    {data.check_textInputChange ?
                        <Animatable.View animation="bounceIn">
                            <Icon
                                name="check-circle" color="green" size={18}
                            />
                        </Animatable.View>
                        :
                        null
                    }
                </View>
                <Text style={{ ...styles.text_footer, marginTop: 35 }}>Password</Text>
                <View style={styles.action}>
                    <Icon name="lock" color="#05375a" size={20} />
                    <TextInput
                        placeholder="Your Password"
                        secureTextEntry={data.secureTextEntry}
                        placeholderTextColor="#666666"
                        style={styles.textInput}
                        autoCapitalize="none"
                        onChangeText={(val) => handlePasswordChange(val)}
                    />
                    <TouchableOpacity onPress={() => updateSecureTextEntry()}>
                        <Icon
                            name={data.secureTextEntry ? "eye-off" : "eye"} color="grey" size={20}
                        />
                    </TouchableOpacity>
                </View>
                <Text style={{ ...styles.text_footer, marginTop: 35 }}>Confirm Your Password</Text>
                <View style={styles.action}>
                    <Icon name="lock" color="#05375a" size={20} />
                    <TextInput
                        placeholder="Confirm Your Password"
                        secureTextEntry={data.confirm_secureTextEntry}
                        placeholderTextColor="#666666"
                        style={styles.textInput}
                        autoCapitalize="none"
                        onChangeText={(val) => handleConfirmPasswordChange(val)}
                    />
                    <TouchableOpacity onPress={() => updateConfirmSecureTextEntry()}>
                        <Icon
                            name={data.confirm_secureTextEntry ? "eye-off" : "eye"} color="grey" size={20}
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.button}>
                    <View style={{ ...styles.signIn, backgroundColor: '#08d4c4' }}>
                        <Text style={{ ...styles.textSign, color: '#fff' }}>Sign Up</Text>
                    </View>

                    <TouchableOpacity style={{ ...styles.signIn, borderColor: '#009387', borderWidth: 1, marginTop: 15 }} onPress={() => navigation.goBack()}>
                        <Text style={{ ...styles.textSign, color: '#009387' }}>Sign In</Text>
                    </TouchableOpacity>
                </View>
            </Animatable.View>
        </View>
    )
}

export default SignUpScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#009387'
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: 3,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
    button: {
        alignItems: 'center',
        marginTop: 50
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    }
});