import { call, put, takeEvery } from "redux-saga/effects";

import { getScenariosAPI } from "../../apis";
import { scenarioSliceActions } from "../slices/scenarioSlice";

function* getScenariosSaga() {
  const { getScenariosSuccess, getScenariosFailure } = scenarioSliceActions;

  try {
    const scenarios = yield call(getScenariosAPI);

    yield put(getScenariosSuccess(scenarios));
  } catch (err) {
    yield put(getScenariosFailure(err));
  }
}

export function* watchGetScenarios() {
  yield takeEvery(scenarioSliceActions.getScenarios, getScenariosSaga);
}
