import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Audio } from '../navigation/types';
import { HeartButton } from './HeartButton';
import { useNavigation } from '@react-navigation/native';

interface AudioCardProps {
  audio: Audio;
}

export const AudioCard: React.FC<AudioCardProps> = ({ audio }) => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate('AudioPlayer', {
      audioId: audio.id,
      isPremium: audio.isPremium,
    });
  };

  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={handlePress}
    >
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>
          {audio.title}
        </Text>
        <Text style={styles.duration}>
          {Math.floor(audio.duration / 60)}:{(audio.duration % 60).toString().padStart(2, '0')}
        </Text>
        {audio.isPremium && (
          <View style={styles.premiumBadge}>
            <Text style={styles.premiumText}>Premium</Text>
          </View>
        )}
        <HeartButton 
          audioId={audio.id}
          style={styles.heartButton}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 160,
    height: 160,
    marginRight: 16,
    borderRadius: 12,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  content: {
    padding: 12,
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  duration: {
    fontSize: 14,
    color: '#666',
  },
  premiumBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#FFD700',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  premiumText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#000',
  },
  heartButton: {
    position: 'absolute',
    bottom: 8,
    right: 8,
  },
}); 