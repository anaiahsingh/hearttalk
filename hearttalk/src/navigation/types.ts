export type RootStackParamList = {
  Welcome: undefined;
  SignUp: {
    userName: string;
  };
  Home: undefined;
  Playlists: undefined;
  Record: undefined;
  Settings: undefined;
  PlaylistDetails: {
    playlistId: string;
    playlistName: string;
  };
  AudioPlayer: {
    audioId: string;
    isPremium: boolean;
  };
};

export type TabParamList = {
  Home: undefined;
  Record: undefined;
  Library: undefined;
  Profile: undefined;
};

export interface AudioContent {
  id: string;
  title: string;
  description: string;
  duration: number;
  isPremium: boolean;
  category: string;
  thumbnailUrl: string;
  authorId: string;
  createdAt: string;
}

export interface PremiumStatus {
  isSubscribed: boolean;
  subscriptionTier: 'free' | 'premium' | 'premium_plus';
  expiryDate?: string;
}

export interface Emotion {
  id: string;
  label: string;
  color: string;
}

export interface Audio {
  id: string;
  title: string;
  duration: number;
  url: string;
  emotionTags: string[];
  likes: number;
  isPremium: boolean;
  createdAt: firebase.firestore.Timestamp;
}

export interface Playlist {
  id: string;
  name: string;
  description: string;
  emotionTags: string[];
  coverImage: string;
  audioCount: number;
}

export interface ReferralTracking {
  referrerId: string;
  referredUsers: Array<{
    userId: string;
    joinDate: Date;
    lastActiveDate: Date;
    isActiveUser: boolean;
  }>;
} 