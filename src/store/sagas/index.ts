import { all } from 'redux-saga/effects';
import { watchAuth } from './authSaga';
import { watchPage } from './pageSaga';

export default function* rootSaga() {
  yield all([
    watchAuth(),
    watchPage(),
  ]);
}