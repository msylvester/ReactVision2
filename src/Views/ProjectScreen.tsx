import React, { useState, useEffect } from 'react';
import { View, Button, StyleSheet, ActivityIndicator } from 'react-native'; // Import ActivityIndicator
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { getProjects } from '../services/firebase';
import { setProject } from '../store';
import LocalImages from '../Components/LocalImages';
import API_KEY from '../constants'
// const API_KEY = '31b9f8407f4148fb969d92283f45ecc7'
const ProjectScreen = (props) => {
    const {
        params: { uid, projectName },
    } = props.route;
    const project = useSelector((state) => state.user.project);
    const navigation = useNavigation();

    const [modalVisible, setModalVisible] = useState(false);
    const [projectImages, setProjectImages] = useState([]);
    const [loading, setLoading] = useState(false); // Add loading state
    const dispatch = useDispatch();

    useEffect(() => {
        // Fetch images for the project before component mounts
        fetchProjectImages();
    }, []);

    useEffect(() => {
        console.log(`the project ${project.blocks}`);
        setProjectImages(project.blocks);
    }, [project]);

    const fetchProjectImages = async () => {
        try {
            // Make a get request to firebase to get the images for a given project
            const response = await getProjects(projectName);
            console.log(`here is the response ${JSON.stringify(response)}`);
            if (response) {
                const blocksFromFetch = response.blocks;
                const updatedBlocks = [...project.blocks, ...blocksFromFetch]; // Using concat
                await dispatch(
                    setProject({
                        ...project,
                        blocks: updatedBlocks,
                    })
                );
            } else {
                console.error('Failed to fetch project images');
            }
        } catch (error) {
            console.error('Error fetching project images:', error);
        }
    };

    const handleNavigateToBlocks = () =>
        navigation.navigate('LeggoScreen', { uid, projectName });

    // Update handleAddImage function to include API call and loading state
    // const handleAddImage = async () => {
    //     setLoading(true); // Show the loading indicator
    //     try {
    //         // Simulate an API call to get the surf report
    //         const response = await fetch('https://api.example.com/surf-report', { // Replace with actual API endpoint
    //             method: 'GET',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 // 'Authorization': 'Bearer YOUR_API_KEY', // Include API key if required
    //             },
    //         });

    //         if (!response.ok) {
    //             throw new Error('Network response was not ok');
    //         }

    //         const data = await response.json();

    //         // Handle the response data as needed (e.g., set state or navigate to another screen)
    //         console.log('Surf report data:', data);

    //         // Navigate to SetScreen after successful API call
    //         navigation.navigate('SetScreen', { surfReport: data }); // Pass the surf report data to SetScreen
    //     } catch (error) {
    //         console.error('Error fetching surf report:', error);
    //     } finally {
    //         setLoading(false); // Hide the loading indicator
    //     }
    // };
    const handleAddImage = async () => {
        setLoading(true); // Show the loading indicator
        try {
            // Replace 'YOUR_API_KEY' with your actual API key
            const apiKey = API_KEY.API_KEY;
            const city = 'London'; // Replace with your desired city or make it dynamic
            console.log(`apiu key is ${JSON.stringify(API_KEY.API_KEY)}`)
            // Make the API call to OpenWeatherMap
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();

            // Handle the response data as needed
            console.log('Weather data:', data);

            // Navigate to SetScreen after successful API call
            navigation.navigate('SetsScreen', { weatherData: data }); // Pass the weather data to SetScreen
        } catch (error) {
            console.error('Error fetching weather data:', error);
        } finally {
            setLoading(false); // Hide the loading indicator
        }
    };

    return (
        <View style={styles.container}>
            {projectImages.length > 0 && <LocalImages imagesData={projectImages} />}
            <Button title="Select Block" onPress={handleNavigateToBlocks} />

            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" /> // Show loading indicator when loading
            ) : (
                <Button title="make some cool stuff" onPress={handleAddImage} />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
    },
});

export default ProjectScreen;
