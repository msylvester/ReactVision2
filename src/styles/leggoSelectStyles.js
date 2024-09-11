import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f5f5f5',
        justifyContent: 'flex-start',
    },
    searchBar: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
        marginBottom: 16,
    },
    colorBox: {
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        marginBottom: 8, // Reduced margin to tighten spacing
    },
    colorBoxText: {
        color: '#fff',
        fontSize: 16,
    },
    selectedColorText: {
        fontSize: 14,
        color: '#666',
        marginBottom: 8, // Reduced margin here
        backgroundColor: 'transparent', // Ensure no background is causing a white bar
    },
    bottomContainer: {
        position: 'absolute',
        bottom: 20,
        left: 16,
        right: 16,
    },
    pickerContainer: {
        borderWidth: 1,
     
        borderRadius: 8,
        // backgroundColor: '#fff',
     
        marginBottom: 16, // Ensure this spacing is consistent with the layout
    },
    picker: {
      
        width: '100%',
    },
    searchButton: {
        backgroundColor: '#4CAF50',
        padding: 15,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    searchButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    }
});

export default styles;
