import { apiService } from "./api";

interface User {
  id: string;
  email: string;
  password: string;
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
      const users = await apiService.get<User[]>("/users", {
        params: { email, password },
      });

      if (users.length === 1) {
        const user = users[0];
        const token = `mock-token-${user.id}`;
        localStorage.setItem("authToken", token);
        return { success: true, token, user };
      }

      throw new Error("Invalid credentials");
    } catch (error) {
      throw new Error("Login failed. Please check your email and password.");
    }
  },

  signup: async (formData: Record<string, any>): Promise<AuthResponse> => {
    try {
      const existingUsers = await apiService.get<User[]>("/users", {
        params: { email: formData.email },
      });

      if (existingUsers.length > 0) {
        throw new Error("Email already registered");
      }

      const newUser: User = {
        id: Date.now().toString(),
        email: formData.email,
        password: formData.password,
        name: formData.name,
        avatar: `https://i.pravatar.cc/150?u=${Date.now()}`,
      };

      await apiService.post<User>("/users", newUser);

      // Auto login after signup
      return await authService.login(formData.email, formData.password);
    } catch (error) {
      throw new Error("Signup failed. Please try again.");
    }
  },

  getCurrentUser: async (): Promise<User> => {
    const token = localStorage.getItem("authToken");
    console.log("token", token);
    if (!token) throw new Error("Not logged in");

    const userId = token.split("-").pop();
    if (!userId) throw new Error("Invalid token");

    try {
      return await apiService.get<User>(`/users/${userId}`);
    } catch {
      localStorage.removeItem("authToken");
      throw new Error("Session expired. Please log in again.");
    }
  },

  logout: async (): Promise<void> => {
    localStorage.removeItem("authToken");
  },

  updateProfile: async (userId: string, data: Partial<User>): Promise<User> => {
    return await apiService.put<User>(`/users/${userId}`, data);
  },
};
