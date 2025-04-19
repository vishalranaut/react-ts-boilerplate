import { takeLatest, put, call } from "redux-saga/effects";
import { toast } from "react-toastify";
import { authService } from "../../services/authService";
import {
  loginRequest,
  loginSuccess,
  loginFailure,
  signupRequest,
  signupSuccess,
  signupFailure,
} from "../reducers/authSlice";
import { PayloadAction } from "@reduxjs/toolkit";

function* handleLogin(
  action: PayloadAction<{ email: string; password: string }>
): Generator<any, void, any> {
  try {
    const { email, password } = action.payload;
    const response = yield call(authService.login, email, password);
    yield put(loginSuccess(response.user));
    toast.success("Login successful!");
  } catch (error: any) {
    const message = error.response?.data?.message || "Login failed";
    yield put(loginFailure(message));
    toast.error(message);
  }
}

function* handleSignup(
  action: PayloadAction<{ name: string; email: string; password: string }>
): Generator<any, void, any> {
  try {
    const response = yield call(authService.signup, action.payload);
    yield put(signupSuccess(response.user));
    toast.success("Account created successfully!");
  } catch (error: any) {
    const message = error.response?.data?.message || "Signup failed";
    yield put(signupFailure(message));
    toast.error(message);
  }
}

export function* watchAuth(): Generator {
  yield takeLatest(loginRequest.type, handleLogin);
  yield takeLatest(signupRequest.type, handleSignup);
}
