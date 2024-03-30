import * as ImagePicker from 'expo-image-picker';
import React from 'react';

interface takeImageprop{
    setImage: React.Dispatch<React.SetStateAction<string>>
}

export const takeImage = async ({ setImage } : takeImageprop) : Promise<void>=> {
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
        // console.log(result);
        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    }

};