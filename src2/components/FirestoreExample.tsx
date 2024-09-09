// src/components/FirestoreExample.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';
import { firebaseFirestore } from '../firebaseConfig';

const FirestoreExample: React.FC = () => {
  const [text, setText] = useState('');
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const snapshot = await firebaseFirestore.collection('items').get();
      const items = snapshot.docs.map(doc => doc.data());
      setData(items);
    };

    fetchData();
  }, []);

  const addData = async () => {
    await firebaseFirestore.collection('items').add({ text });
    setText('');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={text}
        onChangeText={setText}
        placeholder="Enter text"
      />
      <Button title="Add Data" onPress={addData} />
      {data.map((item, index) => (
        <Text key={index}>{item.text}</Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    width: '80%',
    padding: 10,
    marginBottom: 10,
  },
});

export default FirestoreExample;
