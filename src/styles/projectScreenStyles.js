import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const imageSize = (width - 48) / 3; // Adjust size to fit three images in a row
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    imageContainer: {
        position: 'relative',
        margin: 4,
    },
    image: {
        width: imageSize,
        height: imageSize,
        resizeMode: 'cover',
    },
    closeButton: {
        position: 'absolute',
        top: 8,
        right: 8,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        borderRadius: 15,
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    closeButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    row: {
        justifyContent: 'space-between',
    },
});

export default styles;
