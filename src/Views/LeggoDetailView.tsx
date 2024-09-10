import React from 'react';
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { useDispatch } from 'react-redux';
import { updateBlocks } from '../store'; // Import the action

const LeggoDetailView = ({ route }: any) => {
    const dispatch = useDispatch(); // Get the dispatch function

    // Extract parts data from route params
    const { params: { parts } } = route;

    // Function to handle saving a part to Redux
    const handleSavePart = (part: any) => {
        dispatch(updateBlocks(part)); // Dispatch the part to Redux store
    };

    // Render item function for FlatList
    const renderItem = ({ item }: any) => (
        <View style={styles.itemContainer}>
            <Image
                source={{ uri: item.part_img_url || 'https://via.placeholder.com/100' }}
                style={styles.image}
            />
            <View style={styles.textContainer}>
                <Text style={styles.partNumber}>{item.part_num}</Text>
                <Text style={styles.partName}>{item.name}</Text>
                <TouchableOpacity onPress={() => Linking.openURL(item.part_url)}>
                    <Text style={styles.partUrl}>View Details</Text>
                </TouchableOpacity>
                {/* Add Save Button */}
                <TouchableOpacity onPress={() => handleSavePart(item)} style={styles.saveButton}>
                    <Text style={styles.saveButtonText}>Save to Project</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={parts}
                renderItem={renderItem}
                keyExtractor={(item) => item.part_num}
                contentContainerStyle={styles.list}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    list: {
        paddingBottom: 20,
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        paddingBottom: 16,
    },
    image: {
        width: 100,
        height: 100,
        resizeMode: 'contain',
        marginRight: 16,
    },
    textContainer: {
        flex: 1,
    },
    partNumber: {
        fontWeight: 'bold',
        marginBottom: 4,
    },
    partName: {
        marginBottom: 8,
    },
    partUrl: {
        color: 'blue',
        textDecorationLine: 'underline',
    },
    saveButton: {
        backgroundColor: '#4CAF50',
        padding: 10,
        borderRadius: 5,
        marginTop: 8,
    },
    saveButtonText: {
        color: 'white',
        textAlign: 'center',
    },
});

export default LeggoDetailView;
