// styles/homeScreenStyles.js
import { StyleSheet } from 'react-native';

const homeScreenStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0033cc', // Darker blue background color
        paddingHorizontal: 10,
        paddingTop: 20,
    },
    buttonContainer: {
        alignItems: 'center',
        margin: 10,
    },
    button: {
        width: 100, // Set the width of the button container
        height: 100, // Set the height of the button container to be the same as width
        borderRadius: 10, // Optional: Rounded corners
        backgroundColor: '#f0f0f0',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        fontSize: 16,
        color: '#333',
    },
    projectImage: {
        width: '100%', // Make the image take up 70% of the button width
        height: '100%', // Make the image take up 70% of the button height
        resizeMode: 'contain',
    },
    selectedButton: {
        backgroundColor: '#2ecc71',
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
        color: '#ff0000',
        fontWeight: 'bold',
    },
    input: {
        height: 40,
        width: '100%',
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        color: '#ff0000',
    },
    projectButtonsContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bottomButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
    },
    bottomButton: {
        width: 120, // Slightly larger width
        height: 50, // Height to be larger than the font size
        borderRadius: 10, // Optional: Rounded corners
        backgroundColor: '#0033cc', // Matching the blue background
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5,
        borderWidth: 2, // Set the border width
        borderColor: '#ffffff', // Set the border color to white
    },
    bottomButtonText: {
        color: '#ffffff', // Text color to contrast with the blue background
        fontSize: 16, // Adjusted font size to match button size
    },
    projectNameText: {
        marginTop: 5,
        fontSize: 14,
        color: '#333',
        textAlign: 'center',
    },
    imageContainer: {
        position: 'relative',
        width: '100%',
        height: '100%',
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
    }
});

export default homeScreenStyles;
