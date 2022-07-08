import { createSlice } from "@reduxjs/toolkit";

import { practiceAnswers } from "../../constant";

const initialState = {
  isLoading: false,
  scenarios: null,
  mode: "tutorial",
  current: null,
  currentScenario: null,
  visualizeAction: [],
  practiceAnswers,
  isCorrect: null,
  error: null,
};

export const scenarioSlice = createSlice({
  name: "scenario",
  initialState,
  reducers: {
    getScenarios: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    getScenariosSuccess: (state, action) => {
      state.isLoading = false;
      state.scenarios = action.payload;
      state.currentScenario = action.payload.head;
      state.error = null;
    },
    getScenariosFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    updateCurrentScenario: (state, action) => {
      state.currentScenario = action.payload;
    },
    updateCurrent: (state, action) => {
      state.current = action.payload;
    },
    updateVisualizeAction: (state, action) => {
      state.visualizeAction.push(action.payload);
    },
    resetVisualizeAction: (state) => {
      state.visualizeAction = [];
    },
    updateMode: (state, action) => {
      state.mode = action.payload;
    },
    updateIsCorrect: (state, action) => {
      state.isCorrect = action.payload;
    },
  },
});

export const scenarioSliceActions = scenarioSlice.actions;
export default scenarioSlice.reducer;
