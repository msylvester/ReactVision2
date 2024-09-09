import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  Button,
  Alert,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import Camera, { useCameraDevice } from 'react-native-vision-camera';
import { setUser, setImageRedux } from '../store';
import { useDispatch, useSelector } from 'react-redux';
import Temp from './Temp'
// Initialize Firebase (Make sure you have already done this)
// firebase.initializeApp(firebaseConfig);
//need a reference to the project as well as reference to the user


//TODO: change state value for image to a redux value

const AddImage = ({ selectedCamera, uid, projectName, onPressClose }) => {
  // const device = useCameraDevice('back')
  const [image, setImage] = useState(null);
  const imageTwo = useSelector((state) => state.user.image);
  const dispatch = useDispatch();
  //make an api call 
  //on update we want to populate 
  const reference = storage().ref();
  // Function to handle image upload
  // add on firebase     
  const resetImage = async () => {
    await dispatch(setImageRedux({
      uri: ''
    }));
    testUpload();
  }
  useEffect(() => {
    showImage()
  }, []);

  //TODO: when user opens image picker but does not select image, handle case
  const showImage = async () => {

    try {
      const options = {
        selectionLimit: 1,
        mediaType: 'photo',
        includeBase64: true
      };
      const permissionResult = await launchImageLibrary();
      const { assets } = permissionResult;

      console.log(`permission result: ${JSON.stringify(assets[0].type)}`)
      if (assets[0]?.type !== 'image/jpg') {
        Alert.alert('Permission to access camera roll is required!');
        return;
      }

      // const user = 'uid'; // Get user ID from Redux store or props
      // const projectName = 'projectName'; // Get project name from props or state

      // const imagePath = `${uid}/${projectName}/`; // Set the folder path

      // const imageRef = storage().ref(imagePath); // Reference to the user's project folder

      try {
        // Upload image to Firebase Storage
        const response = await fetch(assets[0]?.uri);
        //set image on the redux using dispatch
        await dispatch(setImageRedux({
          uri: assets[0]?.uri
        }))
        setImageRedux(assets[0]?.uri);
        // await imageRef.put(blob);
      } catch (e) {
        console.log(`here is the error ${e}`)
      }

      // Get the download URL of the uploaded image
      // const downloadURL = await imageRef.getDownloadURL();

      // Set the image URL

    } catch (error) {
      console.error('Error uploading image:', error);
    }

  }
  const uploadImage = async () => {
    try {
      const options = {
        selectionLimit: 1,
        mediaType: 'photo',
        includeBase64: true
      };
      const permissionResult = await launchImageLibrary();
      const { assets } = permissionResult;

      console.log(`permission result: ${JSON.stringify(assets[0].type)}`)
      if (assets[0]?.type !== 'image/jpg') {
        Alert.alert('Permission to access camera roll is required!');
        return;
      }

      const user = 'uid'; // Get user ID from Redux store or props
      const projectName = 'projectName'; // Get project name from props or state
      const imagePath = `${uid}/${projectName}/`; // Set the folder path
      const imageRef = storage().ref(imagePath); // Reference to the user's project folder

      try {
        // Upload image to Firebase Storage
        const response = await fetch(assets[0]?.uri);
        const blob = await response.blob();
        await imageRef.put(blob);
      } catch (e) {
        console.log(`here is the error ${e}`)
      }

      // Get the download URL of the uploaded image
      const downloadURL = await imageRef.getDownloadURL();

      // Set the image URL
      setImage(downloadURL);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };


  // const uploadImage = async () => {
  //   try {
  //     const options = {
  //       selectionLimit: 1,
  //       mediaType: 'photo',
  //       includeBase64: true
  //     };
  //     const permissionResult = await launchImageLibrary();
  //     const { assets } = permissionResult;

  //     console.log(`permission result: ${JSON.stringify(assets[0].type)}`)
  //     if (assets[0]?.type !== 'image/jpg') {
  //       Alert.alert('Permission to access camera roll is required!');
  //       return;
  //     }
  //     try {
  //       // Upload image to Firebase Storage
  //       const response = await fetch(assets[0].uri);
  //       const blob = await response.blob();;
  //       await reference.put(blob);
  //     } catch (e) {
  //       console.log(`here is the error ${e}`)
  //     }
  //     // Get the download URL of the uploaded image
  //     const downloadURL = await reference.getDownloadURL();

  //     // Set the image URL
  //     setImage(downloadURL);
  //   } catch (error) {
  //     console.error('Error uploading image:', error);
  //   }
  // };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {imageTwo.uri ? (
        <Image source={{ uri: imageTwo.uri }} style={{ width: 200, height: 200 }} />
      ) : (
        <Text>No image selected</Text>
      )}
      {imageTwo.uri !== '' && <Button title="Choose Different Image" onPress={resetImage} />}
      {imageTwo.uri !== '' && <Button title="Upload Image" onPress={uploadImage} />}

      <Button title="Close" onPress={onPressClose} />
    </View>
  );
}
export default AddImage;

