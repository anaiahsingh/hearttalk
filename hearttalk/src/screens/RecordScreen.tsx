import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  SafeAreaView,
  Animated,
} from 'react-native';
import { Audio } from 'expo-av';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import { playlists } from '../constants/playlists';
import { ShareLink } from '../components/ShareLink';
import { RecordingTimer } from '../components/RecordingTimer';
import { useReferralTracking } from '../hooks/useReferralTracking';
import { AnimatedRecordButton } from '../components/recording/AnimatedRecordButton';
import { WaveformVisualizer } from '../components/recording/WaveformVisualizer';
import { FadeInUp, FadeOutDown } from 'react-native-reanimated';

export const RecordScreen = () => {
  const [step, setStep] = useState(1);
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [selectedPlaylist, setSelectedPlaylist] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const { referralCount, generateReferralLink } = useReferralTracking();

  const startRecording = async () => {
    try {
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );

      setRecording(recording);
      setIsRecording(true);
      setRecordingDuration(0);

      timerRef.current = setInterval(() => {
        setRecordingDuration(prev => {
          if (prev >= 120) { // 2 minutes limit
            stopRecording();
            return prev;
          }
          return prev + 1;
        });
      }, 1000);
    } catch (err) {
      Alert.alert('Error', 'Failed to start recording');
    }
  };

  const stopRecording = async () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    if (!recording) return;

    setIsRecording(false);
    await recording.stopAndUnloadAsync();
    setRecording(null);
  };

  const handleSubmit = async () => {
    if (!recording || !selectedPlaylist) return;

    try {
      const uri = recording.getURI();
      // Upload the recording to your backend
      // After successful upload:
      setStep(4); // Show referral screen
    } catch (err) {
      Alert.alert('Error', 'Failed to submit recording');
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.thankYouText}>Thank you for helping someone out!</Text>
            <TouchableOpacity 
              style={styles.nextButton}
              onPress={() => setStep(2)}
            >
              <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
          </View>
        );

      case 2:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.question}>Which playlist would be good for your audio?</Text>
            <Picker
              selectedValue={selectedPlaylist}
              onValueChange={value => setSelectedPlaylist(value)}
              style={styles.picker}
            >
              <Picker.Item label="Select a playlist" value="" />
              {playlists.map(playlist => (
                <Picker.Item 
                  key={playlist.id} 
                  label={playlist.name} 
                  value={playlist.id} 
                />
              ))}
            </Picker>
            {selectedPlaylist && (
              <TouchableOpacity 
                style={styles.nextButton}
                onPress={() => setStep(3)}
              >
                <Text style={styles.buttonText}>Next</Text>
              </TouchableOpacity>
            )}
          </View>
        );

      case 3:
        return renderRecordingStep();

      case 4:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.referralText}>
              Since you helped someone out, we want to return the favor! If you refer 10 people who you think could really benefit from this app, you'll get the premium features free for a MONTH!
            </Text>
            <Text style={styles.referralNote}>
              Note: They need to try out the app for at least a week
            </Text>
            <ShareLink onGenerate={generateReferralLink} />
            <Text style={styles.referralCount}>
              Current Referrals: {referralCount}/10
            </Text>
          </View>
        );
    }
  };

  const renderRecordingStep = () => {
    return (
      <View style={styles.stepContainer}>
        <Text style={styles.recordingText}>
          Awesome! You have two minutes to deliver a message. You got this :)
        </Text>
        <RecordingTimer duration={recordingDuration} />
        <WaveformVisualizer isRecording={isRecording} />
        <AnimatedRecordButton 
          isRecording={isRecording}
          onPress={isRecording ? stopRecording : startRecording}
        />
        {!isRecording && recordingDuration > 0 && (
          <Animated.View 
            entering={FadeInUp} 
            exiting={FadeOutDown}
          >
            <TouchableOpacity 
              style={styles.submitButton}
              onPress={handleSubmit}
            >
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
          </Animated.View>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {renderStep()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  stepContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  thankYouText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 32,
  },
  question: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 24,
  },
  picker: {
    width: '100%',
    marginBottom: 24,
  },
  recordingText: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 32,
  },
  recordButton: {
    backgroundColor: '#FF9999',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 30,
    marginTop: 24,
  },
  recordingActive: {
    backgroundColor: '#FF4444',
  },
  submitButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 30,
    marginTop: 16,
  },
  nextButton: {
    backgroundColor: '#FF9999',
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 25,
    marginTop: 24,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  referralText: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 24,
  },
  referralNote: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 32,
  },
  referralCount: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 24,
  },
}); 