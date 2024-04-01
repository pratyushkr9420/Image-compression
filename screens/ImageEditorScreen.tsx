import React, { FC, useState } from "react";
import { View, Text, StyleSheet, Image, ImageBackground} from "react-native";
import { RootStackParamList } from "../navigation/AppNavigator";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import * as ImagePicker from 'expo-image-picker';
import UtilityButtons from "../utils/UtilityButton";
import EditorTools from "../components/EditorTools";

type RouteProps = StackScreenProps<RootStackParamList, 'ImageEditor'>;

interface props {
    route: RouteProps['route'],
    navigation: NavigationProp<RootStackParamList>
}


const ImageEditorScreen : FC <props> = ({ route, navigation }) => {
    const [selectedImage,setSelectedImage] = useState<string>('');
    const homeNav = () => {
        navigation.goBack();
    }
    const captureImage = async () : Promise<void>=> {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
            alert('Sorry, we need camera permissions to make this work!');
        }
        if (status === 'granted'){
            let result = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });
            if (!result.canceled) {
                setSelectedImage(result.assets[0].uri)
            }
        }

    };
    const getGalleryImage = async () : Promise<void>=> {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
        if (!result.canceled) {
            setSelectedImage(result.assets[0].uri)
        }
      };
    return (
        <View style={{...styles.container,backgroundColor: '#e1e4e8'}}>
            <View style={styles.imageEditorHeader}>
                <UtilityButtons.back onPress={homeNav}/>
                <UtilityButtons.download/>
            </View>
            <Image source={{ uri: selectedImage || route.params.imageUri }} style={styles.image} />
            <EditorTools
                captureImage={captureImage}
                getGalleryImage={getGalleryImage}
            />
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
        position:'absolute',
        top:250
    }
})