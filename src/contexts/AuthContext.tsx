import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'user' | 'creator' | 'admin';
  joinDate: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored auth token and validate
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('auth_token');
        if (token) {
          // Mock user data - replace with actual auth
          setUser({
            id: '1',
            name: 'Sarah Chen',
            email: 'sarah@example.com',
            avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
            role: 'creator',
            joinDate: '2024-01-01'
          });
        }
      } catch (error) {
        console.error('Auth check failed:', error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    // Mock login - replace with actual auth
    setUser({
      id: '1',
      name: 'Sarah Chen',
      email,
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
      role: 'creator',
      joinDate: '2024-01-01'
    });
    localStorage.setItem('auth_token', 'mock_token');
  };

  const logout = async () => {
    setUser(null);
    localStorage.removeItem('auth_token');
  };

  const register = async (email: string, password: string, name: string) => {
    // Mock registration - replace with actual auth
    setUser({
      id: Date.now().toString(),
      name,
      email,
      role: 'user',
      joinDate: new Date().toISOString().split('T')[0]
    });
    localStorage.setItem('auth_token', 'mock_token');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, register }}>
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