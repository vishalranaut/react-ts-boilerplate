import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HomePageContent, AuthPageContent } from '../../services/pageService';

interface PageState {
  home: HomePageContent | null;
  login: AuthPageContent | null;
  signup: AuthPageContent | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: PageState = {
  home: null,
  login: null,
  signup: null,
  isLoading: false,
  error: null,
};

const pageSlice = createSlice({
  name: 'page',
  initialState,
  reducers: {
    fetchHomePageRequest: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchHomePageSuccess: (state, action: PayloadAction<HomePageContent>) => {
      state.isLoading = false;
      state.home = action.payload;
      state.error = null;
    },
    fetchHomePageFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    fetchLoginPageRequest: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchLoginPageSuccess: (state, action: PayloadAction<AuthPageContent>) => {
      state.isLoading = false;
      state.login = action.payload;
      state.error = null;
    },
    fetchLoginPageFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    fetchSignupPageRequest: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchSignupPageSuccess: (state, action: PayloadAction<AuthPageContent>) => {
      state.isLoading = false;
      state.signup = action.payload;
      state.error = null;
    },
    fetchSignupPageFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchHomePageRequest,
  fetchHomePageSuccess,
  fetchHomePageFailure,
  fetchLoginPageRequest,
  fetchLoginPageSuccess,
  fetchLoginPageFailure,
  fetchSignupPageRequest,
  fetchSignupPageSuccess,
  fetchSignupPageFailure,
} = pageSlice.actions;

export default pageSlice.reducer;