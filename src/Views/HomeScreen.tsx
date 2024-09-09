import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, FlatList, TouchableOpacity, Image, Modal, Button, TextInput, StyleSheet, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { updateUser } from '../services/firebase';
import { setUser } from '../store';
import DeleteModal from '../Components/DeleteModal';
import imageMap from '../constants'; // Adjust the path as necessary
import homeScreenStyles from '../styles/homeScreenStyles';
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

    const handleDelete = () => {
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
            <View style={styles.projectButtonsContainer}>
                <FlatList
                    data={projects}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={[
                                styles.button,
                                selected === item && styles.selectedButton
                            ]}
                            onPress={() => handleButtonPress(item)}
                        >
                            <Image source={imageMap.folder_img_two} style={styles.projectImage} resizeMode="contain" />
                            <Text style={styles.projectNameText}>{item}</Text>
                        </TouchableOpacity>
                    )}
                    keyExtractor={(item) => item}
                    numColumns={3} // Display 3 buttons per row
                />
                {renderDeleteModal()}
            </View>
        );
    };
    // const renderProjectButton = () => {
    //     return (
    //         <View style={styles.projectButtonsContainer}>
    //             <FlatList
    //                 data={projects}
    //                 renderItem={({ item }) => (
    //                     <TouchableOpacity
    //                         style={[
    //                             styles.button,
    //                             selected === item && styles.selectedButton
    //                         ]}
    //                         onPress={() => handleButtonPress(item)}
    //                     >
    //                         <Image source={imageMap.folder_img} style={styles.projectImage} resizeMode="contain" />
    //                     </TouchableOpacity>
    //                 )}
    //                 keyExtractor={(item) => item}
    //                 numColumns={3} // Display 3 buttons per row
    //             />
    //             {renderDeleteModal()}
    //         </View>
    //     );
    // };

    return (
        <View style={styles.container}>
            {renderProjectButton()}
            {/* <View style={styles.bottomButtonsContainer}>
                <Button
                    style={styles.modalText}
                    title="New Project"
                    onPress={() => setModalVisible(true)}
                    color="#ff0000"
                />
                <Button
                    title="Delete"
                    onPress={handleDelete}
                    disabled={!selected}
                    color="#ff0000"
                />
                <Button title="Go To Project" onPress={() => goToProject(selected)} disabled={!selected} color="#ff0000" />
            </View> */}
            {/* <View style={styles.bottomButtonsContainer}>
                <TouchableOpacity style={styles.bottomButton} onPress={() => setModalVisible(true)}>
                    <Text style={styles.bottomButtonText}>New Project</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.bottomButton, { backgroundColor: selected ? '#ff0000' : '#ccc' }]} onPress={handleDelete} disabled={!selected}>
                    <Text style={styles.bottomButtonText}>Delete</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.bottomButton, { backgroundColor: selected ? '#ff0000' : '#ccc' }]} onPress={() => goToProject(selected)} disabled={!selected}>
                    <Text style={styles.bottomButtonText}>Go To Project</Text>
                </TouchableOpacity>
            </View> */}
            <View style={styles.bottomButtonsContainer}>
                <TouchableOpacity style={styles.bottomButton} onPress={() => setModalVisible(true)}>
                    <Text style={styles.bottomButtonText}>New Project</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.bottomButton, { backgroundColor: selected ? '#ff0000' : '#0033cc' }]} onPress={handleDelete} disabled={!selected}>
                    <Text style={styles.bottomButtonText}>Delete</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.bottomButton, { backgroundColor: selected ? '#ff0000' : '#0033cc' }]} onPress={() => goToProject(selected)} disabled={!selected}>
                    <Text style={styles.bottomButtonText}>Go To Project</Text>
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
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text>Add New Project</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={setNewProjectName}
                            value={newProjectName}
                            placeholder="Enter Project Name"
                        />
                        <Button title="Create New Project" onPress={createNewProject} />
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
        backgroundColor: '#0033cc', // Darker blue background color
        paddingHorizontal: 10,
        paddingTop: 20,
    },
    button: {
        width: 100, // Set the width of the button container
        height: 100, // Set the height of the button container to be the same as width
        borderRadius: 10, // Optional: Rounded corners
        backgroundColor: '#f0f0f0',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10,
    },
    buttonText: {
        fontSize: 16,
        color: '#333',
    },
    projectImage: {
        width: '70%', // Make the image take up 70% of the button width
        height: '70%', // Make the image take up 70% of the button height
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
});

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#0033cc', // Darker blue background color
//         paddingHorizontal: 10,
//         paddingTop: 20,
//     },
//     button: {
//         width: 100, // Set the width of the button container
//         height: 100, // Set the height of the button container to be the same as width
//         borderRadius: 10, // Optional: Rounded corners
//         backgroundColor: '#f0f0f0',
//         alignItems: 'center',
//         justifyContent: 'center',
//         margin: 10,
//     },
//     buttonText: {
//         fontSize: 16,
//         color: '#333',
//     },
//     projectImage: {
//         width: '70%', // Make the image take up 70% of the button width
//         height: '70%', // Make the image take up 70% of the button height
//         resizeMode: 'contain',
//     },
//     selectedButton: {
//         backgroundColor: '#2ecc71',
//     },
//     centeredView: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         marginTop: 22,
//     },
//     modalView: {
//         margin: 20,
//         backgroundColor: 'white',
//         borderRadius: 20,
//         padding: 35,
//         alignItems: 'center',
//         shadowColor: '#000',
//         shadowOffset: {
//             width: 0,
//             height: 2,
//         },
//         shadowOpacity: 0.25,
//         shadowRadius: 4,
//         elevation: 5,
//     },
//     modalText: {
//         marginBottom: 15,
//         textAlign: 'center',
//         color: '#ff0000',
//         fontWeight: 'bold',
//     },
//     input: {
//         height: 40,
//         width: '100%',
//         marginBottom: 20,
//         borderWidth: 1,
//         borderColor: '#ccc',
//         padding: 10,
//         color: '#ff0000',
//     },
//     projectButtonsContainer: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     bottomButtonsContainer: {
//         flexDirection: 'row',
//         justifyContent: 'space-around',
//         marginTop: 20,
//     },
//     bottomButton: {
//         width: 80, // Square width for the button container
//         height: 80, // Square height for the button container
//         borderRadius: 10, // Optional: Rounded corners
//         backgroundColor: '#0033cc', // Matching the blue background
//         justifyContent: 'center',
//         alignItems: 'center',
//         margin: 5,
//         borderWidth: 2, // Set the border width
//         borderColor: '#ffffff', // Set the border color to white
//     },
//     bottomButtonText: {
//         color: '#ffffff', // Text color to contrast with the blue background
//         fontSize: 14,
//     },
//     projectNameText: {
//         marginTop: 5,
//         fontSize: 14,
//         color: '#333',
//         textAlign: 'center',
//     },
// });

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#0033cc', // Darker blue background color
//         paddingHorizontal: 10,
//         paddingTop: 20,
//     },
//     button: {
//         width: 100, // Set the width of the button container
//         height: 100, // Set the height of the button container to be the same as width
//         borderRadius: 10, // Optional: Rounded corners
//         backgroundColor: '#f0f0f0',
//         alignItems: 'center',
//         justifyContent: 'center',
//         margin: 10,
//     },
//     buttonText: {
//         fontSize: 16,
//         color: '#333',
//     },
//     projectImage: {
//         width: '70%', // Make the image take up 70% of the button width
//         height: '70%', // Make the image take up 70% of the button height
//         resizeMode: 'contain',
//     },
//     selectedButton: {
//         backgroundColor: '#2ecc71',
//     },
//     centeredView: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         marginTop: 22,
//     },
//     modalView: {
//         margin: 20,
//         backgroundColor: 'white',
//         borderRadius: 20,
//         padding: 35,
//         alignItems: 'center',
//         shadowColor: '#000',
//         shadowOffset: {
//             width: 0,
//             height: 2,
//         },
//         shadowOpacity: 0.25,
//         shadowRadius: 4,
//         elevation: 5,
//     },
//     modalText: {
//         marginBottom: 15,
//         textAlign: 'center',
//         color: '#ff0000',
//         fontWeight: 'bold',
//     },
//     input: {
//         height: 40,
//         width: '100%',
//         marginBottom: 20,
//         borderWidth: 1,
//         borderColor: '#ccc',
//         padding: 10,
//         color: '#ff0000',
//     },
//     projectButtonsContainer: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     bottomButtonsContainer: {
//         flexDirection: 'row',
//         justifyContent: 'space-around',
//         marginTop: 20,
//     },
//     bottomButton: {
//         width: 80, // Square width for the button container
//         height: 80, // Square height for the button container
//         borderRadius: 10, // Optional: Rounded corners
//         backgroundColor: '#f0f0f0',
//         justifyContent: 'center',
//         alignItems: 'center',
//         margin: 5,
//         borderWidth: 2, // Set the border width
//         borderColor: '#ffffff', // Set the border color to white
//     },
//     bottomButtonText: {
//         color: '#fff',
//         fontSize: 14,
//     },
//     projectNameText: {
//         marginTop: 5,
//         fontSize: 14,
//         color: '#333',
//         textAlign: 'center',
//     },
// });

export default HomeScreen;
