import { apiService } from './api';

interface User {
  id: string;
  email: string;
  name?: string;
  avatar?: string;
}

interface AuthResponse {
  success: boolean;
  token: string;
  user: User;
}

export const authService = {
  login: async (email: string, password: string): Promise<AuthResponse> => {
    try {
      // First check if user exists
      const users = await apiService.get<User[]>('/users', {
        params: { email, password }
      });

      if (users.length === 0) {
        throw new Error('Invalid credentials');
      }

      // Get auth token
      const response = await apiService.post<AuthResponse>('/auth/login', {
        email,
        password
      });

      if (response.success && response.token) {
        localStorage.setItem('authToken', response.token);
        return response;
      }

      throw new Error('Authentication failed');
    } catch (error) {
      throw new Error('Invalid credentials');
    }
  },

  signup: async (formData: Record<string, any>): Promise<AuthResponse> => {
    try {
      // Check if user already exists
      const existingUsers = await apiService.get<User[]>('/users', {
        params: { email: formData.email }
      });

      if (existingUsers.length > 0) {
        throw new Error('Email already registered');
      }

      // Create new user
      const newUser = await apiService.post<User>('/users', {
        id: Date.now().toString(),
        email: formData.email,
        password: formData.password,
        name: formData.name,
        avatar: `https://i.pravatar.cc/150?u=${Date.now()}`
      });

      // Get auth token
      const response = await apiService.post<AuthResponse>('/auth/login', {
        email: formData.email,
        password: formData.password
      });

      if (response.success && response.token) {
        localStorage.setItem('authToken', response.token);
        return response;
      }

      throw new Error('Registration failed');
    } catch (error) {
      throw error;
    }
  },

  getCurrentUser: async (): Promise<User> => {
    const token = localStorage.getItem('authToken');
    if (!token) throw new Error('No token found');

    try {
      const response = await apiService.get<User>('/auth/me');
      return response;
    } catch (error) {
      localStorage.removeItem('authToken');
      throw new Error('Session expired');
    }
  },

  logout: async (): Promise<void> => {
    try {
      await apiService.post('/auth/logout');
    } finally {
      localStorage.removeItem('authToken');
    }
  },

  updateProfile: async (userId: string, data: Partial<User>): Promise<User> => {
    return apiService.put<User>(`/users/${userId}`, data);
  }
};