import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../lib/api';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  const openLoginModal = () => setIsLoginModalOpen(true);
  const closeLoginModal = () => setIsLoginModalOpen(false);

  const checkAuth = async () => {
    try {
      const token = api.getToken();
      if (token) {
        const response = await api.getMe();
        if (response.success && response.data?.user) {
          setUser(response.data.user);
          setIsAuthenticated(true);
        }
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      api.setToken(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await api.login({ email, password });
      if (response.success && response.data?.user) {
        setUser(response.data.user);
        setIsAuthenticated(true);
        closeLoginModal();
        return { success: true };
      }
      return { success: false, message: response.message || 'Giriş başarısız' };
    } catch (error) {
      return { success: false, message: error.message || 'Giriş başarısız' };
    }
  };

  const register = async (userData) => {
    try {
      const response = await api.register(userData);
      if (response.success && response.data?.user) {
        setUser(response.data.user);
        setIsAuthenticated(true);
        if (response.data?.tokens?.accessToken) {
          api.setToken(response.data.tokens.accessToken);
        }
        closeLoginModal();
        return { success: true };
      }
      return { success: false, message: response.message || 'Kayıt başarısız' };
    } catch (error) {
      return { success: false, message: error.message || 'Kayıt başarısız' };
    }
  };

  const logout = async () => {
    try {
      await api.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setUser(null);
      setIsAuthenticated(false);
      api.setToken(null);
    }
  };

  const value = {
    user,
    loading,
    isAuthenticated,
    isAdmin: user?.role === 'ADMIN',
    isModerator: user?.role === 'MODERATOR' || user?.role === 'ADMIN',
    isLoginModalOpen,
    openLoginModal,
    closeLoginModal,
    login,
    register,
    logout,
    checkAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
