import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { api, User, Profile } from '@/lib/api';

interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  isAdmin: boolean;
  loading: boolean;
  signUp: (email: string, password: string, name: string) => Promise<{ error: string | null }>;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  const isAdmin = user?.role === 'admin';

  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      fetchCurrentUser();
    } else {
      setLoading(false);
    }
  }, []);

  const fetchCurrentUser = async () => {
    const { data, error } = await api.auth.me();
    if (!error && data) {
      setUser(data);
      setProfile({ id: data.id, name: data.name, email: data.email });
    } else {
      localStorage.removeItem('auth_token');
    }
    setLoading(false);
  };

  const signUp = async (email: string, password: string, name: string) => {
    const { data, error } = await api.auth.register(email, password, name);
    
    if (error) {
      return { error };
    }
    
    if (data) {
      localStorage.setItem('auth_token', data.token);
      setUser(data.user);
      setProfile({ id: data.user.id, name: data.user.name, email: data.user.email });
    }
    
    return { error: null };
  };

  const signIn = async (email: string, password: string) => {
    const { data, error } = await api.auth.login(email, password);
    
    if (error) {
      return { error };
    }
    
    if (data) {
      localStorage.setItem('auth_token', data.token);
      setUser(data.user);
      setProfile({ id: data.user.id, name: data.user.name, email: data.user.email });
    }
    
    return { error: null };
  };

  const signOut = async () => {
    localStorage.removeItem('auth_token');
    setUser(null);
    setProfile(null);
  };

  return (
    <AuthContext.Provider value={{ user, profile, isAdmin, loading, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
