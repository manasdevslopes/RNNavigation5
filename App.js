/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component, useState, useEffect, useMemo } from 'react'
import {
  NavigationContainer,
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme
} from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {
  Provider as PaperProvider,
  DefaultTheme as PaperDefaultTheme,
  DarkTheme as PaperDarkTheme
} from 'react-native-paper';
import { Text, StyleSheet, View, Button, ActivityIndicator } from 'react-native'

import RootStackScreen from './screens/RootStackScreen.js';
import MainTabScreen from './screens/MainTabScreen.js';
import BookmarkScreen from './screens/BookmarksScreen.js';
import SettingScreen from './screens/SettingScreen.js';
import SupportScreen from './screens/SupportScreen.js';

import { DrawerContent } from './screens/DrawerContent.js';

import { AuthContext } from './components/context.js';

import AsyncStorage from '@react-native-community/async-storage';

const Drawer = createDrawerNavigator();


const DrawerNavigatorScreens = ({ navigator }) => (
  <Drawer.Navigator initialRouteName="Home" drawerContent={props => <DrawerContent {...props} name="Arya Stark" username="@aryastark" />} >
    <Drawer.Screen name="HomeDrawer" component={MainTabScreen} />
    <Drawer.Screen name="Bookmarks" component={BookmarkScreen} />
    <Drawer.Screen name="Settings" component={SettingScreen} />
    <Drawer.Screen name="Supports" component={SupportScreen} />
  </Drawer.Navigator>
)


const App = () => {
  // const [isLoading, setIsLoading] = useState(true);
  // const [userToken, setUserToken] = useState(null);

  const [isDarkTheme, setIsDarkTheme] = React.useState(false);


  const initialLoginState = {
    isLoading: true,
    userName: null,
    userToken: null
  };

  const CustomDefaultTheme = {
    ...NavigationDefaultTheme,
    ...PaperDefaultTheme,
    colors: {
      ...NavigationDefaultTheme.colors,
      ...PaperDefaultTheme.colors,
      background: '#fff',
      text: '#333333'
    }
  }
  const CustomDarkTheme = {
    ...NavigationDarkTheme,
    ...PaperDarkTheme,
    colors: {
      ...NavigationDarkTheme.colors,
      ...PaperDarkTheme.colors,
      background: '#333333',
      text: '#fff'
    }
  }
  const theme = isDarkTheme ? CustomDarkTheme : CustomDefaultTheme;

  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case 'RETRIEVE_TOKEN':
        return { ...prevState, userToken: action.token, isLoading: false };
      case 'LOGIN':
        return { ...prevState, userName: action.id, userToken: action.token, isLoading: false };
      case 'LOGOUT':
        return { ...prevState, userName: null, userToken: null, isLoading: false };
      case 'REGISTER':
        return { ...prevState, userName: action.id, userToken: action.token, isLoading: false };
    }
  }

  const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState);

  const authContext = useMemo(() => ({
    signIn: async (foundUser) => {
      // setUserToken("qwerty")
      // setIsLoading(false)
      const userToken = String(foundUser[0].userToken)
      const userName = foundUser[0].username
      try {
        await AsyncStorage.setItem("userToken", userToken);
      } catch (e) {
        console.log(e);
      }

      dispatch({ type: 'LOGIN', id: userName, token: userToken })
    },
    signOut: async () => {
      // setUserToken(null)
      // setIsLoading(false)
      try {
        await AsyncStorage.clear();
      } catch (e) {
        console.log(e);
      }
      dispatch({ type: 'LOGOUT', })
    },
    signUp: () => {
      setUserToken("qwerty")
      setIsLoading(false)
    },
    signUp: () => {
      // setUserToken('fgkj');
      // setIsLoading(false);
    },
    toggleTheme: () => {
      setIsDarkTheme(isDarkTheme => !isDarkTheme);
    }
  }), [])

  useEffect(() => {
    setTimeout(async () => {
      //setIsLoading(false)
      let userToken;
      userToken = null
      try {
        userToken = await AsyncStorage.getItem("userToken");
      } catch (e) {
        console.log(e);
      }
      dispatch({ type: 'RETRIEVE_TOKEN', token: userToken })
    }, 1000)
  }, [])

  if (loginState.isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    )
  }
  return (
    <PaperProvider theme={theme}>
      <AuthContext.Provider value={authContext}>
        <NavigationContainer theme={theme}>
          {loginState.userToken !== null ?
            <DrawerNavigatorScreens />
            :
            <RootStackScreen />
          }
        </NavigationContainer>
      </AuthContext.Provider>
    </PaperProvider>
  )
}

export default App;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' }
})
