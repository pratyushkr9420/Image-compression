import 'react-native-gesture-handler';
import React, { FC } from 'react';
import { StyleSheet, Text, View, useColorScheme } from 'react-native';
import { NavigationContainer, DarkTheme, DefaultTheme, Theme } from '@react-navigation/native';
import AppNavigator from './navigation/AppNavigator';


const currentTheme : Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    card: '#e1e4e8'
  }
}



const App : FC = () : JSX.Element | null=> {
  return  (
    <NavigationContainer theme={currentTheme}>
      <AppNavigator/>
    </NavigationContainer>
  )
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
