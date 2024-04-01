import React, { FC} from "react";
import { View, Text, StyleSheet} from "react-native";
import EditingButton from "./EditingButton";

const EditorTools : FC  = () : JSX.Element => {
    return (
        <View style={styles.editingToolContainer}>
            <View style={styles.editingBtnContainer}>
                <EditingButton
                    family='feather'
                    title='Capture again'
                    name='camera'
                    size={40}
                    iconColor="white"
                />
                <EditingButton
                    family='ant-design'
                    title='Select again'
                    name='folderopen'
                    size={40}
                    iconColor="white"
                />
            </View>
        </View>
    )
}

export default EditorTools;

const styles = StyleSheet.create({
    editingToolContainer: {
        position: 'absolute',
        bottom:120
    },
    editingBtnContainer: {
        flexDirection:'row',
        width:"100%",
        padding: 20,
        justifyContent:'space-between',
    }
})