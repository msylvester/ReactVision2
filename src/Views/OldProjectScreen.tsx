import React, { useState, useEffect } from 'react';
import { View, Text, Button, Modal, StyleSheet } from 'react-native'; // Import Modal component
import ImageCollection from '../Components/ImageCollection';
import TestProject from '../Components/TestProject';
import AddImage from '../Components/AddImage';
import { useNavigation } from '@react-navigation/native';
import DeleteModal from '../Components/DeleteModal';

//TODO: add touchable opacity to each image and an onclick method that opens a modal
//
const ProjectScreen = (props) => {
    console.log(`inside ${JSON.stringify(props)} the project screen`)
    const { params: { uid, projectName } } = props.route;
    const navigation = useNavigation();
    console.log(`the params equal ${JSON.stringify(uid)} and projectName ${projectName}`)

    // State to control the visibility of the modal
    const [modalVisible, setModalVisible] = useState(false);
    const [pickerVisible, setPickerVisible] = useState(false);
    const [selectedCamera, setSelectedCamera] = useState(false);


    //navigate to the camera screen if user selects Camera
    useEffect(() => {

        if (selectedCamera) {
            setSelectedCamera('')
            navigation.navigate('CameraScreen');
        }
    }, [selectedCamera]);

    //write a test function to navigate to block  page
    const handleNavigateToBlocks = () => {
        navigation.navigate('LeggoScreen', { uid, projectName });
    }

    // Function to handle adding an image
    const handleAddImage = () => {
        // Open the modal when the "Add Image" button is pressed
        setModalVisible(true);
    };

    // Function to handle selecting an image from camera
    const handleSelectFromCamera = () => {
        // Add logic here to open camera
        console.log('Selecting image from camera...');
        // Close the modal after selection if needed
        setSelectedCamera(!selectedCamera);
        setModalVisible(false);
        setPickerVisible(true);
    };

    // Function to handle selecting an image from image picker
    const handleSelectFromPicker = () => {
        // Add logic here to open image picker
        console.log('Selecting image from picker...');
        // Close the modal after selection if needed
        setModalVisible(false);
        setPickerVisible(true);
    };
    return (
        <View style={styles.container}>
            <ImageCollection user={uid} projectName={projectName} />
            {/* <TestProject /> */}
            {/* Button to add image */}
            {/* {!pickerVisible && <Button title="Select Block" onPress={handleAddImage} />} */}
            {!pickerVisible && <Button title="Select Block" onPress={handleNavigateToBlocks} />}
            {!pickerVisible && <Button title="make some cool stuff" onPress={handleAddImage} />}
            {/* Modal for selecting image source */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    // Close modal on back button press or outside touch
                    setModalVisible(false);
                }}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Button title="Select from Camera" onPress={handleSelectFromCamera} />
                        <Button title="Pick block from list" onPress={handleSelectFromPicker} />
                        <Button title="Close" onPress={() => setModalVisible(false)} />
                    </View>
                </View>
            </Modal>
            {pickerVisible && <AddImage
                selectedCamera={selectedCamera}
                uid={uid}
                projectName={projectName}
                onPressClose={() => setPickerVisible(false)} />}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
    },
});

export default ProjectScreen;
