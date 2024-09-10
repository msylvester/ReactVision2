import 'react-native-gesture-handler';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Screens
import PermissionsPage from './PermissionsPage';
import HomeScreen from './Views/HomeScreen';
import ProjectScreen from './Views/ProjectScreen';
import SignUpScreen from './Views/SignUpScreen';
import CameraScreen from './Views/CameraScreen';
// import LeggoScreen from './Views/SelectLeggo';
import SetsScreen from './Views/SetsScreen';
import LeggoScreen from './Views/SelectLeggo';
import LeggoDetailView from './Views/LeggoDetailView';
const Stack = createStackNavigator();

const AppNavigator = (props: { initialRouteName: any; }) => {

    const { initialRouteName } = props;
    console.log(`Here is the initial route name ${initialRouteName}`);

    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#0033cc', // Darker blue for navigation bar
                },
                headerTintColor: '#fff', // White color for header text
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
                statusBarStyle: 'dark', // Adjust this if you use a custom StatusBar
                animationTypeForReplace: 'push',
            }}
            initialRouteName={initialRouteName}
        >
            <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
            <Stack.Screen
                name="HomeScreen"
                component={HomeScreen}
                options={({ navigation }) => ({
                    headerTitle: 'Home',
                    headerLeft: null,
                })}
            />
            <Stack.Screen name="PermissionsPage" component={PermissionsPage} />
            <Stack.Screen name="ProjectScreen" component={ProjectScreen} />
            <Stack.Screen name="CameraScreen" component={CameraScreen} />
            <Stack.Screen name="LeggoScreen" component={LeggoScreen} />
            <Stack.Screen name="SetsScreen" component={SetsScreen} />
            <Stack.Screen name="LeggoDetailView" component={LeggoDetailView} options={{ title: 'Part Details' }} />
        </Stack.Navigator>
    );
};

export default AppNavigator;
