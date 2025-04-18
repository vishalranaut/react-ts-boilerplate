import { takeLatest, put, call } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { authService } from '../../services/authService';
import {
  loginRequest,
  loginSuccess,
  loginFailure,
  signupRequest,
  signupSuccess,
  signupFailure,
} from '../reducers/authSlice';

function* handleLogin(action: ReturnType<typeof loginRequest>) {
  try {
    const { email, password } = action.payload;
    const response = yield call(authService.login, email, password);
    yield put(loginSuccess(response.user));
    toast.success('Login successful!');
  } catch (error: any) {
    const message = error.response?.data?.message || 'Login failed';
    yield put(loginFailure(message));
    toast.error(message);
  }
}

function* handleSignup(action: ReturnType<typeof signupRequest>) {
  try {
    const response = yield call(authService.signup, action.payload);
    yield put(signupSuccess(response.user));
    toast.success('Account created successfully!');
  } catch (error: any) {
    const message = error.response?.data?.message || 'Signup failed';
    yield put(signupFailure(message));
    toast.error(message);
  }
}

export function* watchAuth() {
  yield takeLatest(loginRequest.type, handleLogin);
  yield takeLatest(signupRequest.type, handleSignup);
}