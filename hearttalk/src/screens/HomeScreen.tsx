import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { emotions } from '../constants/emotions';
import { AudioCard } from '../components/AudioCard';
import { useAudios } from '../hooks/useAudios';
import { useAuth } from '../hooks/useAuth';

export const HomeScreen = () => {
  const { user } = useAuth();
  const [selectedEmotions, setSelectedEmotions] = useState<string[]>([]);
  const { recommendedAudios, popularAudios } = useAudios(selectedEmotions);

  const handleEmotionSelect = (emotionId: string) => {
    setSelectedEmotions(prev => {
      if (prev.includes(emotionId)) {
        return prev.filter(id => id !== emotionId);
      }
      if (prev.length >= 3) return prev;
      return [...prev, emotionId];
    });
  };

  const fetchRecommendations = async () => {
    try {
      await fetchAudios();
    } catch (error) {
      console.error('Error fetching recommendations:', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.greeting}>Hello, {user?.displayName || 'there'} 👋</Text>
      
      <View style={styles.emotionsSection}>
        <Text style={styles.question}>How are you feeling today?</Text>
        <View style={styles.emotionsGrid}>
          {emotions.map(emotion => (
            <TouchableOpacity
              key={emotion.id}
              style={[
                styles.emotionButton,
                selectedEmotions.includes(emotion.id) && styles.emotionSelected,
                { backgroundColor: emotion.color }
              ]}
              onPress={() => handleEmotionSelect(emotion.id)}
            >
              <Text style={styles.emotionText}>{emotion.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {selectedEmotions.length > 0 && (
          <TouchableOpacity 
            style={styles.recommendButton}
            onPress={() => fetchRecommendations()}
          >
            <Text style={styles.recommendButtonText}>
              Give me audio recommendations
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {recommendedAudios.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recommended for You</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {recommendedAudios.map(audio => (
              <AudioCard key={audio.id} audio={audio} />
            ))}
          </ScrollView>
        </View>
      )}

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Popular Audios</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {popularAudios.map(audio => (
            <AudioCard key={audio.id} audio={audio} />
          ))}
        </ScrollView>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  emotionsSection: {
    marginBottom: 32,
  },
  question: {
    fontSize: 18,
    marginBottom: 16,
  },
  emotionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  emotionButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  emotionSelected: {
    borderWidth: 2,
    borderColor: '#000',
  },
  emotionText: {
    color: '#fff',
    fontWeight: '500',
  },
  recommendButton: {
    backgroundColor: '#FF9999',
    padding: 16,
    borderRadius: 25,
    alignItems: 'center',
  },
  recommendButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
  },
}); 