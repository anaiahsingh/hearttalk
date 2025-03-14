class Audio {
  final String id;
  final String title;
  final String author;
  final int duration;
  final String url;
  final List<String> emotionTags;
  final int likes;
  final bool isPremium;
  final DateTime createdAt;

  Audio({
    required this.id,
    required this.title,
    required this.author,
    required this.duration,
    required this.url,
    required this.emotionTags,
    required this.likes,
    required this.isPremium,
    required this.createdAt,
  });
} 