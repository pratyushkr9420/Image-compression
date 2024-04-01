import React from "react";
import { View, Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import ImageEditorScreen from "../screens/ImageEditorScreen";

export type RootStackParamList = {
    Home: undefined,
    ImageEditor: {imageUri : string}
}

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {
    return (
        <Stack.Navigator initialRouteName="Home" screenOptions={{
            headerShown:false
        }}>
            <Stack.Screen name="Home" component={HomeScreen}/>
            <Stack.Screen name="ImageEditor" component={ImageEditorScreen}/>
        </Stack.Navigator>
    )
}

export default AppNavigator;