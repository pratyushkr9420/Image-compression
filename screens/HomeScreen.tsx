import React, { FC, useState, useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Feather, AntDesign } from '@expo/vector-icons';
import ButtonIcon from "../components/ButtonIcon";
import * as ImagePicker from 'expo-image-picker';

interface props {
    
}

const HomeScreen : FC <props> = () : JSX.Element => {
    const [image,setImage] = useState<string| null>(null);
    const takeImage = async () : Promise<void>=> {
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
                setImage(result.assets[0].uri);
            }
        }

    };
    const pickImage = async () : Promise<void>=> {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
        console.log(result);
    
        if (!result.canceled) {
          setImage(result.assets[0].uri);
        }
      };
    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Choose your image</Text>
                <Text style={styles.secondaryTitle}>Select an image from your phone or capture one</Text>
            </View>
            <ButtonIcon
                borderColor='#6C9ADE'
                family='feather'
                size={120}
                name='camera'
                iconColor="#6C9ADE"
                buttonText='Capture'
                onPress={takeImage}
            />
            <ButtonIcon
                borderColor='#6C9ADE'
                family='ant-design'
                size={120}
                name='folderopen'
                iconColor="#6C9ADE"
                buttonText='Select'
                onPress={pickImage}
            />
            {image && <Image source={{ uri: image }} style={styles.image} />}
        </View>
    )
}

export default HomeScreen;

const  styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent:"center",
        alignItems:'center'
    },
    titleContainer: {
        position:'absolute',
        top:70
    },
    title: {
        fontWeight:"800",
        fontSize:30,
        textAlign:'center'
    },
    secondaryTitle: {
        fontSize:18
    },
    image: {
        width: 200,
        height: 200,
    }
})
