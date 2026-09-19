import type { User } from './report.types';

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  email: string;
  password?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

// Fallback to guarantee TypeScript treats this file as a module under --isolatedModules
export {};