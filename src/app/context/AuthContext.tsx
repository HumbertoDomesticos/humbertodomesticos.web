'use client';

import { createContext, useContext, type ReactNode, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import type { Usuario } from '@/services/routes/usuarios/page';
import axios from 'axios';

interface AuthContextType {
  user: Usuario | null;
  login: (email: string, senha: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<Usuario | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser) as Usuario;
        setUser(parsedUser);
      } catch (e) {
        console.error('Erro ao fazer parse do usuário:', e);
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, senha: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post<Usuario>(
        'http://127.0.0.1:8000/usuarios/login',
        {
          email_usuario: email,
          senha_usuario: senha
        },
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );

      if (response.data) {
        const userData = response.data;
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        router.push('/');
      } else {
        throw new Error('Credenciais inválidas');
      }

    } catch (error) {
      setError('Credenciais inválidas');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setError(null);
    router.push('/login');
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated,
        loading,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};