import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Pressable, Alert, ActivityIndicator } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import { CATEGORIES, COLORS } from '../constants';
import ColorPickerModal from '../Components/ColorPickerModal';
import styles from '../styles/leggoSelectStyles';
import { KEY } from '@env';

const API_URL = 'https://rebrickable.com/api/v3/lego/parts/';

const SelectLeggo = () => {
    const navigation = useNavigation();
    const [colorModalVisible, setColorModalVisible] = useState(false);
    const [selectedColor, setSelectedColor] = useState<string | null>(null);
    const [selectedColorId, setSelectedColorId] = useState<string | null>(null);
    const [searchText, setSearchText] = useState<string>('');
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [categoryId, setCategoryID] = useState<string | null>(null);
   
    const selectCat = (cat: string) => {
        setSelectedCategory(cat);
        setCategoryID(CATEGORIES[cat]);
    };

    const openColorPicker = () => {
        setColorModalVisible(true);
    };

    const closeColorPicker = () => {
        setColorModalVisible(false);
    };

    const handleColorSelect = (color: string) => {
        setSelectedColor(color);
        const colorId = Object.keys(COLORS).find(key => COLORS[key] === color);
        setSelectedColorId(colorId || null);
        closeColorPicker();
    };

    const filteredCategories = Object.keys(CATEGORIES).filter((category: string) =>
        category.toLowerCase().includes(searchText.toLowerCase())
    );

    const searchParts = async () => {
        setLoading(true);
        try {
            const queryParams = new URLSearchParams({
                page_size: '10',
                search: searchText || '',
                part_cat: categoryId || '',
                color_id: selectedColorId || '',
            }).toString();

            const response = await fetch(`${API_URL}?${queryParams}`, {
                headers: {
                    'Authorization': `key ${KEY}`
                }
            });

            if (!response.ok) {
                throw new Error('Error fetching parts');
            }

            const data = await response.json();
            const parsedParts = data.results.map((part) => ({
                part_num: part.part_num,
                name: part.name,
                part_cat: part.part_cat,
                part_url: part.part_url,
                part_img_url: part.part_img_url,
                external_ids: part.external_ids,
                print_of: part.print_of,
            }));

            // Navigate to the DetailView and pass the fetched parts data
            navigation.navigate('LeggoDetailView', { parts: parsedParts });
        } catch (error) {
            Alert.alert('Error', 'Failed to fetch parts');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.searchBar}
                placeholder="Search Lego Parts"
                value={searchText}
                onChangeText={setSearchText}
                autoCorrect={false}
            />

            <TouchableOpacity
                style={[
                    styles.colorBox,
                    { backgroundColor: selectedColor ? selectedColor.toLowerCase() : '#ccc' }
                ]}
                onPress={openColorPicker}
            >
                <Text style={styles.colorBoxText}>
                    {selectedColor ? selectedColor : 'Pick a Color'}
                </Text>
            </TouchableOpacity>

            <Text style={styles.selectedColorText}>
                {selectedColor ? `Selected Color: ${selectedColor}` : 'No Color Selected'}
            </Text>

            <View style={styles.pickerContainer}>
                <Picker
                    selectedValue={selectedCategory}
                    onValueChange={(itemValue) => selectCat(itemValue)}
                    style={styles.picker}
                >
                    <Picker.Item label="Select a category" value="" />
                    {filteredCategories.map(category => (
                        <Picker.Item key={category} label={category} value={category} />
                    ))}
                </Picker>
            </View>

            <View style={styles.bottomContainer}>
                <Pressable
                    style={styles.searchButton}
                    onPress={searchParts}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator size="small" color="#fff" />
                    ) : (
                        <Text style={styles.searchButtonText}>Search</Text>
                    )}
                </Pressable>
            </View>

            <ColorPickerModal
             
                visible={colorModalVisible}
                onClose={closeColorPicker}
                onSelectColor={handleColorSelect}
            />
        </View>
    );
};

export default SelectLeggo;
