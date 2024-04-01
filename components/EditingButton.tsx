import React, { FC } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { AntDesign, Feather } from '@expo/vector-icons';
interface props {
    family: string,
    title: string,
    name: string,
    size: number,
    iconColor: string,
    onPress?:() => void
}

const EditingButton : FC <props>  = ({ family, title, name, size, iconColor, onPress }) => {
    return (
        <TouchableOpacity style={styles.btnContainer} onPress={onPress}>
            {family === 'feather' && <Feather name={name as any} size={size} color={iconColor} />}
            {family === 'ant-design' && <AntDesign name={name as any} size={size} color={iconColor} />}
            <Text style={styles.btnLabel}>{title}</Text>
        </TouchableOpacity>
    )
}

export default EditingButton;


const styles = StyleSheet.create({
    btnContainer: {
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        backgroundColor: '#6C9ADE',
        padding:10
    },
    btnLabel: {
        textAlign:'center',
        marginHorizontal: 5,
        fontWeight:'bold',
        color:'white'
    }
})
