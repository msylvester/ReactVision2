import React, { useState, useEffect } from 'react';
import { StyleSheet, ActivityIndicator, View } from 'react-native';
import auth, { getAuth } from '@react-native-firebase/auth';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './AppNavigator';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';
import { Camera } from 'react-native-vision-camera';
import { createStackNavigator } from '@react-navigation/stack';
import { setUser } from './store';
import { getUser, createUser } from './services/firebase'


const Stack = createStackNavigator();
function App() {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setLocalUser] = useState();
  const [initialRoute, setInitialRoute] = useState('SignUpScreen');
  const permissionCamera = Camera.getCameraPermissionStatus();
  const dispatch = useDispatch();



  /**
   * onAuthStateChanged: Listener to get Login Details 
   */
  const onAuthStateChanged = async () => {
    try {
      console.log(`here we go`)
      //user is logged in so lets get the value from the db
      console.log(`here is the current user ${getAuth().currentUser}`)
      const { uid, email } = getAuth().currentUser
      console.log(`here is the info about hte current user ${uid} and email: ${email}`)

      //now lets see if a DB entry exists for the user 
      const u = await getUser(uid)
      //if u doesnt exist then create one
      console.log(`here is u ${u}`)
      if (!u) {
        //create user 
        const newUser = await createUser({ uid, email })
        console.log(`here is new User ${JSON.stringify(newUser)}`)
        await dispatch(setUser({
          uid,
          permissionCamera: false,
          email,
          projects: newUser.getProjects()
        }));
        setInitialRoute('HomeScreen')
      } else {
        const { projects } = u;
        //setLocalUser({ uid, email });
        console.log(`here is the u ${JSON.stringify(u)}`)
        await dispatch(setUser({
          uid,
          permissionCamera,
          email,
          projects
        }));
        setInitialRoute('HomeScreen')

        console.log(`here is u ${JSON.stringify(u)}`)
      }
    } catch (e) {
      setInitialRoute('SignUpScreen')
      console.log(`here is teh e ${e}`)
    }
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);


  if (initializing) return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <ActivityIndicator color={'blue'} size="large" />
    </View>
  );

  // if (!user) {
  //   return (<NavigationContainer>
  //     <GestureHandlerRootView style={styles.root}>
  //       <AppNavigator initialRouteName={'SignUpScreen'} />
  //     </GestureHandlerRootView>
  //   </NavigationContainer>)
  // }

  return (

    <NavigationContainer>
      <GestureHandlerRootView style={styles.root}>
        <AppNavigator initialRouteName={initialRoute} />
      </GestureHandlerRootView>
    </NavigationContainer>

  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
})
export default App;