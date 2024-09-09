// firebaseService.test.js

import {addUserToFirestore} from './firebase';
import firestore from '@react-native-firebase/firestore';

jest.mock('@react-native-firebase', () => {
  const firestore = () => ({
    collection: jest.fn(() => ({
      add: jest.fn(() => Promise.resolve({id: 'generatedUserId'})),
    })),
  });

  return {
    firestore,
  };
});

describe('addUserToFirestore function', () => {
  it('should add a new user to Firestore', async () => {
    const user = {
      name: 'John Doe',
      email: 'john@example.com',
    };

    const userId = await addUserToFirestore(user);

    expect(userId).toBe('generatedUserId');
    expect(firebase.firestore().collection).toHaveBeenCalledWith('users');
    expect(firebase.firestore().collection('users').add).toHaveBeenCalledWith(
      user,
    );
  });

  it('should throw an error if adding user to Firestore fails', async () => {
    const error = new Error('Firestore error');
    firebase.firestore().collection().add.mockRejectedValueOnce(error);

    const user = {
      name: 'John Doe',
      email: 'john@example.com',
    };

    await expect(addUserToFirestore(user)).rejects.toThrow(error);
  });
});
