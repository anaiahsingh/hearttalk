import React from 'react';
import { TouchableOpacity, Text, Share, StyleSheet } from 'react-native';

interface ShareLinkProps {
  onGenerate: () => Promise<string | null>;
}

export const ShareLink: React.FC<ShareLinkProps> = ({ onGenerate }) => {
  const handleShare = async () => {
    const link = await onGenerate();
    if (!link) return;

    try {
      await Share.share({
        message: 
          "Join me on HeartTalk - a supportive community where you can find comfort and encouragement through audio messages. Use my invite link:",
        url: link,
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  return (
    <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
      <Text style={styles.shareText}>Share Invite Link</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  shareButton: {
    backgroundColor: '#4267B2',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 20,
  },
  shareText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
}); 