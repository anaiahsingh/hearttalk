import 'package:flutter/material.dart';
import 'package:flutter_animate/flutter_animate.dart';

class HeartButton extends StatefulWidget {
  final String audioId;
  final double size;

  const HeartButton({
    Key? key,
    required this.audioId,
    this.size = 24,
  }) : super(key: key);

  @override
  State<HeartButton> createState() => _HeartButtonState();
}

class _HeartButtonState extends State<HeartButton> {
  bool isFavorite = false;

  void _toggleFavorite() {
    setState(() {
      isFavorite = !isFavorite;
    });
    // TODO: Implement favorite toggle logic with backend
  }

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: _toggleFavorite,
      child: Icon(
        isFavorite ? Icons.favorite : Icons.favorite_border,
        size: widget.size,
        color: isFavorite ? Colors.red : Colors.grey,
      ).animate(
        target: isFavorite ? 1 : 0,
      ).scale(
        begin: 1,
        end: 1.2,
        duration: 150.ms,
      ),
    );
  }
} 