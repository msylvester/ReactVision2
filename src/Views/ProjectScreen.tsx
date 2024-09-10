import React, { useState, useEffect } from 'react';
import { View, Button, StyleSheet, ActivityIndicator, FlatList, Image, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { getProjects } from '../services/firebase';
import { setProject } from '../store';
import API_KEY from '../constants';

const { width } = Dimensions.get('window');
const imageSize = (width - 48) / 3; // Adjust size to fit three images in a row

const ProjectScreen = (props) => {
    const {
        params: { uid, projectName },
    } = props.route;

    const project = useSelector(state => state.user.project);
    const navigation = useNavigation();

    const [projectImages, setProjectImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        fetchProjectImages();
    }, []);

    useEffect(() => {
        const { blocks } = project;
        if (blocks && Array.isArray(blocks)) {
            const imageUrls = blocks.map(part => part.part_img_url).filter(url => url);
            setProjectImages(imageUrls);
        }
    }, [project]);

    const fetchProjectImages = async () => {
        setLoading(true);
        try {
            const response = await getProjects(projectName);
            if (response && response.blocks) {
                const blocksFromFetch = response.blocks;
                const updatedBlocks = [...project.blocks, ...blocksFromFetch];
                await dispatch(setProject({
                    ...project,
                    blocks: updatedBlocks,
                }));
            } else {
                console.error('Failed to fetch project images or blocks are undefined');
            }
        } catch (error) {
            console.error('Error fetching project images:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleNavigateToBlocks = () => {
        navigation.navigate('LeggoScreen', { uid, projectName });
    };

    const handleAddImage = async () => {
        setLoading(true);
        try {
            const apiKey = API_KEY.API_KEY;
            const city = 'London';
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            navigation.navigate('SetsScreen', { weatherData: data });
        } catch (error) {
            console.error('Error fetching weather data:', error);
        } finally {
            setLoading(false);
        }
    };

    const renderItem = ({ item }) => (
        item ? <Image source={{ uri: item }} style={styles.image} /> : null
    );

    return (
        <View style={styles.container}>
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <>
                    {projectImages.length > 0 && (
                        <FlatList
                            data={projectImages}
                            renderItem={renderItem}
                            keyExtractor={(item, index) => index.toString()}
                            numColumns={3} // Show three images per row
                            columnWrapperStyle={styles.row}
                        />
                    )}
                    <Button title="Select Block" onPress={handleNavigateToBlocks} />
                    <Button title="Make Some Cool Stuff" onPress={handleAddImage} />
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    image: {
        width: imageSize,
        height: imageSize,
        margin: 4,
        resizeMode: 'cover',
    },
    row: {
        justifyContent: 'space-between',
    },
});

export default ProjectScreen;
