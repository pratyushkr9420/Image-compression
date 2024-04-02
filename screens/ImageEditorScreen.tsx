import React, { FC, useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, Modal, Button, Alert } from "react-native";
import { RootStackParamList } from "../navigation/AppNavigator";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import * as ImagePicker from 'expo-image-picker';
import UtilityButtons from "../utils/UtilityButton";
import EditorTools from "../components/EditorTools";
import * as FileSystem from 'expo-file-system';
import * as ImageManipulator from 'expo-image-manipulator';
import * as MediaLibrary from 'expo-media-library';

type RouteProps = StackScreenProps<RootStackParamList, 'ImageEditor'>;

interface props {
    route: RouteProps['route'],
    navigation: NavigationProp<RootStackParamList>
}


const ImageEditorScreen : FC <props> = ({ route, navigation }) => {
    const [selectedImage,setSelectedImage] = useState<string>('');
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [fileSize,setFileSize] = useState<number>(0);
    const [compressionValue, setCompressionValue] = useState<number>(0);

    async function requestPermissions() {
        const { status } = await MediaLibrary.requestPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Sorry, we need media library permissions to make this work!');
        }
      }

      
    const homeNav = () => {
        navigation.goBack();
    }

    useEffect(() => {
        getFileSize(route.params.imageUri)
        requestPermissions();
    },[])

    const manipulateImage = async (compressionValue: number) : Promise<void>=> {
        const processedImage = await ImageManipulator.manipulateAsync(
            selectedImage || route.params.imageUri,
            [{ resize: {height: 265, width: 206}}],
            {compress: compressionValue, format: ImageManipulator.SaveFormat.JPEG}
        )
        const asset = await MediaLibrary.createAssetAsync(processedImage.uri);
        await MediaLibrary.createAlbumAsync('Image-compression', asset, false);
        Alert.alert('File successfully saved to library')
        homeNav();
    }

    const getFileSize = async (uri : string) : Promise<void> => {
        try{
            const result = await FileSystem.getInfoAsync(uri);
            if(result.exists){
                const sizeInMb = result.size/1048576
                setFileSize(Number(sizeInMb.toPrecision(2)))
            }
        }
        catch(error){
            console.error("Error getting file info: ", error);
        }
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
                getFileSize(selectedImage || route.params.imageUri)
            }
        }

    };

    const getGalleryImage = async () : Promise<void>=> {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
        if (!result.canceled) {
            setSelectedImage(result.assets[0].uri)
            getFileSize(selectedImage || route.params.imageUri)
        }
      };
    return (
        <View style={{...styles.container,backgroundColor: '#e1e4e8'}}>
            <View style={styles.imageEditorHeader}>
                <UtilityButtons.back onPress={() => setModalVisible(true)}/>
                <UtilityButtons.download onPress={() => manipulateImage(compressionValue)}/>
            </View>
            <Image source={{ uri: selectedImage || route.params.imageUri }} style={styles.image} />
            <EditorTools
                captureImage={captureImage}
                getGalleryImage={getGalleryImage}
                imageSize={fileSize}
                compressionValue={compressionValue}
                setCompressionValue={setCompressionValue}
            />
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
            >
                <View style={styles.modalViewContainer}>
                    <View style={styles.modal}>
                        <View>
                            <Text style={styles.modalTitle}>Are you sure you want to go back</Text>
                        </View>
                        <View style={styles.modalButtonContainer}>
                            <Button
                                title="Yes"
                                color='black'
                                onPress={homeNav}
                            />
                            <Button
                                title="No"
                                color='black'
                                onPress={() => {setModalVisible(false)}}
                            />
                        </View>
                    </View>
                </View>
            </Modal>
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
    },
    modalViewContainer: {
        flex: 1,
        justifyContent:"center",
        alignItems:'center',
        backgroundColor: "black",
        borderRadius:5,
        opacity:0.9
    },
    modal: {
        backgroundColor: 'white',
        padding: 5,
        borderRadius:10,
        opacity:1.1
    },
    modalTitle: {
        color: '#3c81c9',
        fontWeight: 'bold',
        fontSize:20
    },
    modalButtonContainer: {
        flexDirection:'row',
        justifyContent:'space-around',
        marginVertical: 10
    }
})