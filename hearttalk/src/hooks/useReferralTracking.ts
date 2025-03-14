import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';
import { ReferralTracking } from '../navigation/types';
import { firebase } from '../config/firebase';

export const useReferralTracking = () => {
  const { user } = useAuth();
  const [referralCount, setReferralCount] = useState(0);

  useEffect(() => {
    if (!user) return;

    const unsubscribe = firebase
      .firestore()
      .collection('referrals')
      .doc(user.uid)
      .onSnapshot(doc => {
        if (doc.exists) {
          const data = doc.data() as ReferralTracking;
          const activeReferrals = data.referredUsers.filter(ref => {
            const daysSinceJoin = 
              (new Date().getTime() - ref.joinDate.getTime()) / (1000 * 60 * 60 * 24);
            return ref.isActiveUser && daysSinceJoin >= 7;
          });
          setReferralCount(activeReferrals.length);

          // If they reach 10 referrals, upgrade their account
          if (activeReferrals.length >= 10) {
            upgradeToPremium(user.uid);
          }
        }
      });

    return () => unsubscribe();
  }, [user]);

  const generateReferralLink = async () => {
    if (!user) return null;

    try {
      const link = await firebase.dynamicLinks().buildShortLink({
        link: `https://yourdomain.com/invite?referrer=${user.uid}`,
        domainUriPrefix: 'https://yourapp.page.link',
        android: {
          packageName: 'com.yourapp.android',
        },
        ios: {
          bundleId: 'com.yourapp.ios',
          appStoreId: 'your-app-store-id',
        },
      });

      return link;
    } catch (error) {
      console.error('Error generating referral link:', error);
      return null;
    }
  };

  const upgradeToPremium = async (userId: string) => {
    try {
      await firebase.firestore().collection('users').doc(userId).update({
        premiumStatus: {
          isSubscribed: true,
          subscriptionTier: 'premium',
          expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
        },
      });
    } catch (error) {
      console.error('Error upgrading to premium:', error);
    }
  };

  return {
    referralCount,
    generateReferralLink,
  };
}; 