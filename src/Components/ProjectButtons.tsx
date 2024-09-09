import React, { useState, useEffect } from 'react';
import { Animated, Easing, FlatList, StyleSheet, Text, TouchableOpacity } from 'react-native';

const ProjectButtons = ({ selected, projects, buttonVibrations, handleButtonPress, deleteSelect = false }) => {
    const shakeAnimation = new Animated.Value(0);
    const startShakeAnimation = () => {
        Animated.loop(
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
            ]),
            { iterations: -1 } // Loop indefinitely
        ).start();
    };


    useEffect(() => {
        if (deleteSelect) {
            startShakeAnimation();
        }
    }, [deleteSelect]);

    return (
        <FlatList
            data={projects}
            renderItem={({ item, index }) => (
                <TouchableOpacity
                    style={[
                        styles.button,
                        selected === item && styles.selectedButton,
                        deleteSelect && { transform: [{ translateX: shakeAnimation }] },
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
        backgroundColor: '#ff0000',
        padding: 20,
        margin: 10,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        fontSize: 18,
        color: '#ffff00',
        fontWeight: 'bold',
    },
    selectedButton: {
        backgroundColor: '#0000ff', // Change background color to blue when selected
    },
});

export default ProjectButtons;
