import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { fetchGuitar } from '../api';

const DetailScreen = ({ route }) => {
  const { id } = route.params;
  const { data, error, isLoading } = useQuery({
    queryKey: ['guitar', id],
    queryFn: () => fetchGuitar(id)
  });

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: data.image }} style={styles.image} />
      <Text style={styles.text}>{data.make} {data.model} ({data.year})</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
    resizeMode: 'contain',
  },
  text: {
    fontSize: 20,
  },
});

export default DetailScreen;
































