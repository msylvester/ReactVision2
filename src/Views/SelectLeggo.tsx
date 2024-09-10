import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Pressable, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import { CATEGORIES, COLORS } from '../constants';
import ColorPickerModal from '../Components/ColorPickerModal';
import styles from '../styles/leggSelectStyles';
import { KEY } from '@env';

const API_URL = 'https://rebrickable.com/api/v3/lego/parts/';

interface Part {
  part_num: string;
  name: string;
  part_cat: number;
  part_url: string;
  part_img_url: string | null;
  external_ids: {
    BrickLink: string[];
    BrickOwl: string[];
    Brickset?: string[];
    LDraw: string[];
    LEGO?: string[];
  };
  print_of: string | null;
}

interface ApiResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Part[];
}

const parseApiResponse = (data: ApiResponse): Part[] => {
  return data.results.map(part => ({
    part_num: part.part_num,
    name: part.name,
    part_cat: part.part_cat,
    part_url: part.part_url,
    part_img_url: part.part_img_url,
    external_ids: part.external_ids,
    print_of: part.print_of
  }));
};



const SelectLeggo = () => {
    const navigation = useNavigation();
    const [colorModalVisible, setColorModalVisible] = useState(false);
    const [selectedColor, setSelectedColor] = useState<string | null>(null);
    const [selectedColorId, setSelectedColorId] = useState<string | null>(null);
    const [searchText, setSearchText] = useState<string>('');
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [categoryId, setCategoryID] = useState<string | null>(null)
   
    const selectCat = (cat) => {
        setSelectedCategory(cat);
        setCategoryID(CATEGORIES[cat]);
       
    }
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
            console.log(`here is the ping ${API_URL}?${queryParams}`);

            const response = await fetch(`${API_URL}?${queryParams}`, {
                headers: {
                    'Authorization': `key ${KEY}`
                }
            });

            if (!response.ok) {
                throw new Error('Error fetching parts');
            }

            const data: ApiResponse = await response.json();
            const parsedParts = parseApiResponse(data);
            console.log(`here is the parsed parts ${JSON.stringify(parsedParts)}`);

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
                    onValueChange={(itemValue) =>selectCat(itemValue)}
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
                <Text style={styles.searchButtonText}>
                    {loading ? 'Loading...' : 'Search'}
                </Text>
            </Pressable>

            <ColorPickerModal
                visible={colorModalVisible}
                onClose={closeColorPicker}
                onSelectColor={handleColorSelect}
            />
        </View>
    );
};

export default SelectLeggo;
