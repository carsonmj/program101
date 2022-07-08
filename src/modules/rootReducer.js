import { combineReducers } from "redux";

import fileReducer from "./slices/fileSlice";
import scenarioReducer from "./slices/scenarioSlice";

const rootReducer = combineReducers({
  scenario: scenarioReducer,
  file: fileReducer,
});

export default rootReducer;
