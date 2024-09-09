import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import imageMap from '../constants'; // Import the imageMap from constants file

const LocalImages = ({ imagesData }) => {
    console.log(`local images data ${JSON.stringify(imagesData)}`)
    return (
        <View style={styles.container}>
            {imagesData.map((imageName, index) => (
                <Image
                    key={index}
                    style={styles.image}
                    source={imageMap[imageName]}
                />
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    image: {
        width: 100, // adjust the width as needed
        height: 100, // adjust the height as needed
        margin: 5,
    },
});

export default LocalImages;
