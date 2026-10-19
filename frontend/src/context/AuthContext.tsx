'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserRole = 'player' | 'partner';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  rank?: string;
  inGameName?: string;
  joinedAt?: string;
  phone?: string;
  collegeName?: string;
  regNumber?: string;
  currentYear?: string;
  branch?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (userData?: Partial<User>) => void;
  logout: () => void;
  updateUser: (updatedData: Partial<User>) => void;
}

const STORAGE_KEY = 'vss_esports_user';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize from localStorage on client mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setUser(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Failed to load user auth from localStorage', e);
    } finally {
      setIsLoading(false);
    }

    // Listen for storage changes across tabs
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) {
        if (e.newValue) {
          try {
            setUser(JSON.parse(e.newValue));
          } catch {
            setUser(null);
          }
        } else {
          setUser(null);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const login = (userData?: Partial<User>) => {
    const role: UserRole = userData?.role || 'player';
    const fallbackName = role === 'partner' ? 'Nexus Partner Org' : 'ShadowHunter';
    const resolvedName = userData?.name?.trim() || fallbackName;
    
    // Generate clean email if not provided
    const cleanHandle = resolvedName.toLowerCase().replace(/[^a-z0-9]/g, '');
    const fallbackEmail = `${cleanHandle || 'player'}@vssut.ac.in`;
    const resolvedEmail = userData?.email?.trim() || fallbackEmail;

    const newUser: User = {
      id: userData?.id || `usr_${Date.now().toString(36)}`,
      name: resolvedName,
      email: resolvedEmail,
      role: role,
      avatar: userData?.avatar,
      rank: userData?.rank,
      inGameName: userData?.inGameName || resolvedName,
      joinedAt: userData?.joinedAt || new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
    };

    setUser(newUser);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
    } catch (e) {
      console.error('Failed to save user auth to localStorage', e);
    }
  };

  const updateUser = (updatedData: Partial<User>) => {
    if (!user) return;
    const updated: User = {
      ...user,
      ...updatedData,
      name: updatedData.name?.trim() || user.name,
    };
    setUser(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to update user auth in localStorage', e);
    }
  };

  const logout = () => {
    setUser(null);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.error('Failed to remove user auth from localStorage', e);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
