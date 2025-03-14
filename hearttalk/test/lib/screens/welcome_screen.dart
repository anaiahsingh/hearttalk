import 'package:flutter/material.dart';
import 'package:lottie/lottie.dart';
import 'package:shared_preferences.dart';
import 'signup_screen.dart';

class WelcomeScreen extends StatefulWidget {
  @override
  _WelcomeScreenState createState() => _WelcomeScreenState();
}

class _WelcomeScreenState extends State<WelcomeScreen> with TickerProviderStateMixin {
  late AnimationController _bearController;
  late AnimationController _envelopeController;
  String? userName;
  int _currentMessageIndex = 0;
  bool _showNameInput = false;
  final TextEditingController _nameController = TextEditingController();

  final List<String> _messages = [
    "Welcome to HeartTalk... uh..er.. sorry I completely forgot your name",
    "", // Will be replaced with personalized message
    "Life can be really crappy sometimes and it's so so isolating",
    "But there are people who want you to get better! That's why at HeartTalk we have bajillions of audio messages of support from people who are cheering you on",
    "Let's get you started!"
  ];

  @override
  void initState() {
    super.initState();
    _bearController = AnimationController(
      vsync: this,
      duration: Duration(seconds: 2),
    )..repeat(reverse: true);

    _envelopeController = AnimationController(
      vsync: this,
      duration: Duration(seconds: 3),
    );
  }

  void _handleNameSubmission() async {
    if (_nameController.text.isNotEmpty) {
      final prefs = await SharedPreferences.getInstance();
      await prefs.setString('user_name', _nameController.text);
      
      setState(() {
        userName = _nameController.text;
        _messages[1] = "Hey $userName! It's so nice to have you here";
        _showNameInput = false;
        _currentMessageIndex++;
      });
    }
  }

  void _nextMessage() {
    if (_currentMessageIndex < _messages.length - 1) {
      setState(() {
        _currentMessageIndex++;
      });
    } else {
      Navigator.pushReplacement(
        context,
        MaterialPageRoute(
          builder: (context) => SignupScreen(userName: userName ?? ''),
        ),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        decoration: BoxDecoration(
          gradient: LinearGradient(
            begin: Alignment.topCenter,
            end: Alignment.bottomCenter,
            colors: [
              Color(0xFFE8F3F3),  // Soft mint
              Color(0xFFFFF6E9),  // Warm cream
            ],
          ),
        ),
        child: SafeArea(
          child: Column(
            children: [
              Expanded(
                child: Stack(
                  children: [
                    // Bear Animation
                    Center(
                      child: Lottie.asset(
                        'assets/animations/bear.json',
                        controller: _bearController,
                        width: 300,
                        height: 300,
                      ),
                    ),
                    // Envelope Animation
                    if (_currentMessageIndex == 0)
                      Center(
                        child: Lottie.asset(
                          'assets/animations/envelope.json',
                          controller: _envelopeController,
                          width: 200,
                          height: 200,
                        ),
                      ),
                  ],
                ),
              ),
              Container(
                padding: EdgeInsets.all(20),
                child: Column(
                  children: [
                    Text(
                      _messages[_currentMessageIndex],
                      style: TextStyle(
                        fontSize: 24,
                        fontFamily: 'Poppins',
                        color: Color(0xFF4A4A4A),
                      ),
                      textAlign: TextAlign.center,
                    ),
                    SizedBox(height: 20),
                    if (_currentMessageIndex == 0 && _showNameInput)
                      TextField(
                        controller: _nameController,
                        decoration: InputDecoration(
                          hintText: 'Enter your name',
                          border: OutlineInputBorder(
                            borderRadius: BorderRadius.circular(15),
                          ),
                          filled: true,
                          fillColor: Colors.white,
                        ),
                        onSubmitted: (_) => _handleNameSubmission(),
                      ),
                    SizedBox(height: 20),
                    ElevatedButton(
                      onPressed: () {
                        if (_currentMessageIndex == 0 && userName == null) {
                          setState(() {
                            _showNameInput = true;
                          });
                        } else {
                          _nextMessage();
                        }
                      },
                      child: Text(
                        _currentMessageIndex == 0 && userName == null
                            ? "Tell me your name"
                            : "Continue",
                        style: TextStyle(fontSize: 18),
                      ),
                      style: ElevatedButton.styleFrom(
                        primary: Color(0xFF7B9E89),  // Sage green
                        padding: EdgeInsets.symmetric(horizontal: 40, vertical: 15),
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(25),
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  @override
  void dispose() {
    _bearController.dispose();
    _envelopeController.dispose();
    _nameController.dispose();
    super.dispose();
  }
} 