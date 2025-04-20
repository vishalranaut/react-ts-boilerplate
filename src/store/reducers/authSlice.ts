import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the User interface
interface User {
  id: string;
  email: string;
  name?: string;
  avatar?: string;
}

// Define the Auth state
interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

// Hydrate state from localStorage
const storedUser = localStorage.getItem("user");
const parsedUser: User | null = storedUser ? JSON.parse(storedUser) : null;

const initialState: AuthState = {
  user: parsedUser,
  isAuthenticated: !!parsedUser,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Login
    loginRequest: (
      state,
      action: PayloadAction<{ email: string; password: string }>
    ) => {
      state.isLoading = true;
      state.error = null;
    },
    loginSuccess: (state, action: PayloadAction<User>) => {
      const user = action.payload;
      localStorage.setItem("user", JSON.stringify(user));
      state.user = user;
      state.isAuthenticated = true;
      state.isLoading = false;
      state.error = null;
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    // Signup
    signupRequest: (state, action: PayloadAction<Record<string, any>>) => {
      state.isLoading = true;
      state.error = null;
    },
    signupSuccess: (state, action: PayloadAction<User>) => {
      const user = action.payload;
      localStorage.setItem("user", JSON.stringify(user));
      state.user = user;
      state.isAuthenticated = true;
      state.isLoading = false;
      state.error = null;
    },
    signupFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    // Logout
    logout: (state) => {
      localStorage.removeItem("user");
      localStorage.removeItem("authToken");
      state.user = null;
      state.isAuthenticated = false;
      state.isLoading = false;
      state.error = null;
    },

    // Fetch user profile
    fetchUserProfileRequest: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchUserProfileSuccess: (state, action: PayloadAction<User>) => {
      const user = action.payload;
      localStorage.setItem("user", JSON.stringify(user)); // keep localStorage in sync
      state.user = user;
      state.isAuthenticated = true;
      state.isLoading = false;
    },
    fetchUserProfileFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

// Export actions
export const {
  loginRequest,
  loginSuccess,
  loginFailure,
  signupRequest,
  signupSuccess,
  signupFailure,
  logout,
  fetchUserProfileRequest,
  fetchUserProfileSuccess,
  fetchUserProfileFailure,
} = authSlice.actions;

// Export reducer
export default authSlice.reducer;
