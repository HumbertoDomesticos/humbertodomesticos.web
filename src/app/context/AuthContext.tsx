// context/AuthContext.tsx
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

// Função para validar a estrutura do usuário
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const isValidUser = (data: any) => {
  return data &&
    typeof data.email_usuario === 'string' &&
    typeof data.senha_usuario === 'string';
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<Usuario | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          if (isValidUser(parsedUser)) {
            setUser(parsedUser);
            console.log("Usuário carregado:", parsedUser);
          } else {
            console.warn("Dados inválidos no localStorage, limpando...");
            localStorage.removeItem('user');
          }
        }
      } catch (error) {
        console.error('Erro ao carregar usuário:', error);
        localStorage.removeItem('user');
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const login = async (email: string, senha: string) => {
    setLoading(true);
    setError(null);

    try {
      console.log("Tentando login com:", { email, senha });

      const response = await axios.post(
        'http://127.0.0.1:8000/usuarios/auth',
        {
          email_usuario: email, // Use o nome exato que a API espera
          senha_usuario: senha
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const userData = response.data;

    if (response.data === true) {
      // Salva o email no localStorage
      localStorage.setItem('userEmail', email);
      setUser({ email_usuario: email } as Usuario); // cria um "stub" mínimo
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
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      isAuthenticated,
      loading,
      error
    }}>
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