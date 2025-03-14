import '../models/audio.dart';
import 'package:cloud_firestore/cloud_firestore.dart';

class AudioService {
  final FirebaseFirestore _firestore = FirebaseFirestore.instance;

  Future<List<Audio>> getRecommendedAudios(List<String> emotions) async {
    final snapshot = await _firestore
        .collection('audios')
        .where('emotionTags', arrayContainsAny: emotions)
        .limit(10)
        .get();

    return snapshot.docs.map((doc) {
      final data = doc.data();
      return Audio(
        id: doc.id,
        title: data['title'],
        author: data['author'],
        duration: data['duration'],
        url: data['url'],
        emotionTags: List<String>.from(data['emotionTags']),
        likes: data['likes'],
        isPremium: data['isPremium'],
        createdAt: (data['createdAt'] as Timestamp).toDate(),
      );
    }).toList();
  }

  Stream<List<Audio>> getPopularAudios() {
    return _firestore
        .collection('audios')
        .orderBy('likes', descending: true)
        .limit(10)
        .snapshots()
        .map((snapshot) {
      return snapshot.docs.map((doc) {
        final data = doc.data();
        return Audio(
          id: doc.id,
          title: data['title'],
          author: data['author'],
          duration: data['duration'],
          url: data['url'],
          emotionTags: List<String>.from(data['emotionTags']),
          likes: data['likes'],
          isPremium: data['isPremium'],
          createdAt: (data['createdAt'] as Timestamp).toDate(),
        );
      }).toList();
    });
  }
} 