import { apiService } from './api';

interface LoginResponse {
  user: {
    id: string;
    email: string;
    name?: string;
  };
  token: string;
}

interface SignupResponse {
  user: {
    id: string;
    email: string;
    name?: string;
  };
  token: string;
}

// For demonstration, we'll mock the API calls to show how they would work
// In a real application, these would use the apiService to make real API calls
export const authService = {
  login: async (email: string, password: string): Promise<LoginResponse> => {
    // This would be a real API call in production
    // return apiService.post<LoginResponse>('/auth/login', { email, password });
    
    // Mock implementation for demonstration
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email === 'user@example.com' && password === 'password') {
          resolve({
            user: {
              id: '1',
              email: 'user@example.com',
              name: 'Demo User',
            },
            token: 'mock-jwt-token',
          });
        } else {
          reject({
            response: {
              data: {
                message: 'Invalid email or password',
              },
            },
          });
        }
      }, 1000);
    });
  },

  signup: async (formData: Record<string, any>): Promise<SignupResponse> => {
    // This would be a real API call in production
    // return apiService.post<SignupResponse>('/auth/signup', formData);
    
    // Mock implementation for demonstration
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (formData.email && formData.password) {
          resolve({
            user: {
              id: '1',
              email: formData.email,
              name: formData.name || 'New User',
            },
            token: 'mock-jwt-token',
          });
        } else {
          reject({
            response: {
              data: {
                message: 'Invalid signup data',
              },
            },
          });
        }
      }, 1000);
    });
  },

  getCurrentUser: async () => {
    // This would be a real API call in production
    // return apiService.get('/auth/me');
    
    // Mock implementation for demonstration
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: '1',
          email: 'user@example.com',
          name: 'Demo User',
        });
      }, 500);
    });
  },

  logout: async () => {
    // This would be a real API call in production
    // return apiService.post('/auth/logout');
    
    // Just clear the token on the client side for the demo
    localStorage.removeItem('authToken');
  },
};