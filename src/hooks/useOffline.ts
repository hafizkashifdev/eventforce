'use client';

import { useState, useEffect } from 'react';

interface UseOfflineReturn {
  isOffline: boolean;
  isOnline: boolean;
  retry: () => void;
}

export const useOffline = (): UseOfflineReturn => {
  const [isOffline, setIsOffline] = useState(false);
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    // Check if we're in the browser
    if (typeof window === 'undefined') return;

    // Set initial state
    setIsOffline(!navigator.onLine);
    setIsOnline(navigator.onLine);

    const handleOnline = () => {
      setIsOffline(false);
      setIsOnline(true);
    };

    const handleOffline = () => {
      setIsOffline(true);
      setIsOnline(false);
    };

    // Add event listeners
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Cleanup
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const retry = () => {
    if (typeof window !== 'undefined' && navigator.onLine) {
      window.location.reload();
    }
  };

  return {
    isOffline,
    isOnline,
    retry
  };
};
