import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { AudioCard } from '../components/AudioCard';
import { useFavoritedAudios } from '../hooks/useFavoritedAudios';

export const FavoritesScreen = () => {
  const { favoriteAudios, isLoading } = useFavoritedAudios();

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Loading favorites...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Favorites</Text>
      <FlatList
        data={favoriteAudios}
        renderItem={({ item }) => <AudioCard audio={item} />}
        keyExtractor={item => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  list: {
    paddingBottom: 24,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
}); 