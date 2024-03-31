import React, { FC, useEffect, useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { RootStackParamList } from "../navigation/AppNavigator";
import { NavigationProp } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";

type RouteProps = StackScreenProps<RootStackParamList, 'ImageEditor'>

interface props {
    route: RouteProps['route']
}


const ImageEditorScreen : FC <props> = ({ route }) => {
    return (
        <View style={styles.container}>
            {route.params.imageUri && <Image source={{ uri: route.params.imageUri }} style={styles.image} />}
        </View>
    )
}

export default ImageEditorScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent:"center",
        alignItems:'center'
    },
    image: {
        width: 300,
        height: 300,
    }
})