import { useState, useEffect } from 'react';
import { Audio } from '../navigation/types';
import { firebase } from '../config/firebase';

export const useAudios = (selectedEmotions: string[]) => {
  const [recommendedAudios, setRecommendedAudios] = useState<Audio[]>([]);
  const [popularAudios, setPopularAudios] = useState<Audio[]>([]);

  useEffect(() => {
    const fetchAudios = async () => {
      if (selectedEmotions.length === 0) {
        setRecommendedAudios([]);
        return;
      }

      // Fetch recommended audios based on selected emotions
      const snapshot = await firebase
        .firestore()
        .collection('audios')
        .where('emotionTags', 'array-contains-any', selectedEmotions)
        .limit(10)
        .get();

      setRecommendedAudios(
        snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Audio))
      );
    };

    fetchAudios();
  }, [selectedEmotions]);

  useEffect(() => {
    // Fetch popular audios
    const unsubscribe = firebase
      .firestore()
      .collection('audios')
      .orderBy('likes', 'desc')
      .limit(10)
      .onSnapshot(snapshot => {
        setPopularAudios(
          snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Audio))
        );
      });

    return () => unsubscribe();
  }, []);

  return { recommendedAudios, popularAudios };
}; 