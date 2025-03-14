import React, { useEffect } from 'react';
import { 
  TouchableOpacity, 
  StyleSheet, 
  Animated, 
  ViewStyle,
  Easing,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useFavorites } from '../hooks/useFavorites';
import * as Haptics from 'expo-haptics';

interface HeartButtonProps {
  audioId: string;
  style?: ViewStyle;
  size?: number;
  onAnimationComplete?: () => void;
}

export const HeartButton: React.FC<HeartButtonProps> = ({ 
  audioId, 
  style,
  size = 24,
  onAnimationComplete,
}) => {
  const { 
    isFavorite, 
    toggleFavorite, 
    scaleAnim,
    rotateAnim,
    colorAnim,
    particleAnims,
  } = useFavorites(audioId);

  const handlePress = async () => {
    try {
      // Haptic feedback
      await Haptics.impactAsync(
        isFavorite 
          ? Haptics.ImpactFeedbackStyle.Medium
          : Haptics.ImpactFeedbackStyle.Heavy
      );

      // Start animations before database operation
      startAnimations();
      
      // Toggle favorite in database
      await toggleFavorite();
      
      onAnimationComplete?.();
    } catch (error) {
      console.error('Error handling heart press:', error);
      // Reset animations on error
      resetAnimations();
    }
  };

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '45deg'],
  });

  const color = colorAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['#666666', '#FF4444'],
  });

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={[styles.container, style]}
      activeOpacity={0.8}
    >
      {/* Particle effects */}
      {particleAnims.map((anim, index) => (
        <Animated.View
          key={index}
          style={[
            styles.particle,
            {
              transform: [
                { scale: anim.scale },
                {
                  translateX: anim.translate.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 30 * Math.cos(index * Math.PI / 3)],
                  }),
                },
                {
                  translateY: anim.translate.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 30 * Math.sin(index * Math.PI / 3)],
                  }),
                },
              ],
              opacity: anim.opacity,
            },
          ]}
        >
          <Icon name="heart" size={size / 3} color="#FF4444" />
        </Animated.View>
      ))}

      {/* Main heart icon */}
      <Animated.View
        style={{
          transform: [
            { scale: scaleAnim },
            { rotate },
          ],
        }}
      >
        <Icon
          name={isFavorite ? 'heart' : 'heart-outline'}
          size={size}
          color={color}
        />
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  particle: {
    position: 'absolute',
    zIndex: -1,
  },
}); 