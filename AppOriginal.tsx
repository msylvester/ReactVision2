// src/App.tsx
import React from 'react';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import AppNavigator from './AppNavigator';
import ImagePickerTest from './src/components/ImagePickerTest'; // Adjust path as needed

const App: React.FC = () => {
  return (
    <Provider store={store}>
      {/* Uncomment one of the following options depending on your use case */}
      
      {/* Option 1: Directly use ImagePickerTest component */}
      {/* <ImagePickerTest /> */}

      {/* Option 2: Keep AppNavigator and include ImagePickerTest in your navigation */}
      <AppNavigator />
    </Provider>
  );
};

export default App;
