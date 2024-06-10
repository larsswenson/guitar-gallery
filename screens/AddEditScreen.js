import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { createGuitar, fetchGuitar, updateGuitar } from '../api';

const AddEditScreen = ({ route, navigation }) => {
  const { id } = route.params || {};
  const queryClient = useQueryClient();

  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [image, setImage] = useState('');

  const { data, isSuccess } = useQuery({
    queryKey: ['guitar', id],
    queryFn: () => fetchGuitar(id),
    enabled: !!id,
  });

  useEffect(() => {
    if (isSuccess) {
      setMake(data.make);
      setModel(data.model);
      setYear(data.year);
      setImage(data.image);
    }
  }, [isSuccess, data]);

  const mutation = useMutation({
    mutationFn: id ? (updatedData) => updateGuitar(id, updatedData) : createGuitar,
    onSuccess: () => {
      queryClient.invalidateQueries(['guitars']);
      Alert.alert('Success', id ? 'Guitar updated' : 'Guitar added');
      navigation.goBack();
    },
    onError: (error) => {
      Alert.alert('Error', `Error saving guitar: ${error.message}`);
    },
  });

  const handleSaveGuitar = () => {
    const guitarData = { make, model, year, image };
    mutation.mutate(guitarData);
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
        title={id ? "Update Guitar" : "Add Guitar"}
        onPress={handleSaveGuitar}
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











































