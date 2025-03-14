import React, { createContext, useContext, useState, useEffect } from 'react';
import { PremiumStatus } from '../navigation/types';

interface PremiumContextType {
  premiumStatus: PremiumStatus;
  checkPremiumAccess: (contentId: string) => Promise<boolean>;
  refreshPremiumStatus: () => Promise<void>;
}

const PremiumContext = createContext<PremiumContextType | undefined>(undefined);

export const PremiumProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [premiumStatus, setPremiumStatus] = useState<PremiumStatus>({
    isSubscribed: false,
    subscriptionTier: 'free',
  });

  const checkPremiumAccess = async (contentId: string): Promise<boolean> => {
    if (premiumStatus.subscriptionTier === 'free') {
      // Check if the content is in free tier
      // This would typically involve an API call
      return false;
    }
    return true;
  };

  const refreshPremiumStatus = async (): Promise<void> => {
    try {
      // Fetch latest premium status from backend
      // Update premiumStatus state
    } catch (error) {
      console.error('Failed to refresh premium status:', error);
    }
  };

  useEffect(() => {
    refreshPremiumStatus();
  }, []);

  return (
    <PremiumContext.Provider 
      value={{ 
        premiumStatus, 
        checkPremiumAccess, 
        refreshPremiumStatus 
      }}
    >
      {children}
    </PremiumContext.Provider>
  );
};

export const usePremium = () => {
  const context = useContext(PremiumContext);
  if (context === undefined) {
    throw new Error('usePremium must be used within a PremiumProvider');
  }
  return context;
}; 