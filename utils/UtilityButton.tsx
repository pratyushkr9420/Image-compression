import React, { FC } from "react";
import { Pressable, Text, View, StyleSheet } from "react-native";
import { Ionicons, AntDesign } from '@expo/vector-icons';

interface props {
    onPress?:() => void
}

const BackButton : FC <props>= ({ onPress }) : JSX.Element=> {
    return (
        <Pressable onPress={onPress}>
            <Ionicons name="arrow-back" size={40} color="#6C9ADE"/>
        </Pressable>
    )
}

const DownloadButton : FC <props> = ({ onPress }): JSX.Element => {
    return (
        <View style={styles.buttonContainer}>
            <Pressable onPress={onPress}>
                <AntDesign name="download" size={40} color="#6C9ADE"/>
            </Pressable>
            <Text style={styles.buttonLabel}>Download</Text>
        </View>
    )
}

const UtilityButtons : { back: FC<props>, download: FC<props>}= {
    back: BackButton,
    download: DownloadButton
}

export default UtilityButtons;

const styles = StyleSheet.create({
    buttonContainer: {
        alignItems:'center'
    },
    buttonLabel: {
        color: "#6C9ADE",
        fontWeight:'bold'
    }
})
