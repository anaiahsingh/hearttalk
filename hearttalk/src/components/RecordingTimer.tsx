import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface RecordingTimerProps {
  duration: number;
}

export const RecordingTimer: React.FC<RecordingTimerProps> = ({ duration }) => {
  const minutes = Math.floor(duration / 60);
  const seconds = duration % 60;

  return (
    <View style={styles.container}>
      <Text style={styles.time}>
        {minutes}:{seconds.toString().padStart(2, '0')}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FF9999',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  time: {
    fontSize: 24,
    fontWeight: '600',
    color: '#fff',
  },
}); 