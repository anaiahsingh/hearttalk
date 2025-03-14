import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  SafeAreaView,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { authStyles as styles } from './AuthStyles';

export const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Log in</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="hello@gmail.co"
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

      <TouchableOpacity>
        <Text style={styles.forgotPassword}>Forgot?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Log in</Text>
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

      <View style={styles.footer}>
        <Text style={styles.footerText}>Or sign up with email account</Text>
      </View>
    </SafeAreaView>
  );
}; 