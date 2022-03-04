import { call, put, takeEvery } from "redux-saga/effects";

import { getFilesAPI } from "../../apis";
import { fileSliceActions } from "../slices/fileSlice";

function* getFilesSaga() {
  const { getFilesSuccess, getFilesFailure } = fileSliceActions;

  try {
    const fileTree = yield call(getFilesAPI);

    yield put(getFilesSuccess(fileTree));
  } catch (err) {
    yield put(getFilesFailure(err));
  }
}

export function* watchGetFiles() {
  yield takeEvery(fileSliceActions.getFiles, getFilesSaga);
}
