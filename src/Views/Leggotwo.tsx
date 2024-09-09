import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import ColorPickerModal from '../Components/ColorPickerModal';  // Import the modal component

const LeggoTwo = () => {
    const [colorModalVisible, setColorModalVisible] = useState(false);
    const [selectedColor, setSelectedColor] = useState<string | null>(null);

    const openColorPicker = () => {
        setColorModalVisible(true);
    };

    const closeColorPicker = () => {
        setColorModalVisible(false);
    };

    const handleColorSelect = (color: string) => {
        setSelectedColor(color);  // Set the selected color in the parent
    };

    return (
        <View style={styles.container}>
            <Text style={styles.selectedColorText}>Selected Color: {selectedColor || 'None'}</Text>
            
            {/* Color Box that opens the modal */}
            <TouchableOpacity
                style={[
                    styles.colorBox,
                    { backgroundColor: selectedColor ? selectedColor.toLowerCase() : 'gray' }
                ]}
                onPress={openColorPicker}
            >
                <Text style={styles.colorBoxText}>
                    {selectedColor ? selectedColor : 'Pick a Color'}
                </Text>
            </TouchableOpacity>

            {/* Render the modal */}
            <ColorPickerModal
                visible={colorModalVisible}
                onClose={closeColorPicker}
                onSelectColor={handleColorSelect}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    selectedColorText: {
        fontSize: 20,
        marginBottom: 20,
    },
    colorBox: {
        width: 150,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        borderWidth: 2,
        borderColor: 'black',
    },
    colorBoxText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default LeggoTwo;
