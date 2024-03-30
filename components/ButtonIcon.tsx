import React, { FC } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Feather, AntDesign } from '@expo/vector-icons';

interface ButtonIconProps{
    borderColor: string,
    family: string
    size: number,
    name: string,
    iconColor: string,
    buttonText: string,
    onPress?: () => void
}

const ButtonIcon : FC <ButtonIconProps> = ({ borderColor, family, size, name, iconColor, buttonText, onPress }) : JSX.Element => {
    return (
        <View style={{...styles.buttonContainer,borderColor: borderColor}}>
        <TouchableOpacity style={styles.button} onPress={onPress}>
            {family === 'feather' && <Feather name={name as any} size={size} color={iconColor} />}
            {family === 'ant-design' && <AntDesign name={name as any} size={size} color={iconColor} />}
        </TouchableOpacity>
        <Text style={styles.btnLabel}>{buttonText}</Text>
    </View>
    )
}


export default ButtonIcon;

const  styles = StyleSheet.create({
    buttonContainer: {
        borderWidth:4,
        marginVertical: 20,
        padding:20
    },
    button:{
        width:120,
        height:120
    },
    btnLabel: {
        textAlign:'center'
    }
})

//#6C9ADE
