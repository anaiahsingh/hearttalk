import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Animated,
  Image,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { welcomeStyles as styles } from './WelcomeStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';

const messages = [
  "Welcome to HeartTalk... uh..er.. sorry I completely forgot your name",
  "Hey {name}! It's so nice to have you here!",
  "Life can be really crappy sometimes and it's so so isolating",
  "But there are people who want you to get better! That's why at HeartTalk we have bajillions of audio messages of support from people who are cheering you on",
  "Let's get you started!"
];

export const WelcomeScreen = () => {
  const navigation = useNavigation();
  const [currentStep, setCurrentStep] = useState(0);
  const [userName, setUserName] = useState('');
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const bearAnim = useRef(new Animated.Value(0)).current;
  const envelopeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Initial bear animation
    Animated.spring(bearAnim, {
      toValue: 1,
      tension: 40,
      friction: 7,
      useNativeDriver: true,
    }).start();

    // Envelope animation
    Animated.sequence([
      Animated.delay(1000),
      Animated.spring(envelopeAnim, {
        toValue: 1,
        tension: 40,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const animateNextMessage = () => {
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleNext = async () => {
    if (currentStep === 0 && !userName.trim()) {
      return;
    }

    if (currentStep === 0) {
      await AsyncStorage.setItem('userName', userName);
    }

    if (currentStep === messages.length - 1) {
      navigation.navigate('SignUp', { userName });
      return;
    }

    animateNextMessage();
    setCurrentStep(prev => prev + 1);
  };

  const getCurrentMessage = () => {
    let message = messages[currentStep];
    if (currentStep > 0) {
      message = message.replace('{name}', userName);
    }
    return message;
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.content}>
        <Animated.View
          style={[
            styles.bearContainer,
            {
              transform: [
                { scale: bearAnim },
                {
                  rotate: bearAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['-10deg', '0deg'],
                  }),
                },
              ],
            },
          ]}
        >
          <Image
            source={require('../../assets/images/bear-plushie.png')}
            style={{ width: '100%', height: '100%' }}
            resizeMode="contain"
          />
        </Animated.View>

        <Animated.View
          style={[
            styles.messageContainer,
            { opacity: fadeAnim },
          ]}
        >
          <Text style={styles.messageText}>{getCurrentMessage()}</Text>
          {currentStep === 0 && (
            <TextInput
              style={styles.input}
              placeholder="Type your name here"
              value={userName}
              onChangeText={setUserName}
              autoFocus
              maxLength={20}
            />
          )}
        </Animated.View>

        <TouchableOpacity
          style={styles.nextButton}
          onPress={handleNext}
        >
          <Text style={styles.nextButtonText}>
            {currentStep === messages.length - 1 ? "Let's Go!" : "Next"}
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}; 