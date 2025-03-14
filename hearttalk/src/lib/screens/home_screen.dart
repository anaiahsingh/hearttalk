import 'package:flutter/material.dart';
import 'package:flutter_animate/flutter_animate.dart';

class Emotion {
  final String id;
  final String label;
  final Color color;

  Emotion({required this.id, required this.label, required this.color});
}

class Audio {
  final String id;
  final String title;
  final String author;
  // Add other audio properties as needed

  Audio({required this.id, required this.title, required this.author});
}

class HomeScreen extends StatefulWidget {
  const HomeScreen({Key? key}) : super(key: key);

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  final List<Emotion> emotions = [
    Emotion(id: '1', label: 'Happy', color: Colors.yellow.shade600),
    Emotion(id: '2', label: 'Sad', color: Colors.blue.shade400),
    Emotion(id: '3', label: 'Anxious', color: Colors.purple.shade400),
    Emotion(id: '4', label: 'Calm', color: Colors.green.shade400),
    Emotion(id: '5', label: 'Excited', color: Colors.orange.shade400),
  ];

  final List<String> selectedEmotions = [];
  List<Audio> recommendedAudios = [];
  List<Audio> popularAudios = [];

  @override
  void initState() {
    super.initState();
    // Simulate fetching initial data
    _fetchPopularAudios();
  }

  void _fetchPopularAudios() {
    // Simulate API call
    popularAudios = [
      Audio(id: '1', title: 'Meditation Basics', author: 'Sarah Smith'),
      Audio(id: '2', title: 'Peaceful Sleep', author: 'John Doe'),
      Audio(id: '3', title: 'Morning Routine', author: 'Mike Johnson'),
    ];
    setState(() {});
  }

  void _handleEmotionSelect(String emotionId) {
    setState(() {
      if (selectedEmotions.contains(emotionId)) {
        selectedEmotions.remove(emotionId);
      } else if (selectedEmotions.length < 3) {
        selectedEmotions.add(emotionId);
      }
    });
  }

  Future<void> _fetchRecommendations() async {
    // Simulate API call
    setState(() {
      recommendedAudios = [
        Audio(id: '4', title: 'Calm Mind', author: 'Emma Wilson'),
        Audio(id: '5', title: 'Stress Relief', author: 'David Brown'),
        Audio(id: '6', title: 'Happy Vibes', author: 'Lisa Anderson'),
      ];
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(16),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                'Hello, there 👋',
                style: Theme.of(context).textTheme.headlineMedium?.copyWith(
                  fontWeight: FontWeight.bold,
                ),
              ).animate().fadeIn().slideX(),
              
              const SizedBox(height: 24),
              
              Text(
                'How are you feeling today?',
                style: Theme.of(context).textTheme.titleLarge,
              ).animate().fadeIn().slideX(delay: 200.ms),
              
              const SizedBox(height: 16),
              
              Wrap(
                spacing: 8,
                runSpacing: 8,
                children: emotions.map((emotion) {
                  final isSelected = selectedEmotions.contains(emotion.id);
                  return InkWell(
                    onTap: () => _handleEmotionSelect(emotion.id),
                    child: Container(
                      padding: const EdgeInsets.symmetric(
                        horizontal: 16,
                        vertical: 8,
                      ),
                      decoration: BoxDecoration(
                        color: emotion.color,
                        borderRadius: BorderRadius.circular(20),
                        border: isSelected
                            ? Border.all(color: Colors.black, width: 2)
                            : null,
                      ),
                      child: Text(
                        emotion.label,
                        style: const TextStyle(
                          color: Colors.white,
                          fontWeight: FontWeight.w500,
                        ),
                      ),
                    ),
                  ).animate().scale(delay: 300.ms);
                }).toList(),
              ),

              if (selectedEmotions.isNotEmpty) ...[
                const SizedBox(height: 16),
                ElevatedButton(
                  onPressed: _fetchRecommendations,
                  style: ElevatedButton.styleFrom(
                    backgroundColor: Colors.pink[100],
                    padding: const EdgeInsets.all(16),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(25),
                    ),
                  ),
                  child: const Center(
                    child: Text(
                      'Give me audio recommendations',
                      style: TextStyle(
                        color: Colors.white,
                        fontSize: 16,
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                  ),
                ).animate().fadeIn().scale(),
              ],

              if (recommendedAudios.isNotEmpty) ...[
                const SizedBox(height: 24),
                _buildSection(
                  'Recommended for You',
                  recommendedAudios,
                ),
              ],

              const SizedBox(height: 24),
              _buildSection(
                'Popular Audios',
                popularAudios,
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildSection(String title, List<Audio> audios) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          title,
          style: Theme.of(context).textTheme.titleLarge?.copyWith(
            fontWeight: FontWeight.w600,
          ),
        ).animate().fadeIn().slideX(),
        const SizedBox(height: 16),
        SizedBox(
          height: 180,
          child: ListView.builder(
            scrollDirection: Axis.horizontal,
            itemCount: audios.length,
            itemBuilder: (context, index) {
              final audio = audios[index];
              return Container(
                width: 160,
                margin: EdgeInsets.only(right: 16),
                decoration: BoxDecoration(
                  color: Colors.grey[200],
                  borderRadius: BorderRadius.circular(12),
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Container(
                      height: 100,
                      decoration: BoxDecoration(
                        color: Colors.grey[300],
                        borderRadius: const BorderRadius.vertical(
                          top: Radius.circular(12),
                        ),
                      ),
                      child: const Center(
                        child: Icon(Icons.music_note, size: 40),
                      ),
                    ),
                    Padding(
                      padding: const EdgeInsets.all(8.0),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            audio.title,
                            style: const TextStyle(
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                          Text(
                            audio.author,
                            style: TextStyle(
                              color: Colors.grey[600],
                              fontSize: 12,
                            ),
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
              ).animate().fadeIn().slideX();
            },
          ),
        ),
      ],
    );
  }
} 