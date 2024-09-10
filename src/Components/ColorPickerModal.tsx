import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Modal, SafeAreaView } from 'react-native';
import { COLORS } from '../constants';  // Import the COLORS object

// Define your color categories using colors from the COLORS object
const colorCategories = {
  'Black and White': [COLORS[0], COLORS[15], COLORS[7], COLORS[8], COLORS[47], COLORS[21]],
  'Shades of Blue': [COLORS[1], COLORS[9], COLORS[33], COLORS[41], COLORS[73]],
  'Shades of Green': [COLORS[2], COLORS[10], COLORS[17], COLORS[27], COLORS[35]],
  'Shades of Red': [COLORS[4], COLORS[36], COLORS[5], COLORS[29]],
  'Shades of Yellow': [COLORS[14], COLORS[18], COLORS[46], COLORS[226]],
  'Shades of Pink and Purple': [COLORS[31], COLORS[22], COLORS[26], COLORS[23], COLORS[29]],
  'Shades of Brown': [COLORS[6], COLORS[19], COLORS[28], COLORS[70], COLORS[78]],
  'Shades of Gray and Silver': [COLORS[7], COLORS[8], COLORS[71], COLORS[72], COLORS[80]],
  'Special and Metallic': [COLORS[47], COLORS[80], COLORS[82]]
  // Add more categories as needed
};

const ColorPickerModal = ({ visible, onClose, onSelectColor }) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
    onSelectColor(color);  // Pass the selected color to the parent
    onClose();  // Close the modal
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
