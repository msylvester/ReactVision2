import React, { useState } from 'react';
import { View, FlatList, TouchableOpacity, Text, StyleSheet } from 'react-native';

const MyButtonList = ({ projects }) => {
    const [selectedButton, setSelectedButton] = useState(null);

    // // Example array of project names
    // const projects = ['Project 1', 'Project 2', 'Project 3', 'Project 4'];

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={[styles.button, selectedButton === item && styles.selectedButton]}
            onPress={() => handleButtonPress(item)}
        >
            <Text style={styles.buttonText}>{item}</Text>
        </TouchableOpacity>
    );

    const handleButtonPress = (projectName) => {
        setSelectedButton(projectName);
        // You can perform additional actions here based on the selected project
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={projects}
                renderItem={renderItem}
                keyExtractor={(item) => item}
                numColumns={2} // Change this as per your requirement
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    button: {
        backgroundColor: '#DDDDDD',
        padding: 10,
        margin: 5,
        borderRadius: 5,
    },
    buttonText: {
        fontSize: 16,
    },
    selectedButton: {
        backgroundColor: '#00CED1', // Change to your desired color
    },
});

export default MyButtonList;
