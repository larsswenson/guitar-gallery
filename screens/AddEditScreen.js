import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createGuitar } from '../api';

const AddEditScreen = ({ navigation }) => {
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [image, setImage] = useState('');

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createGuitar,
    onSuccess: () => {
      queryClient.invalidateQueries('guitars');
      navigation.goBack();
    },
    onError: (error) => {
      console.error('Error creating guitar:', error);
    },
  });

  const handleAddGuitar = () => {
    console.log('Preparing to add guitar:', { make, model, year, image });
    try {
      mutation.mutate({ make, model, year, image });
      console.log('Mutation called');
    } catch (error) {
      console.error('Mutation error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Make:</Text>
      <TextInput
        style={styles.input}
        value={make}
        onChangeText={setMake}
      />
      <Text style={styles.label}>Model:</Text>
      <TextInput
        style={styles.input}
        value={model}
        onChangeText={setModel}
      />
      <Text style={styles.label}>Year:</Text>
      <TextInput
        style={styles.input}
        value={year}
        onChangeText={setYear}
      />
      <Text style={styles.label}>Image URL:</Text>
      <TextInput
        style={styles.input}
        value={image}
        onChangeText={setImage}
      />
      <Button
        title="Add Guitar"
        onPress={handleAddGuitar}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
});

export default AddEditScreen;







































