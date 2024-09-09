import firestore from '@react-native-firebase/firestore';
import User from '../models/UserModel';
import storage from '@react-native-firebase/storage';

export const getProjects = async data => {
  console.log(`here is teh data ${data}`);
  try {
    const userDoc = await firestore().collection('projects').doc(data).get();
    return userDoc.data();
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
};

export const createUser = async userData => {
  const {uid, email} = userData;
  let user = new User(uid, email);
  console.log(`here is user ${user}`);
  //we need the user model
  try {
    const userRef = await firestore().collection('users').doc(uid).set(user);
    console.log(`here is the userRef ${JSON.stringify(user)}`);
    return user;
    // return userRef.id;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

export const getUser = async userId => {
  try {
    const userDoc = await firestore().collection('users').doc(userId).get();
    return userDoc.data();
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
};

// Function to delete an individual image from a project in Firebase Storage
export const deleteImageFromProject = async (uid, projectName, imageName) => {
  try {
    // Construct the path to the image in Firebase Storage
    const imagePath = `${uid}/${projectName}/${imageName}`;

    // Delete the image from Firebase Storage
    await storage().ref(imagePath).delete();

    console.log(
      `Image ${imageName} deleted successfully from project ${projectName}.`,
    );
  } catch (error) {
    console.error(
      `Error deleting image ${imageName} from project ${projectName}:`,
      error,
    );
    // Handle error here (e.g., display error message)
    throw error;
  }
};

export const deleteProject = async (uid, projectID) => {
  try {
    // Delete project document from Firestore
    console.log('here is the project ${projectID}');
    // const result = await firestore()
    //   .collection('users')
    //   .doc(uid)
    //   .update({
    //     projects: firestore.FieldValue.arrayUnion(change.trim()),
    //   });
    // Once deletion is successful, you can close the modal or perform any other actions

    // Optionally, you can also navigate back or perform any other necessary actions
  } catch (error) {
    console.error('Error deleting project:', error);
    // Handle error here (e.g., display error message)
  }
};
export const updateUser = async (userId, userData, change, changeType) => {
  try {
    console.log(
      `inside update User ${userId} and the data is ${userData} and the change type ${changeType}`,
    );
    if (changeType === 'project') {
      console.log('about to udpate');

      const result = await firestore()
        .collection('users')
        .doc(userId)
        .update({
          projects: firestore.FieldValue.arrayUnion(change.trim()),
        });
      console.log(`finished updating and the result is ${result}`);
      return;
    }
    if (changeType === 'delete') {
      try {
        const userRef = firestore().collection('users').doc(userId);
        const userDoc = await userRef.get();

        if (userDoc.exists) {
          const userData = userDoc.data();
          const updatedProjects = userData.projects.filter(
            project => project !== change,
          );

          await userRef.update({projects: updatedProjects});
          console.log('Project removed from Firestore successfully.');
        } else {
          console.error('User document not found.');
        }
      } catch (error) {
        console.error('Error removing project from Firestore:', error);
      }
      return;
    }

    console.log('User updated successfully!');
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};
