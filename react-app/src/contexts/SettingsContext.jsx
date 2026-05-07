import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../lib/api';

const SettingsContext = createContext(null);

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState({});
  const [loading, setLoading] = useState(true);

  const loadSettings = async () => {
    try {
      const response = await api.get('/settings/public');
      if (response.success) {
        setSettings(response.data);
      }
    } catch (error) {
      console.error('Failed to load site settings:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSettings();
  }, []);

  const value = {
    settings,
    loading,
    refreshSettings: loadSettings,
    // explicitly check for true, default to false while loading or if missing
    isPremiumEnabled: settings['premium.enabled'] === true,
  };

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
};
