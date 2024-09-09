import React from 'react';
import { FlatList, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Animated, Easing } from 'react-native';

const ProjectButtons = ({ selected, projects, buttonVibrations, handleButtonPress, deleteSelect = false }) => {
    const shakeAnimation = new Animated.Value(0);

    const startShakeAnimation = () => {
        Animated.sequence([
            Animated.timing(shakeAnimation, {
                toValue: 10,
                duration: 50,
                easing: Easing.linear,
                useNativeDriver: true,
            }),
            Animated.timing(shakeAnimation, {
                toValue: -10,
                duration: 50,
                easing: Easing.linear,
                useNativeDriver: true,
            }),
            Animated.timing(shakeAnimation, {
                toValue: 10,
                duration: 50,
                easing: Easing.linear,
                useNativeDriver: true,
            }),
            Animated.timing(shakeAnimation, {
                toValue: 0,
                duration: 50,
                easing: Easing.linear,
                useNativeDriver: true,
            }),
        ]).start();
    };

    if (deleteSelect) {
        startShakeAnimation();
    }

    const buttonStyle = deleteSelect ? { transform: [{ translateX: shakeAnimation }] } : {};

    return (
        <FlatList
            data={projects}
            renderItem={({ item, index }) => (
                <TouchableOpacity
                    style={[
                        styles.button,
                        selected === item && styles.selectedButton,
                        deleteSelect && buttonVibrations[index] && { transform: [{ translateX: shakeAnimation }] },
                    ]}
                    onPress={() => handleButtonPress(index, item)}
                >
                    <Text style={styles.buttonText}>{item}</Text>
                </TouchableOpacity>
            )}
            keyExtractor={(item) => item}
            numColumns={2}
        />
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#ff0000', // Red button color
        padding: 20,
        margin: 10,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        fontSize: 18,
        color: '#ffff00', // Yellow button text color
        fontWeight: 'bold',
    },
    selectedButton: {
        backgroundColor: '#2ecc71', // Green button color
    },
});

export default ProjectButtons;
