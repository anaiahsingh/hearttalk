import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  SafeAreaView,
  Image,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { authStyles as styles } from './AuthStyles';

export const SignUpScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { userName } = route.params;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require('../../assets/images/logo.png')}
        style={styles.logo}
      />
      <Text style={styles.tagline}>Everybody deserves a somebody</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email or phone number"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Create Account</Text>
      </TouchableOpacity>

      <View style={styles.socialContainer}>
        <TouchableOpacity style={styles.socialButton}>
          <Image 
            source={require('../../assets/images/facebook-icon.png')} 
            style={{ width: 20, height: 20 }}
          />
          <Text style={styles.socialButtonText}>Facebook</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          <Image 
            source={require('../../assets/images/twitter-icon.png')} 
            style={{ width: 20, height: 20 }}
          />
          <Text style={styles.socialButtonText}>Twitter</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.termsContainer}>
        <Text style={styles.termsText}>
          By signing up you agree to our Terms of Use and Privacy Policy
        </Text>
      </View>
    </SafeAreaView>
  );
}; 