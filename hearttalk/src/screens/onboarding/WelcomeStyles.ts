import { StyleSheet, Dimensions } from 'react-native';
import { colors } from '../../theme/colors';

const { width, height } = Dimensions.get('window');

export const welcomeStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFE5E5', // Soft pink background
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  bearContainer: {
    width: width * 0.6,
    height: width * 0.6,
    marginBottom: 32,
  },
  messageContainer: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    width: '90%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  messageText: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
    fontFamily: 'Quicksand-Medium',
    lineHeight: 24,
  },
  input: {
    borderWidth: 0,
    borderBottomWidth: 2,
    borderBottomColor: '#FF9999',
    fontSize: 18,
    padding: 8,
    marginTop: 16,
    width: '80%',
    textAlign: 'center',
    fontFamily: 'Quicksand-Medium',
  },
  nextButton: {
    backgroundColor: '#FF9999',
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 25,
    marginTop: 24,
  },
  nextButtonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Quicksand-Bold',
  },
  envelopeContainer: {
    position: 'absolute',
    width: width * 0.4,
    height: width * 0.4,
  },
}); 