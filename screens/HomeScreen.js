import React from 'react';
import { View, Text, Button, FlatList, StyleSheet, Image, Pressable } from 'react-native';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchGuitars, deleteGuitar } from '../api';

const HomeScreen = ({ navigation }) => {
  const queryClient = useQueryClient();
  const { data, error, isLoading } = useQuery({
    queryKey: ['guitars'],
    queryFn: fetchGuitars
  });

  const deleteMutation = useMutation({
    mutationFn: deleteGuitar,
    onSuccess: () => {
      queryClient.invalidateQueries(['guitars']);
    },
  });

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Pressable onPress={() => navigation.navigate('Detail', { id: item.id })}>
              <View style={styles.itemContent}>
                <Image source={{ uri: item.image }} style={styles.image} />
                <Text style={styles.text}>{item.make} {item.model} ({item.year})</Text>
              </View>
            </Pressable>
            <View style={styles.buttonContainer}>
              <Button title="Edit" onPress={() => navigation.navigate('AddEdit', { id: item.id })} />
              <Button title="Delete" onPress={() => deleteMutation.mutate(item.id)} />
            </View>
          </View>
        )}
      />
      <Button title="Add Guitar" onPress={() => navigation.navigate('AddEdit')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  itemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 10,
    resizeMode: 'contain',
  },
  text: {
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 10,
  },
});

export default HomeScreen;














































 





























































