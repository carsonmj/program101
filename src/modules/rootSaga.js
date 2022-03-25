import { all, fork } from "redux-saga/effects";

import { watchGetScenarios } from "./sagas/scenario";
import { watchGetFiles } from "./sagas/file";

export default function* rootSaga() {
  yield all([fork(watchGetScenarios), fork(watchGetFiles)]);
}
