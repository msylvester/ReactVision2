import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import imageMap from '../constants'; // Import the imageMap from constants file

const LocalImages = ({ index, handleImageSelect, selectedImage, filename }) => {
    // console.log(`imagesData ${imagesData}`)
    return (
        <TouchableOpacity
            key={index}
            onPress={() => handleImageSelect(filename)}
            style={[
                styles.imageContainer,
                selectedImage === filename && styles.selectedImageContainer,
            ]}
        >
            <Image
                source={imageMap[filename]}

            />
        </TouchableOpacity>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollViewContent: {
        flexGrow: 1,
        paddingBottom: 60, // Adjust this value based on the button's height
    },
    imageGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center', // Center images horizontally
    },
    imageContainer: {
        margin: 5,
        borderWidth: 1,
        borderColor: 'transparent', // Initial border color
    },
    selectedImageContainer: {
        borderColor: 'blue', // Border color when image is selected
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 5,
    },
    button: {
        position: 'absolute',
        bottom: 20,
        alignSelf: 'center',
        backgroundColor: 'blue',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default LocalImages;
