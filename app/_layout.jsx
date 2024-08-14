import { SplashScreen, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {useFonts} from "expo-font";
import { useEffect } from 'react';
import { reduxStore } from '../store';
import { Provider } from 'react-redux';


export default function RootLayout() {

  return (
    <Provider store={reduxStore}>
      <Stack >
        <Stack.Screen name='index' options={{
          headerShown:false
        }}/>
        <Stack.Screen name='(tabs)' options={{
          headerShown:false
        }}/>
      </Stack>
    </Provider>
  );
}


