import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Modal, SafeAreaView } from 'react-native';
import { PRIMARY_COLORS } from '../constants'; // Ensure correct path

const colorCategories = {
    'Black and White': ['Black', 'White', 'Light Gray', 'Dark Gray', 'Milky White', 'Glow In Dark White'],
    'Shades of Blue': ['Blue', 'Light Blue', 'Dark Blue', 'Navy Blue', 'Medium Blue', 'Sky Blue', 'Royal Blue', 'Pastel Blue', 'Vintage Blue', 'Modulex Blue', 'Duplo Blue', 'HO Blue', 'HO Medium Blue', 'HO Light Blue', 'HO Dark Blue', 'HO Dark Aqua'],
    'Shades of Green': ['Green', 'Dark Green', 'Olive Green', 'Light Green', 'Bright Green', 'Medium Green', 'Aqua', 'Trans-Green', 'Modulex Green', 'Duplo Green', 'HO Green', 'HO Medium Green', 'HO Light Green', 'HO Dark Green'],
    'Shades of Red': ['Red', 'Dark Red', 'Bright Red', 'Medium Red', 'Salmon', 'Coral', 'Reddish Orange', 'Reddish Brown', 'Trans-Red', 'Modulex Red', 'Duplo Pink', 'HO Red', 'HO Medium Red', 'HO Dark Red'],
    'Shades of Yellow': ['Yellow', 'Light Yellow', 'Bright Yellow', 'Gold', 'Vibrant Yellow', 'Trans-Yellow', 'Modulex Yellow', 'Duplo Yellow', 'HO Yellow', 'HO Light Yellow', 'HO Dark Yellow'],
    'Shades of Pink': ['Pink', 'Dark Pink', 'Bright Pink', 'Light Pink', 'Magenta', 'Glitter Trans-Pink', 'Modulex Pink', 'Clikits Pink', 'Fabuland Pink', 'HO Pink'],
    'Shades of Purple': ['Purple', 'Lavender', 'Medium Lavender', 'Dark Purple', 'Light Purple', 'Medium Bluish Violet', 'Trans-Purple', 'Glitter Trans-Purple', 'Opal Trans-Purple', 'Modulex Violet', 'Duplo Dark Purple', 'HO Purple'],
    'Shades of Orange': ['Orange', 'Dark Orange', 'Light Orange', 'Bright Orange', 'Rust Orange', 'Earth Orange', 'Trans-Orange', 'Modulex Orange', 'Fabuland Orange', 'Two-tone Orange', 'HO Orange'],
    'Shades of Brown': ['Brown', 'Light Brown', 'Dark Brown', 'Tan', 'Nougat', 'Medium Brown', 'Reddish Brown', 'Modulex Brown', 'Fabuland Brown', 'HO Brown'],
    'Shades of Gray': ['Gray', 'Light Gray', 'Dark Gray', 'Metallic Silver', 'Speckle Black-Silver', 'Modulex Light Gray', 'Modulex Dark Gray', 'Modulex Tile Gray', 'HO Gray', 'HO Dark Gray'],
    'Special and Miscellaneous Colors': ['Chrome Black', 'Chrome Blue', 'Chrome Green', 'Chrome Pink', 'Chrome Silver', 'Chrome Gold', 'Trans-Clear', 'Glitter Trans-Bright Green', 'Opal Trans-Light Blue', 'Pearl White', 'Modulex Clear', 'HO Aqua', 'HO Azure', 'HO Blue-gray', 'HO Cyan', 'HO Dark Aqua', 'HO Gold', 'HO Light Aqua', 'HO Light Brown', 'HO Light Gold', 'HO Light Tan', 'HO Light Yellow', 'HO Medium Blue', 'HO Medium Red', 'HO Metallic Blue', 'HO Metallic Dark Gray', 'HO Metallic Green', 'HO Metallic Sand Blue', 'HO Rose', 'HO Sand Blue', 'HO Sand Green', 'HO Tan', 'HO Titanium']
};

const ColorPickerModal = ({ visible, onClose, onSelectColor }) => {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [selectedColor, setSelectedColor] = useState<string | null>(null);

    // Debugging
    console.log("Selected Category:", selectedCategory);

    const handleColorSelect = (color: string) => {
        setSelectedColor(color);
        onSelectColor(color); // Pass the selected color to the parent
        onClose(); // Close the modal
    };

    const renderCategoryItem = ({ item }: { item: string }) => (
        <TouchableOpacity
            style={styles.categoryButton}
            onPress={() => setSelectedCategory(item)}
        >
            <Text style={styles.categoryText}>{item}</Text>
        </TouchableOpacity>
    );

    const renderColorItem = ({ item }: { item: string }) => (
        <TouchableOpacity
            style={[
                styles.colorButton,
                { backgroundColor: item.toLowerCase(), borderColor: selectedColor === item ? 'black' : 'transparent' }
            ]}
            onPress={() => handleColorSelect(item)}
        >
            <Text style={[styles.colorText, { color: item === 'White' ? 'black' : 'white' }]}>{item}</Text>
        </TouchableOpacity>
    );

    return (
        <Modal visible={visible} animationType="slide" transparent={true}>
            <SafeAreaView style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                        <Text style={styles.closeButtonText}>X</Text>
                    </TouchableOpacity>
                    <Text style={styles.title}>
                        {selectedCategory ? 'Select a Color:' : 'Select a Category:'}
                    </Text>
                    {selectedCategory ? (
                        <>
                            <FlatList
                                data={colorCategories[selectedCategory]}
                                renderItem={renderColorItem}
                                keyExtractor={(item) => item}
                                numColumns={3}
                                contentContainerStyle={styles.listContainer}
                            />
                            <TouchableOpacity onPress={() => setSelectedCategory(null)} style={styles.backButton}>
                                <Text style={styles.backButtonText}>Back</Text>
                            </TouchableOpacity>
                        </>
                    ) : (
                        <FlatList
                            data={Object.keys(colorCategories)}
                            renderItem={renderCategoryItem}
                            keyExtractor={(item) => item}
                            numColumns={2}
                            contentContainerStyle={styles.listContainer}
                        />
                    )}
                </View>
            </SafeAreaView>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '90%',
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    title: {
        fontSize: 18,
        marginBottom: 10,
    },
    listContainer: {
        paddingBottom: 20,
    },
    colorButton: {
        width: 100,
        height: 50,
        margin: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderRadius: 5,
    },
    colorText: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    categoryButton: {
        padding: 10,
        margin: 5,
        borderRadius: 5,
        backgroundColor: '#f0f0f0',
    },
    categoryText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    backButton: {
        marginTop: 20,
        padding: 10,
        borderRadius: 5,
        backgroundColor: '#ddd',
    },
    backButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    closeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
    },
    closeButtonText: {
        fontSize: 24,
        fontWeight: 'bold',
    },
});

export default ColorPickerModal;
