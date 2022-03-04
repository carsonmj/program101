import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  scenarios: null,
  currentScenario: null,
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
  },
});

export const scenarioSliceActions = scenarioSlice.actions;
export default scenarioSlice.reducer;
