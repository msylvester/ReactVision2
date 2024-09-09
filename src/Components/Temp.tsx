import React, { useState, useEffect } from 'react';
import { View, FlatList, Image, StyleSheet, ActivityIndicator } from 'react-native';

const ImageCollection = ({ user, projectName }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [imageData, setImageData] = useState([]);

    useEffect(() => {
        fetchImageData();
    }, []);

    const fetchImageData = () => {
        // Assuming images are named in a specific pattern, like 'image1.png', 'image2.png', etc.
        const images = [
            require(`../img/image1.png`),
            require(`../img/image2.png`),
            // Add more images as needed
        ];
        setImageData(images);
        setIsLoading(false);
    };

    const renderItem = ({ item }) => {
        return (
            <Image style={styles.image} source={item} />
        );
    };

    return (
        <View style={styles.container}>
            {isLoading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <FlatList
                    data={imageData}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                    numColumns={2}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    image: {
        width: 150,
        height: 150,
        margin: 5,
    },
});

export default ImageCollection;
