import { useState, useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import { firebase } from '../config/firebase';
import { useAuth } from './useAuth';

interface ParticleAnimation {
  scale: Animated.Value;
  translate: Animated.Value;
  opacity: Animated.Value;
}

export const useFavorites = (audioId: string) => {
  const { user } = useAuth();
  const [isFavorite, setIsFavorite] = useState(false);
  
  // Animation values
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const colorAnim = useRef(new Animated.Value(0)).current;
  
  // Particle animations
  const particleAnims = useRef<ParticleAnimation[]>(
    Array(6).fill(0).map(() => ({
      scale: new Animated.Value(0),
      translate: new Animated.Value(0),
      opacity: new Animated.Value(1),
    }))
  ).current;

  useEffect(() => {
    if (!user) return;

    const unsubscribe = firebase
      .firestore()
      .collection('users')
      .doc(user.uid)
      .collection('favorites')
      .doc(audioId)
      .onSnapshot(doc => {
        setIsFavorite(doc.exists);
        
        // Reset particle animations when unfavorited
        if (!doc.exists) {
          particleAnims.forEach(anim => {
            anim.scale.setValue(0);
            anim.translate.setValue(0);
            anim.opacity.setValue(1);
          });
        }
      });

    return () => unsubscribe();
  }, [user, audioId]);

  const toggleFavorite = async () => {
    if (!user) return;

    const favoriteRef = firebase
      .firestore()
      .collection('users')
      .doc(user.uid)
      .collection('favorites')
      .doc(audioId);

    try {
      if (isFavorite) {
        await favoriteRef.delete();
      } else {
        await favoriteRef.set({
          addedAt: firebase.firestore.FieldValue.serverTimestamp(),
        });
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  return {
    isFavorite,
    toggleFavorite,
    scaleAnim,
    rotateAnim,
    colorAnim,
    particleAnims,
  };
}; 