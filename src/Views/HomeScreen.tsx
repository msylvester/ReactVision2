import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, FlatList, TouchableOpacity, Image, Modal, Button, TextInput, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { updateUser } from '../services/firebase';
import { setUser } from '../store';
import DeleteModal from '../Components/DeleteModal';
import imageMap from '../constants'; // Adjust the path as necessary
import homeScreenStyles from '../styles/homeScreenStyles'; // Adjust the path as necessary

const HomeScreen = () => {
    const user = useSelector((state) => state.user.user);
    const { uid, projects, email, permissionCamera } = user;
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(false);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [newProjectName, setNewProjectName] = useState('');
    const [selected, setSelected] = useState(null);

    const handleButtonPress = (projectName) => {
        setSelected(prevSelected => prevSelected === projectName ? null : projectName);
    };

    const goToProject = (projectName) => {
        navigation.navigate('ProjectScreen', { uid, projectName });
    };

    const handleDelete = (projectName) => {
        setSelected(projectName);
        setDeleteModalVisible(true);
    };

    const confirmDelete = async () => {
        await updateUser(uid, user, selected, 'delete');
        const updatedProjects = projects.filter(item => item !== selected);
        await dispatch(setUser({
            uid,
            permissionCamera,
            email,
            projects: updatedProjects,
        }));
        setDeleteModalVisible(false);
        setSelected(null);
    };

    const createNewProject = async () => {
        if (newProjectName.trim() !== '') {
            try {
                await updateUser(uid, user, newProjectName, 'project');
                const updatedProjects = [...projects, newProjectName.trim()];
                await dispatch(setUser({
                    uid,
                    permissionCamera,
                    email,
                    projects: updatedProjects,
                }));
                setModalVisible(false);
                setNewProjectName('');
            } catch (error) {
                console.error('Error updating document: ', error);
            }
        }
    };

    const renderDeleteModal = () => {
        return (
            <DeleteModal
                confirmDelete={confirmDelete}
                setDeleteModal={setDeleteModalVisible}
                deleteModalVisible={deleteModalVisible}
            />
        );
    };

    const renderProjectButton = () => {
        return (
            <View style={homeScreenStyles.projectButtonsContainer}>
                <FlatList
                    data={projects}
                    renderItem={({ item }) => (
                        <View style={homeScreenStyles.buttonContainer}>
                            <TouchableOpacity
                                style={[
                                    homeScreenStyles.button,
                                    selected === item && homeScreenStyles.selectedButton
                                ]}
                                onPress={() => handleButtonPress(item)}
                            >
                                <View style={homeScreenStyles.imageContainer}>
                                    <Image source={imageMap.folder_img_two} style={homeScreenStyles.projectImage} resizeMode="contain" />
                                    {selected === item && (
                                        <TouchableOpacity
                                            style={homeScreenStyles.closeButton}
                                            onPress={() => handleDelete(item)}
                                        >
                                            <Text style={homeScreenStyles.closeButtonText}>X</Text>
                                        </TouchableOpacity>
                                    )}
                                </View>
                                <Text style={homeScreenStyles.projectNameText}>{item}</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                    keyExtractor={(item) => item}
                    numColumns={3} // Display 3 buttons per row
                />
                {renderDeleteModal()}
            </View>
        );
    };

    return (
        <View style={homeScreenStyles.container}>
            {renderProjectButton()}
            <View style={homeScreenStyles.bottomButtonsContainer}>
                <TouchableOpacity style={homeScreenStyles.bottomButton} onPress={() => setModalVisible(true)}>
                    <Text style={homeScreenStyles.bottomButtonText}>New Project</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[homeScreenStyles.bottomButton, { backgroundColor: selected ? '#ff0000' : '#0033cc' }]} onPress={() => goToProject(selected)} disabled={!selected}>
                    <Text style={homeScreenStyles.bottomButtonText}>Go To Project</Text>
                </TouchableOpacity>
            </View>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(false);
                }}
            >
                <View style={homeScreenStyles.centeredView}>
                    <View style={homeScreenStyles.modalView}>
                        <Text>Add New Project</Text>
                        <TextInput
                            style={homeScreenStyles.input}
                            onChangeText={setNewProjectName}
                            value={newProjectName}
                            placeholder="Enter project name"
                        />
                        <Button title="Add Project" onPress={createNewProject} />
                        <Button title="Cancel" onPress={() => setModalVisible(false)} />
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default HomeScreen;
