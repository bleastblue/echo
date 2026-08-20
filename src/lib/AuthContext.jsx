import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';

import { appParams } from '@/lib/app-params';
import { db } from '@/api/base44Client';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);
  const [isLoadingPublicSettings, setIsLoadingPublicSettings] = useState(true);
  const [authError, setAuthError] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [appPublicSettings, setAppPublicSettings] = useState(null); // Contains only { id, public_settings }

  const checkUserAuth = useCallback(async () => {
    try {
      setIsLoadingAuth(true);
      setAuthError(null);

      const authenticated = await db.auth.isAuthenticated();
      if (!authenticated) {
        setIsAuthenticated(false);
        setUser(null);
        return;
      }

      const me = await db.auth.me();
      setUser(me);
      setIsAuthenticated(Boolean(me));
    } catch (error) {
      setIsAuthenticated(false);
      setUser(null);
      setAuthError({ type: 'auth_error', message: error?.message });
    } finally {
      setIsLoadingAuth(false);
      setAuthChecked(true);
    }
  }, []);

  const checkAppState = useCallback(async () => {
    try {
      setIsLoadingPublicSettings(true);
      setAuthError(null);

      // First, check app public settings (with token if available)
      setAppPublicSettings({ id: appParams.appId ?? null, public_settings: {} });
    } catch (error) {
      setAuthError({ type: 'app_settings_error', message: error?.message });
    } finally {
      setIsLoadingPublicSettings(false);
    }

    await checkUserAuth();
  }, [checkUserAuth]);

  useEffect(() => {
    checkAppState();
  }, [checkAppState]);

  const navigateToLogin = useCallback(() => {
    const returnTo = encodeURIComponent(window.location.pathname + window.location.search);
    window.location.href = `/login?returnTo=${returnTo}`;
  }, []);

  const value = {
    user,
    isAuthenticated,
    isLoadingAuth,
    isLoadingPublicSettings,
    authError,
    authChecked,
    appPublicSettings,
    checkUserAuth,
    navigateToLogin,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
