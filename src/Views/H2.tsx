import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, FlatList, TouchableOpacity, Text, StyleSheet, Modal, Button, TextInput } from 'react-native';
import { Animated, Easing } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { updateUser } from '../services/firebase';
import { create } from 'react-test-renderer';
import { setUser, updateProjects } from '../store';
import DeleteModal from '../Components/DeleteModal';
import ProjectButtons from '../Components/ProjectButtons';

//TODO: update redux
const HomeScreen = () => {

    const user = useSelector((state) => state.user.user);
    const { uid, projects, email, permissionCamera } = user;
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [userUpdate, setUserUpdate] = useState(false)
    const [modalVisible, setModalVisible] = useState(false);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [newProjectName, setNewProjectName] = useState('');
    const [selected, setSelected] = useState(null); // Step 1: Define the state variable
    const [shake, setShake] = useState(false)

    // useEffect(() => {
    //     if (selected && selected !== '') {
    //         setSelected('')
    //         navigation.navigate('ProjectScreen', { uid, projectName: selected });
    //     }
    // }, [selected]);


    const handleButtonPress = (projectName) => {
        setSelected(prevSelected => prevSelected === projectName ? null : projectName);
        console.log(`her eis the project ${projectName}`)
        //setSelected(project);
        // navigation.navigate('ProjectScreen', { uid, projectName });
    };
    const goToProject = (projectName) => {
        navigation.navigate('ProjectScreen', { uid, projectName });
    }
    const handleDelete = () => {
        //  setDeleteModalVisible(true);
        // Update Firestore with the new project name
        // setDeleteModalVisible(true);
        console.log(`here is the `)
        setShake(true);
    };
    const addButton = () => {
        return (
            <Button
                title="Add New Project"
                onPress={() => setModalVisible(true)}
            />
        );
    }
    const setAddModal = () => {
        setModalVisible(true)
    }
    const setDeleteModal = () => {
        console.log(`here is the deletemodal ${deleteModalVisible}`)
        setDeleteModalVisible(false)
    }
    const confirmDelete = async () => {
        console.log(`confirmDelete ${selected}`)
        // Update Firestore with the new project name
        await updateUser(uid, user, selected, 'delete')
        const updatedProjects = projects.filter(item => item !== selected);
        console.log(`here is the updated Project ${updatedProjects}`)
        await dispatch(setUser({
            uid,
            permissionCamera,
            email,
            projects: updatedProjects,
        }))
        setDeleteModalVisible(false);
    }
    const renderDeleteModal = () => {
        return (
            <DeleteModal
                confirmDelete={confirmDelete}
                setDeleteModal={setDeleteModal}
                deleteModalVisible={deleteModalVisible}
                setDeleteModalVisible={setModalVisible}
            />
        );
    };
    const createNewProject = async () => {
        console.log(`creating a new project`)
        if (newProjectName.trim() !== '') {
            try {
                // Update Firestore with the new project name
                await updateUser(uid, user, newProjectName, 'project')
                const updatedProjects = [...projects, newProjectName.trim()];
                await dispatch(setUser({
                    uid,
                    permissionCamera,
                    email,
                    projects: updatedProjects,
                }))
                setModalVisible(false);
                setUserUpdate(true);
                setNewProjectName('');
            } catch (error) {
                console.error('Error updating document: ', error);
            }
        }
    }
    const renderProjectButton = () => {
        console.log(`the shake value is correctl ${shake}`)
        if (projects.length === 0) {
            addButton();
        } else {
            return (
                <View style={styles.projectButtonsContainer}>
                    {shake ? <ProjectButtons
                        selected={selected}
                        projects={projects}
                        handleButtonPress={handleButtonPress} deleteSelect={true} /> :
                        <ProjectButtons
                            selected={selected}
                            projects={projects}
                            handleButtonPress={handleButtonPress}

                        />
                    }
                    {renderDeleteModal()}
                </View>
            );
        }
    };
    return (
        <View style={styles.container}>
            {renderProjectButton()}
            <View style={styles.bottomButtonsContainer}>
                <Button
                    style={styles.modalText}
                    title="New Project"
                    onPress={() => setAddModal(true)}
                    color="#ff0000" // Red button color
                />
                <Button
                    title="Delete"
                    onPress={handleDelete}
                    // disabled={!selected} 
                    color="#ff0000" // Red button color
                />
                <Button title="Go To project" onPress={() => goToProject(selected)} disabled={!selected} color="#ff0000" />
            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(false);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text>Add New Project</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={setNewProjectName}
                            value={newProjectName}
                            placeholder="Enter Project Name"
                        />
                        <Button title="Create New Project" onPress={() => createNewProject()} />
                        <Button title="Close Modal" onPress={() => setModalVisible(false)} />
                    </View>
                </View>
            </Modal>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffe0', // Light yellow background color
        paddingHorizontal: 20,
        paddingTop: 40,
    },
    button: {
        backgroundColor: '#ff0000', // Red button color
        padding: 20,
        margin: 10,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        fontSize: 18,
        color: '#ffff00', // Yellow button text color
        fontWeight: 'bold',
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
        color: '#ff0000', // Red font color
        fontWeight: 'bold',
    },
    input: {
        height: 40,
        width: '100%',
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        color: '#ff0000', // Red font color
    },
    projectButtonsContainer: {
        flex: 1,
    },
    bottomButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
    },
});
export default HomeScreen;
