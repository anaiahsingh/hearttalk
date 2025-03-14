import { useState, useEffect } from 'react';
import { Audio } from '../navigation/types';
import { firebase } from '../config/firebase';
import { useAuth } from './useAuth';

export const useFavoritedAudios = () => {
  const { user } = useAuth();
  const [favoriteAudios, setFavoriteAudios] = useState<Audio[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setFavoriteAudios([]);
      setIsLoading(false);
      return;
    }

    const unsubscribe = firebase
      .firestore()
      .collection('users')
      .doc(user.uid)
      .collection('favorites')
      .orderBy('addedAt', 'desc')
      .onSnapshot(async snapshot => {
        const audioIds = snapshot.docs.map(doc => doc.id);
        
        if (audioIds.length === 0) {
          setFavoriteAudios([]);
          setIsLoading(false);
          return;
        }

        // Fetch audio details for all favorited audios
        const audiosSnapshot = await firebase
          .firestore()
          .collection('audios')
          .where(firebase.firestore.FieldPath.documentId(), 'in', audioIds)
          .get();

        const audios = audiosSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        })) as Audio[];

        // Sort audios to match favorites order
        const sortedAudios = audioIds
          .map(id => audios.find(audio => audio.id === id))
          .filter((audio): audio is Audio => audio !== undefined);

        setFavoriteAudios(sortedAudios);
        setIsLoading(false);
      });

    return () => unsubscribe();
  }, [user]);

  return { favoriteAudios, isLoading };
}; 