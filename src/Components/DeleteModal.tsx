import React, { useState, useEffect, useCallback } from 'react';
import { View, Modal, Text, Button, Image, StyleSheet, ActivityIndicator } from 'react-native';
import TestProject from './TestProject';
import storage from '@react-native-firebase/storage';
import PictureCollection from './PictureCollection';
// //gs://leggomyeggo.appspot.com/svEpZHdospMrWQQN1XpyDp42nZ82/project_name/neProj.png

const DeleteModal = ({ setDeleteModal, confirmDelete, selected, deleteModalVisible }) => {
    return (<Modal
        animationType="slide"
        transparent={true}
        visible={deleteModalVisible}
        onRequestClose={() => deleteModalVisible(false)}
    >
        <View style={styles.centeredView}>
            <View style={styles.modalView}>
                <Text>Are you sure you want to delete: {selected}</Text>
                <Button title="Yes" onPress={() => confirmDelete()} />
                <Button title="Cancel" onPress={() => setDeleteModal()} />
            </View>
        </View>
    </Modal>)
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingTop: 40,
    },
    button: {
        backgroundColor: '#3498db',
        padding: 20,
        margin: 10,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        fontSize: 18,
        color: '#fff',
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
    modalButton: {
        backgroundColor: '#3498db',
        padding: 10,
        marginVertical: 5,
        borderRadius: 5,
    },
});
export default DeleteModal;