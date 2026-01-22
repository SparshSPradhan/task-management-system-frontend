'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';
import { getAccessToken } from '../utils/token';
import * as authApi from '../api/auth';


interface RegisterData {
  email: string;
  password: string;
  name: string;
}


interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  // register: (email: string, password: string, name: string) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on mount
    const token = getAccessToken();
    if (token) {
      // Token exists, user is authenticated
      // In a real app, you might want to verify the token or fetch user data
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  }, []);

  const login = async (email: string, password: string) => {
    const response = await authApi.login({ email, password });
    setUser(response.user);
  };

  // const register = async (email: string, password: string, name: string) => {
  //   const response = await authApi.register({ email, password, name });
  //   setUser(response.user);
  // };

  const register = async ({ email, password, name }: RegisterData) => {
    const response = await authApi.register({ email, password, name });
    setUser(response.user);
  };
  

  const logout = async () => {
    await authApi.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user || !!getAccessToken(),
        isLoading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}