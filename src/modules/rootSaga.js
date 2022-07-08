import { all, fork } from "redux-saga/effects";

import { watchGetFiles } from "./sagas/file";
import { watchGetScenarios } from "./sagas/scenario";

export default function* rootSaga() {
  yield all([fork(watchGetScenarios), fork(watchGetFiles)]);
}
