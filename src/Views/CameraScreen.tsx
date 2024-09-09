import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, FlatList, TouchableOpacity, Text, StyleSheet, Modal, Button, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { updateUser } from '../services/firebase';
import { create } from 'react-test-renderer';
import Camera, { getCameraPermissionStatus } from 'react-native-vision-camera'
import { setUser, updateProjects } from '../store'
import DeleteModal from '../Components/DeleteModal'
import LclCamera from '../Components/LclCamera';

const CameraScreen = () => {
    // const cameraPermission = getCameraPermissionStatus()
    return <LclCamera />
}
export default CameraScreen;