// src/components/StorageExample.tsx
import React from 'react';
import { View, Button, Image, StyleSheet, Alert } from 'react-native';
import { firebaseStorage } from '../firebaseConfig';
import { launchImageLibrary } from 'react-native-image-picker';

const StorageExample: React.FC = () => {
  const uploadImage = async () => {
    launchImageLibrary({ mediaType: 'photo' }, async (response) => {
      if (response.didCancel) {
        Alert.alert('User cancelled image picker');
      } else if (response.errorCode) {
        Alert.alert('ImagePicker Error: ', response.errorMessage);
      } else {
        const uri = response.assets?.[0].uri;
        if (uri) {
          const fileName = uri.substring(uri.lastIndexOf('/') + 1);
          const reference = firebaseStorage.ref(fileName);
          try {
            await reference.putFile(uri);
            Alert.alert('Upload Successful');
          } catch (error) {
            Alert.alert('Upload Error: ', error.message);
          }
        }
      }
    });
  };

  return (
    <View style={styles.container}>
      <Button title="Upload Image" onPress={uploadImage} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default StorageExample;
