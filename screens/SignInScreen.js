import React from 'react'
import { StyleSheet, Text, View, Platform, Dimensions, Image, TouchableOpacity, TextInput, StatusBar, Alert } from 'react-native'

import * as Animatable from 'react-native-animatable';

import Icon from 'react-native-vector-icons/Feather';
import Icon1 from 'react-native-vector-icons/FontAwesome';

import Users from '../model/users.js';

import { AuthContext } from '../components/context.js';

import { useTheme } from 'react-native-paper';


const SignInScreen = ({ navigation }) => {

    const { colors } = useTheme();

    const [data, setData] = React.useState({
        email: '',
        password: '',
        check_textInputChange: false,
        secureTextEntry: true,
        isValidUser: true,
        isValidPassword: true
    })

    const { signIn } = React.useContext(AuthContext);

    textInputChange = (val) => {
        if (val.trim().length >= 4) {
            setData({
                ...data, email: val, check_textInputChange: true, isValidUser: true
            })
        } else {
            setData({
                ...data, email: val, check_textInputChange: false, isValidUser: false
            })
        }
    }
    handlePasswordChange = (val) => {
        if (val.trim().length >= 8) {
            setData({ ...data, password: val, isValidPassword: true })
        } else {
            setData({ ...data, password: val, isValidPassword: false })
        }
    }
    updateSecureTextEntry = () => {
        setData({
            ...data, secureTextEntry: !(data.secureTextEntry)
        })
    }

    loginHandle = (userName, password) => {
        const foundUser = Users.filter(item => {
            return (userName == item.username && password == item.password)
        })
        if (data.email.length == 0 || data.password.length == 0) {
            Alert.alert('Wrong Input!', 'Username or password field cannot be empty', [
                { text: 'Okay' }
            ]);
            return
        }
        if (foundUser.length == 0) {
            Alert.alert('Invalid User!', 'Username or password is incorrect', [
                { text: 'Okay' }
            ]);
            return
        }
        signIn(foundUser)
    }

    handleValidUser = (val) => {
        if (val.trim().length >= 4) {
            setData({ ...data, isValidUser: true })
        } else {
            setData({ ...data, isValidUser: false })
        }
    }
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="#009387" barStyle="light-content" />
            <View style={styles.header}>
                <Text style={styles.text_header}>Welcome!</Text>
            </View>
            <Animatable.View animation="fadeInUpBig" style={{ ...styles.footer, backgroundColor: colors.background }}>
                <Text style={{ ...styles.text_footer, color: colors.text }}>Email</Text>
                <View style={styles.action}>
                    <Icon1 name="user-o" color={colors.text} size={20} />
                    <TextInput
                        placeholder="Your Email"
                        placeholderTextColor="#666666"
                        style={{ ...styles.textInput, color: colors.text }}
                        autoCapitalize="none"
                        onChangeText={(val) => textInputChange(val)}
                        onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
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
                {data.isValidUser ? null :
                    <Animatable.View animation="fadeInLeft" duration={2000}>
                        <Text style={styles.errorMsg}>Username must be 4 characters long.</Text>
                    </Animatable.View>
                }

                <Text style={{ ...styles.text_footer, marginTop: 35, color: colors.text }}>Password</Text>
                <View style={styles.action}>
                    <Icon name="lock" color={colors.text} size={20} />
                    <TextInput
                        placeholder="Your Password"
                        secureTextEntry={data.secureTextEntry}
                        placeholderTextColor="#666666"
                        style={{ ...styles.textInput, color: colors.text }}
                        autoCapitalize="none"
                        onChangeText={(val) => handlePasswordChange(val)}
                    />
                    <TouchableOpacity onPress={() => updateSecureTextEntry()}>
                        <Icon
                            name={data.secureTextEntry ? "eye-off" : "eye"} color="grey" size={20}
                        />
                    </TouchableOpacity>
                </View>
                {data.isValidPassword ? null :
                    <Animatable.View animation="fadeInLeft" duration={2000}>
                        <Text style={styles.errorMsg}>Password must be 8 characters long.</Text>
                    </Animatable.View>
                }

                <TouchableOpacity>
                    <Text style={{ color: '#009387', marginTop: 15 }}>Forgot Password?</Text>
                </TouchableOpacity>
                <View style={styles.button}>
                    <TouchableOpacity style={{ ...styles.signIn, backgroundColor: '#08d4c4' }} onPress={() => loginHandle(data.email, data.password)}>
                        <View>
                            <Text style={{ ...styles.textSign, color: '#fff' }}>Sign In</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={{ ...styles.signIn, borderColor: '#009387', borderWidth: 1, marginTop: 15 }} onPress={() => navigation.navigate('SignUp')}>
                        <Text style={{ ...styles.textSign, color: '#009387' }}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </Animatable.View>
        </View>
    )
}

export default SignInScreen

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