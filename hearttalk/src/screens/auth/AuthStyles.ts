import { StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';

export const authStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFE5E5', // Matching welcome screen
    padding: 24,
    justifyContent: 'center',
  },
  logo: {
    width: 120,
    height: 120,
    alignSelf: 'center',
    marginBottom: 24,
  },
  tagline: {
    fontSize: 24,
    fontFamily: 'Quicksand-Bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 32,
  },
  title: {
    ...typography.header1,
    marginBottom: 32,
    color: colors.text.primary,
  },
  inputContainer: {
    gap: 16,
    marginBottom: 24,
  },
  input: {
    height: 48,
    borderBottomWidth: 1,
    borderBottomColor: '#000000',
    fontSize: 16,
    paddingVertical: 8,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    color: colors.text.secondary,
    fontSize: 14,
    marginTop: -8,
    marginBottom: 24,
  },
  button: {
    backgroundColor: '#FF9999',
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
    marginBottom: 24,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#000000',
    borderRadius: 20,
    gap: 8,
  },
  socialButtonText: {
    color: '#000000',
    fontSize: 14,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 4,
  },
  footerText: {
    color: colors.text.secondary,
    fontSize: 14,
  },
  footerLink: {
    color: colors.text.primary,
    fontSize: 14,
  },
  termsContainer: {
    position: 'absolute',
    bottom: 24,
    left: 24,
    right: 24,
    alignItems: 'center',
  },
  termsText: {
    fontSize: 12,
    color: colors.text.secondary,
    textAlign: 'center',
  },
}); 