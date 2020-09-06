import React, {Component} from 'react';

import {createStackNavigator} from '@react-navigation/stack';

import SplashScreen from './SplashScreen.js';
import SignInScreen from './SignInScreen.js';
import SignUpScreen from './SignUpScreen.js';

const RootStack = createStackNavigator();

const RootStackScreen = ({navigation}) => (
  <RootStack.Navigator headerMode="none">
    <RootStack.Screen name="Splash" component={SplashScreen} />
    <RootStack.Screen name="SignIn" component={SignInScreen} />
    <RootStack.Screen name="SignUp" component={SignUpScreen} />
  </RootStack.Navigator>
);
export default RootStackScreen;
