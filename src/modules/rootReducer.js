import { combineReducers } from "redux";

import scenarioReducer from "./slices/scenarioSlice";
import fileReducer from "./slices/fileSlice";

const rootReducer = combineReducers({
  scenario: scenarioReducer,
  file: fileReducer,
});

export default rootReducer;
