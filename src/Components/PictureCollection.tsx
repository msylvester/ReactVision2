import React from 'react';
import {
    View,
    Dimensions,
    Image,
    StyleSheet
} from 'react-native';

const PictureCollection = ({ imageUrls }) => {
    const screenWidth = Dimensions.get('window').width;
    const imageWidth = (screenWidth - 20) / 3 - 10; // Subtracting 20 for margins and dividing by 3 for 3 images per row

    const renderItem = (item, index) => (
        <Image source={{ uri: item }} key={index} style={[styles.image, { width: imageWidth }]} />
    );

    return (
        <View style={styles.container}>
            {imageUrls.map((item, index) => (renderItem(item, index)))}

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginTop: 20,
        paddingHorizontal: 5,
    },
    image: {
        height: 100,
        marginBottom: 10,
    },
});

export default PictureCollection;

// import React from 'react';
// import { View, Image, StyleSheet, Dimensions } from 'react-native';
// import Placeholder from 'react-native-placeholder';

// const PictureCollection = ({ imageUrls }) => {
//     // Calculate width for each image based on screen width
//     const screenWidth = Dimensions.get('window').width;
//     const imageWidth = (screenWidth - 20) / 3 - 10; // Subtracting 20 for margins and dividing by 3 for 3 images per row

//     return (
//         <View style={styles.container}>
//             {imageUrls.map((imageUrl, index) => (
//                 <Placeholder
//                     key={index}
//                     Animation={null}
//                     Left={() => (
//                         <Image
//                             source={{ uri: imageUrl }}
//                             style={[styles.image, { width: imageWidth }]}
//                         />
//                     )}
//                     PlaceholderContent={<Image source={require('../img/phone.png')} style={[styles.image, { width: imageWidth }]} />}
//                     style={[styles.imageContainer, { width: imageWidth }]}
//                     onReady={true}
//                 />
//             ))}
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         flexDirection: 'row',
//         flexWrap: 'wrap',
//         justifyContent: 'space-between',
//         marginTop: 20,
//         paddingHorizontal: 5,
//     },
//     imageContainer: {
//         height: 100,
//         marginBottom: 10,
//     },
//     image: {
//         flex: 1,
//         resizeMode: 'cover',
//     },
// });

// export default PictureCollection;
