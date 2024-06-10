import React from 'react';
import { View, Text, FlatList, StyleSheet, Image, Pressable } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { fetchGuitars } from '../api';

const HomeScreen = ({ navigation }) => {
  const { data: guitars, error, isPending } = useQuery({
    queryKey: ['guitars'],
    queryFn: fetchGuitars,
  });

  if (isPending) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={guitars}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Pressable onPress={() => navigation.navigate('Detail', { id: item.id })}>
            <View style={styles.itemContainer}>
              <Image source={{ uri: item.image }} style={styles.image} />
              <Text style={styles.text}>{item.make} {item.model} ({item.year})</Text>
            </View>
          </Pressable>
        )}
      />
      <View style={styles.buttonContainer}>
        <Pressable style={styles.addButton} onPress={() => navigation.navigate('AddEdit')}>
          <Text style={styles.addButtonText}>Add Guitar</Text>
        </Pressable>
      </View>
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
    marginBottom: 20,
    alignItems: 'center',
  },
  image: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    marginRight: 10,
  },
  text: {
    fontSize: 16,
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    width: '100%',
  },
  addButton: {
    padding: 15,
    backgroundColor: 'blue',
    borderRadius: 5,
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default HomeScreen;










































 





























































