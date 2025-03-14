import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';

interface WaveformVisualizerProps {
  isRecording: boolean;
}

export const WaveformVisualizer: React.FC<WaveformVisualizerProps> = ({
  isRecording,
}) => {
  const bars = new Array(20).fill(0);
  const barAnimations = useRef(
    bars.map(() => new Animated.Value(0))
  ).current;

  useEffect(() => {
    const timeouts: NodeJS.Timeout[] = [];
    
    if (isRecording) {
      barAnimations.forEach((anim, index) => {
        const animate = () => {
          Animated.sequence([
            Animated.timing(anim, {
              toValue: Math.random(),
              duration: 500 + Math.random() * 500,
              useNativeDriver: true,
            }),
            Animated.timing(anim, {
              toValue: Math.random() * 0.5,
              duration: 500 + Math.random() * 500,
              useNativeDriver: true,
            }),
          ]).start(animate);
        };
        
        timeouts.push(setTimeout(animate, index * 100));
      });
    } else {
      // Reset all bars
      Animated.parallel(
        barAnimations.map(anim =>
          Animated.timing(anim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          })
        )
      ).start();
    }

    return () => {
      timeouts.forEach(timeout => clearTimeout(timeout));
    };
  }, [isRecording]);

  return (
    <View style={styles.container}>
      {bars.map((_, index) => (
        <Animated.View
          key={index}
          style={[
            styles.bar,
            {
              transform: [{
                scaleY: barAnimations[index].interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.3, 1],
                }),
              }],
              opacity: barAnimations[index].interpolate({
                inputRange: [0, 1],
                outputRange: [0.5, 1],
              }),
            },
          ]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 100,
    marginVertical: 20,
  },
  bar: {
    width: 3,
    height: 50,
    backgroundColor: '#FF9999',
    marginHorizontal: 2,
    borderRadius: 2,
  },
}); 