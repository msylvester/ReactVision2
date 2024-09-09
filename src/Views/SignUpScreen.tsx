
import { StyleSheet, Text, TextInput, View, Button } from 'react-native';
import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { Camera } from 'react-native-vision-camera';
import { setUser } from '../store';
import { createUser, getUser, updateUser } from '../services/firebase';
// import User from '../models/UserModel'

const SignUpScreen = () => {
    const user = useSelector((state) => state.user.user);
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);
    const [hasSignedUp, setHasSignedUp] = useState('')
    const navigation = useNavigation();

    console.log(`uid: ${user?.uid} permissionStatus: ${user.permissionCamera}`)

    //TODO: FIX SIGN UP TO ALLOW USERS IN FIRESTORE && FIREBASE AUTH TO COEXIST
    const handleSignUp = async () => {
        // TODO: Implement sign-up logic (e.g., with Firebase auth)
        const permissionCamera = await Camera.requestCameraPermission();

        auth()
            .createUserWithEmailAndPassword(email, password)
            .then((user) => {
                console.log('User account created & signed in!');
                //create user in firebase
                //we want to add  projects 
                setHasSignedUp('success')

            })
            .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                    console.log('That email address is already in use!');
                }

                if (error.code === 'auth/invalid-email') {
                    console.log('That email address is invalid!');
                }

                console.error(error);
                /*
                 ERROR  [Error: [auth/network-request-failed] A network error has occurred, please try again.]
                */
            });
        console.log('handleSignUp');
    };

    onClickTest = async () => {

        console.log(`hre inisde onclick test and the user is ${JSON.stringify(user)}`)
        try {
            if (user) {
                const { uid, email, permissionCamera } = user;

                await updateUser(uid, user);
                // await createUser(user);
            } else {
                const newUserId = await createUser(user);
                console.log('New user ID:', newUserId);
            }
            console.log('User data saved successfully!');
        } catch (error) {
            console.error('Error saving user data:', error);
        }

    }
    useEffect(() => {
        if (hasSignedUp === 'success') {
            navigation.navigate('HomeScreen');

        }
    }, [hasSignedUp, navigation]);



    return (
        <View style={styles.container}>
            <Text style={{ color: '#e93766', fontSize: 34 }}>Join Leggo My Eggo</Text>
            {errorMessage && (
                <Text style={{ color: 'red' }}>{errorMessage}</Text>
            )}
            <TextInput
                placeholder="Email"
                autoCapitalize="none"
                style={styles.textInput}
                onChangeText={setEmail}
                value={email}
            />
            <TextInput
                secureTextEntry
                placeholder="Password"
                autoCapitalize="none"
                style={styles.textInput}
                onChangeText={setPassword}
                value={password}
            />
            <Button
                title="Sign Up"
                color="#e93766"
                onPress={handleSignUp}
            />
            <View>
                <Button
                    title="Skip Login"
                    color="#e93766"
                    onPress={() => navigation.navigate('ProjectScreen')}
                />
            </View>
            <View>
                <Button
                    title="Test Dispatch"
                    color="#e93766"
                    onPress={() => onClickTest()}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 20,
    },
    textInput: {
        width: '100%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
});

export default SignUpScreen;
