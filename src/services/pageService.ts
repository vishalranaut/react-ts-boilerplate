import { apiService } from './api';

// Types for form fields
export interface FormField {
  name: string;
  label: string;
  type: string;
  placeholder?: string;
  options?: { value: string; label: string }[];
  validation?: {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    pattern?: string;
    message?: string;
  };
}

// Interface for home page content
export interface HomePageContent {
  title: string;
  subtitle?: string;
  welcomeMessage: string;
  features?: {
    title: string;
    description: string;
    icon?: string;
  }[];
  heroImage?: string;
  callToAction?: {
    text: string;
    link: string;
  };
}

// Interface for auth pages (login/signup)
export interface AuthPageContent {
  title: string;
  subtitle?: string;
  formFields: FormField[];
  submitButtonText: string;
  alternateLink?: {
    text: string;
    link: string;
  };
  footerText?: string;
}

// Mock API service for page content
export const pageService = {
  // Get home page content
  getHomePageContent: async (): Promise<HomePageContent> => {
    // This would be a real API call in production
    // return apiService.get<HomePageContent>('/pages/home');
    
    // Mock implementation for demonstration
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          title: 'Welcome to DynamicApp',
          subtitle: 'A fully customizable web application',
          welcomeMessage: 'Experience the power of dynamic content rendering',
          features: [
            {
              title: 'Dynamic Forms',
              description: 'Forms that adapt to your needs, controlled by the backend',
              icon: 'layers'
            },
            {
              title: 'Custom Validation',
              description: 'Validation rules defined by the backend for maximum flexibility',
              icon: 'check-circle'
            },
            {
              title: 'Responsive Design',
              description: 'Looks great on any device, from mobile to desktop',
              icon: 'smartphone'
            },
            {
              title: 'Dark Theme',
              description: 'Easy on the eyes with a beautiful dark theme',
              icon: 'moon'
            }
          ],
          heroImage: 'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
          callToAction: {
            text: 'Get Started',
            link: '/signup'
          }
        });
      }, 500);
    });
  },

  // Get login page content
  getLoginPageContent: async (): Promise<AuthPageContent> => {
    // This would be a real API call in production
    // return apiService.get<AuthPageContent>('/pages/login');
    
    // Mock implementation for demonstration
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          title: 'Welcome Back',
          subtitle: 'Sign in to your account',
          formFields: [
            {
              name: 'email',
              label: 'Email Address',
              type: 'email',
              placeholder: 'Enter your email',
              validation: {
                required: true,
                pattern: '^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$',
                message: 'Please enter a valid email address'
              }
            },
            {
              name: 'password',
              label: 'Password',
              type: 'password',
              placeholder: 'Enter your password',
              validation: {
                required: true,
                minLength: 6,
                message: 'Password must be at least 6 characters'
              }
            },
            {
              name: 'rememberMe',
              label: 'Remember me',
              type: 'checkbox'
            }
          ],
          submitButtonText: 'Sign In',
          alternateLink: {
            text: 'Don\'t have an account? Sign up',
            link: '/signup'
          },
          footerText: 'By signing in, you agree to our Terms of Service and Privacy Policy'
        });
      }, 500);
    });
  },

  // Get signup page content
  getSignupPageContent: async (): Promise<AuthPageContent> => {
    // This would be a real API call in production
    // return apiService.get<AuthPageContent>('/pages/signup');
    
    // Mock implementation for demonstration
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          title: 'Create Account',
          subtitle: 'Join our community today',
          formFields: [
            {
              name: 'name',
              label: 'Full Name',
              type: 'text',
              placeholder: 'Enter your full name',
              validation: {
                required: true,
                minLength: 2,
                message: 'Please enter your full name'
              }
            },
            {
              name: 'email',
              label: 'Email Address',
              type: 'email',
              placeholder: 'Enter your email',
              validation: {
                required: true,
                pattern: '^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$',
                message: 'Please enter a valid email address'
              }
            },
            {
              name: 'password',
              label: 'Password',
              type: 'password',
              placeholder: 'Choose a password',
              validation: {
                required: true,
                minLength: 8,
                message: 'Password must be at least 8 characters'
              }
            },
            {
              name: 'confirmPassword',
              label: 'Confirm Password',
              type: 'password',
              placeholder: 'Confirm your password',
              validation: {
                required: true,
                message: 'Please confirm your password'
              }
            },
            {
              name: 'agreeTerms',
              label: 'I agree to the Terms of Service and Privacy Policy',
              type: 'checkbox',
              validation: {
                required: true,
                message: 'You must agree to the terms to continue'
              }
            }
          ],
          submitButtonText: 'Create Account',
          alternateLink: {
            text: 'Already have an account? Sign in',
            link: '/login'
          }
        });
      }, 500);
    });
  }
};