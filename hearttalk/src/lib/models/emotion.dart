import 'package:flutter/material.dart';

class Emotion {
  final String id;
  final String label;
  final Color color;

  Emotion({
    required this.id,
    required this.label,
    required this.color,
  });
}

final List<Emotion> emotions = [
  Emotion(id: 'sad', label: 'Sad', color: const Color(0xFF6B7FD7)),
  Emotion(id: 'disappointed', label: 'Disappointed', color: const Color(0xFF8E6B8E)),
  Emotion(id: 'angry', label: 'Angry', color: const Color(0xFFD75A5A)),
  Emotion(id: 'lonely', label: 'Lonely', color: const Color(0xFF7B8B9A)),
  // Add more emotions...
];

Map<String, List<String>> emotionCategories = {
  'core': ['sad', 'disappointed', 'angry', 'lonely', 'unmotivated', 'anxious'],
  'mentalHealth': ['overwhelmed', 'stressed', 'exhausted'],
  'selfPerception': ['insecure', 'inadequate', 'lost'],
  // Add more categories...
}; 