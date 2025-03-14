import React, { useEffect, useRef } from 'react';
import { 
  View, 
  TouchableOpacity, 
  StyleSheet, 
  Animated, 
  Easing,
} from 'react-native';

interface AnimatedRecordButtonProps {
  isRecording: boolean;
  onPress: () => void;
}

export const AnimatedRecordButton: React.FC<AnimatedRecordButtonProps> = ({
  isRecording,
  onPress,
}) => {
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isRecording) {
      // Start pulse animation
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.2,
            duration: 1000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 1000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ])
      ).start();

      // Start rotation animation
      Animated.loop(
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 3000,
          easing: Easing.linear,
          useNativeDriver: true,
        })
      ).start();
    } else {
      // Reset animations
      pulseAnim.setValue(1);
      rotateAnim.setValue(0);
    }
  }, [isRecording]);

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      {isRecording && (
        <Animated.View
          style={[
            styles.ripple,
            {
              transform: [{ scale: pulseAnim }],
              opacity: pulseAnim.interpolate({
                inputRange: [1, 1.2],
                outputRange: [0.2, 0],
              }),
            },
          ]}
        />
      )}
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.8}
      >
        <Animated.View
          style={[
            styles.button,
            isRecording && styles.recording,
            {
              transform: [
                { scale: pulseAnim },
                { rotate: spin },
              ],
            },
          ]}
        >
          <View style={[
            styles.innerCircle,
            isRecording && styles.innerCircleRecording
          ]} />
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: 100,
  },
  ripple: {
    position: 'absolute',
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FF9999',
  },
  button: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FF9999',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  recording: {
    backgroundColor: '#FF4444',
  },
  innerCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#FFF',
  },
  innerCircleRecording: {
    width: 20,
    height: 20,
    borderRadius: 3,
  },
}); 