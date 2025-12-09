'use client';

import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { AuthState, AuthContextType, LoginCredentials, RegisterCredentials } from '@/types/auth';

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
};

type AuthAction =
  | { type: 'AUTH_START' }
  | { type: 'AUTH_SUCCESS'; payload: { user: any; accessToken: string; refreshToken: string } }
  | { type: 'AUTH_FAILURE'; payload: string }
  | { type: 'AUTH_LOGOUT' }
  | { type: 'CLEAR_ERROR' }
  | { type: 'SET_LOADING'; payload: boolean };

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'AUTH_START':
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case 'AUTH_SUCCESS':
      return {
        ...state,
        user: action.payload.user,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      };
    case 'AUTH_FAILURE':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: action.payload,
      };
    case 'AUTH_LOGOUT':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      };
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null,
      };
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      };
    default:
      return state;
  }
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

// Static mock users for demo
const MOCK_USERS = [
  { id: '1', email: 'admin@eventforce.com', name: 'Admin User', role: 'ADMIN' },
  { id: '2', email: 'staff@eventforce.com', name: 'Staff User', role: 'STAFF' },
  { id: '3', email: 'customer@example.com', name: 'Customer User', role: 'CUSTOMER' },
];

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Initialize auth state on mount
  useEffect(() => {
    const initializeAuth = () => {
      try {
        dispatch({ type: 'SET_LOADING', payload: true });
        
        if (typeof window !== 'undefined') {
          const storedUser = localStorage.getItem('user');
          const storedToken = localStorage.getItem('accessToken');
          
          if (storedUser && storedToken) {
            const user = JSON.parse(storedUser);
            dispatch({
              type: 'AUTH_SUCCESS',
              payload: {
                user,
                accessToken: storedToken,
                refreshToken: localStorage.getItem('refreshToken') || '',
              },
            });
          } else {
            dispatch({ type: 'AUTH_LOGOUT' });
          }
        }
      } catch (error) {
        console.error('Auth initialization failed:', error);
        dispatch({ type: 'AUTH_LOGOUT' });
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    };

    initializeAuth();
  }, []);

  const login = async (credentials: LoginCredentials): Promise<void> => {
    try {
      dispatch({ type: 'AUTH_START' });
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Find user in mock data or create new one
      let user = MOCK_USERS.find(u => u.email === credentials.email);
      
      if (!user) {
        // For demo: allow any email/password
        user = {
          id: Date.now().toString(),
          email: credentials.email,
          name: credentials.email.split('@')[0],
          role: 'CUSTOMER',
        };
      }
      
      const accessToken = `mock_token_${Date.now()}`;
      const refreshToken = `mock_refresh_${Date.now()}`;
      
      if (typeof window !== 'undefined') {
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
      }
      
      dispatch({
        type: 'AUTH_SUCCESS',
        payload: {
          user,
          accessToken,
          refreshToken,
        },
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Login failed';
      dispatch({ type: 'AUTH_FAILURE', payload: errorMessage });
      throw error;
    }
  };

  const register = async (credentials: RegisterCredentials): Promise<void> => {
    try {
      dispatch({ type: 'AUTH_START' });
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Create new user
      const user = {
        id: Date.now().toString(),
        email: credentials.email,
        name: credentials.name || credentials.email.split('@')[0],
        role: 'CUSTOMER',
      };
      
      const accessToken = `mock_token_${Date.now()}`;
      const refreshToken = `mock_refresh_${Date.now()}`;
      
      if (typeof window !== 'undefined') {
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
      }
      
      dispatch({
        type: 'AUTH_SUCCESS',
        payload: {
          user,
          accessToken,
          refreshToken,
        },
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Registration failed';
      dispatch({ type: 'AUTH_FAILURE', payload: errorMessage });
      throw error;
    }
  };

  const logout = async (): Promise<void> => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('user');
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    }
    dispatch({ type: 'AUTH_LOGOUT' });
  };

  const refreshToken = async (): Promise<void> => {
    // Static implementation - just return current token
    const storedUser = typeof window !== 'undefined' ? localStorage.getItem('user') : null;
    const storedToken = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
    
    if (storedUser && storedToken) {
      const user = JSON.parse(storedUser);
      dispatch({
        type: 'AUTH_SUCCESS',
        payload: {
          user,
          accessToken: storedToken,
          refreshToken: typeof window !== 'undefined' ? localStorage.getItem('refreshToken') || '' : '',
        },
      });
    } else {
      dispatch({ type: 'AUTH_LOGOUT' });
    }
  };

  const forgotPassword = async (email: string): Promise<void> => {
    // Static implementation - just simulate success
    await new Promise(resolve => setTimeout(resolve, 500));
    console.log('Password reset email sent to:', email);
  };

  const resetPassword = async (token: string, newPassword: string): Promise<void> => {
    // Static implementation - just simulate success
    await new Promise(resolve => setTimeout(resolve, 500));
    console.log('Password reset successful');
  };

  const clearError = (): void => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  const value: AuthContextType = {
    ...state,
    login,
    register,
    logout,
    refreshToken,
    forgotPassword,
    resetPassword,
    clearError,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
