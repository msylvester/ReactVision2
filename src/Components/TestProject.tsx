import React, { useEffect, useState } from 'react';
import { View, Image, Text } from 'react-native';
import storage from '@react-native-firebase/storage';

const TestProject = ({ imageData }) => {
    const [imageUrl, setImageUrl] = useState(null);
    console.log(`here the imageDAta ${imageData}`)

    useEffect(() => {
        // Reference to the image you want to retrieve
        // const imageRef = storage().ref('path/to/your/image.jpg');

        //gs://leggomyeggo.appspot.com/svEpZHdospMrWQQN1XpyDp42nZ82/project_name/neProj.png
        const imageRef = storage().ref(`svEpZHdospMrWQQN1XpyDp42nZ82/project_name/neProj.png`);
        // Get the download URL of the image
        imageRef.getDownloadURL()
            .then(url => {
                console.log(`here is the url ${url}`)
                // Set the image URL
                setImageUrl(url);
            })
            .catch(error => {
                // Handle any errors
                console.error(error);
            });
    }, []);

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            {imageData ? (
                <Image source={{ uri: imageUrl }} style={{ width: 200, height: 200 }} />
            ) : (
                <Text>Loading...</Text>
            )}
        </View>
    );
};

export default TestProject;
