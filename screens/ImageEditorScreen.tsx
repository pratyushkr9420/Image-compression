import React, { FC } from "react";
import { View, Text, StyleSheet, Image, ImageBackground} from "react-native";
import { RootStackParamList } from "../navigation/AppNavigator";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import UtilityButtons from "../utils/UtilityButton";
import EditorTools from "../components/EditorTools";

type RouteProps = StackScreenProps<RootStackParamList, 'ImageEditor'>;

interface props {
    route: RouteProps['route'],
    navigation: NavigationProp<RootStackParamList>
}


const ImageEditorScreen : FC <props> = ({ route, navigation }) => {
    const homeNav = () => {
        navigation.goBack();
    }
    return (
        <View style={{...styles.container,backgroundColor: '#e1e4e8'}}>
            <View style={styles.imageEditorHeader}>
                <UtilityButtons.back onPress={homeNav}/>
                <UtilityButtons.download/>
            </View>
            <Image source={{ uri: route.params.imageUri }} style={styles.image} />
            <EditorTools/>
        </View>
    )
}

export default ImageEditorScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent:"center",
        alignItems:'center',
    },
    imageEditorHeader: {
        position:'absolute',
        top:60,
        left:0,
        flexDirection:'row',
        justifyContent:'space-between',
        paddingHorizontal:30,
        width:'100%',
    },
    image: {
        width: 206,
        height: 265,
    }
})