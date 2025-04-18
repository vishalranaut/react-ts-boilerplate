import { takeLatest, put, call } from 'redux-saga/effects';
import { pageService } from '../../services/pageService';
import {
  fetchHomePageRequest,
  fetchHomePageSuccess,
  fetchHomePageFailure,
  fetchLoginPageRequest,
  fetchLoginPageSuccess,
  fetchLoginPageFailure,
  fetchSignupPageRequest,
  fetchSignupPageSuccess,
  fetchSignupPageFailure,
} from '../reducers/pageSlice';

function* handleFetchHomePage() {
  try {
    const content = yield call(pageService.getHomePageContent);
    yield put(fetchHomePageSuccess(content));
  } catch (error: any) {
    const message = error.response?.data?.message || 'Failed to load home page';
    yield put(fetchHomePageFailure(message));
  }
}

function* handleFetchLoginPage() {
  try {
    const content = yield call(pageService.getLoginPageContent);
    yield put(fetchLoginPageSuccess(content));
  } catch (error: any) {
    const message = error.response?.data?.message || 'Failed to load login page';
    yield put(fetchLoginPageFailure(message));
  }
}

function* handleFetchSignupPage() {
  try {
    const content = yield call(pageService.getSignupPageContent);
    yield put(fetchSignupPageSuccess(content));
  } catch (error: any) {
    const message = error.response?.data?.message || 'Failed to load signup page';
    yield put(fetchSignupPageFailure(message));
  }
}

export function* watchPage() {
  yield takeLatest(fetchHomePageRequest.type, handleFetchHomePage);
  yield takeLatest(fetchLoginPageRequest.type, handleFetchLoginPage);
  yield takeLatest(fetchSignupPageRequest.type, handleFetchSignupPage);
}