import {StyleSheet} from 'react-native';

const homeScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#87CEEB', // Medium blue background color
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingTop: 20,
  },
  topButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    backgroundColor: '#333333', // Background color for the button container
    borderRadius: 10, // Rounded corners
    margin: 10, // Margin around the container
  },
  buttonWrapper: {
    flex: 1,
    marginHorizontal: 5, // Spacing between buttons
    borderColor: '#ffffff', // White border color
    borderWidth: 1, // Border width
    borderRadius: 5, // Rounded corners for each button
    paddingVertical: 5, // Vertical padding inside each button
  },
  projectButtonsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  projectButton: {
    flex: 1,
    padding: 10,
    margin: 5,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
  },
  folderImage: {
    width: '80%', // Make the image take up 80% of the button width
    height: undefined, // Allow height to adjust based on aspect ratio
    aspectRatio: 1, // Ensure the image maintains a square aspect ratio
  },
  projectName: {
    marginTop: 5,
    fontSize: 16,
    color: '#333333',
    textAlign: 'center',
  },
  selectedButton: {
    backgroundColor: '#2ecc71',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  input: {
    width: 200,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  bottomButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
});

export default homeScreenStyles;
