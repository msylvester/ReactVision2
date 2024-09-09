import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, Pressable, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';  
import { CATEGORIES } from '../constants';  
import ColorPickerModal from '../Components/ColorPickerModal';  
import styles from '../styles/leggSelectStyles';  

const API_URL = 'https://your-api-endpoint.com/parts';  // Replace with actual API URL

const SelectLeggo = () => {
    const [colorModalVisible, setColorModalVisible] = useState(false);
    const [selectedColor, setSelectedColor] = useState<string | null>(null);
    const [searchText, setSearchText] = useState<string>('');
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [parts, setParts] = useState<any[]>([]);

    const openColorPicker = () => {
        setColorModalVisible(true);
    };

    const closeColorPicker = () => {
        setColorModalVisible(false);
    };

    const handleColorSelect = (color: string) => {
        setSelectedColor(color);
        closeColorPicker();
    };

    const filteredCategories = CATEGORIES.filter((category: string) =>
        category.toLowerCase().includes(searchText.toLowerCase())
    );

    const searchParts = async () => {
        try {
            const queryParams = new URLSearchParams({
                part_cat_id: selectedCategory,
                color_id: selectedColor || '',
                search: searchText,
                page_size: '10',  // Example, can be modified
            }).toString();

            const response = await fetch(`${API_URL}?${queryParams}`);
            if (!response.ok) {
                throw new Error('Error fetching parts');
            }

            const data = await response.json();
            setParts(data.results);  // Assuming the response contains a "results" array
        } catch (error) {
            Alert.alert('Error', 'Failed to fetch parts');
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.searchBar}
                placeholder="Leggo Parts"
                value={searchText}
                onChangeText={setSearchText}
            />
            
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

            <Text style={styles.selectedColorText}>Selected Color: {selectedColor || 'None'}</Text>

            <View style={styles.pickerContainer}>
                <Picker
                    selectedValue={selectedCategory}
                    onValueChange={(itemValue) => setSelectedCategory(itemValue)}
                >
                    <Picker.Item label="Select a category" value="" />
                    {filteredCategories.map(category => (
                        <Picker.Item key={category} label={category} value={category} />
                    ))}
                </Picker>
            </View>

            <Pressable
                style={styles.searchButton}
                onPress={searchParts}
            >
                <Text style={styles.searchButtonText}>Search</Text>
            </Pressable>

            {/* Display the search results */}
            <ScrollView style={styles.resultsContainer}>
                {parts.map((part, index) => (
                    <View key={index} style={styles.partItem}>
                        <Text>{part.part_num} - {part.name}</Text>
                    </View>
                ))}
            </ScrollView>

            <ColorPickerModal
                visible={colorModalVisible}
                onClose={closeColorPicker}
                onSelectColor={handleColorSelect}
            />
        </View>
    );
};

export default SelectLeggo;
