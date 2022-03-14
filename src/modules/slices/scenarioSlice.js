import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  scenarios: null,
  mode: "tutorial",
  current: null,
  currentScenario: null,
  visualizeAction: [],
  practiceAnswers: [
    { id: "pa0001", text: "counter" },
    { id: "pa0002", text: "counter: counterReducer" },
    { id: "pa0003", text: "dispatch" },
    { id: "pa0004", text: "value = 1" },
    { id: "pa0005", text: "createStore" },
    { id: "pa0013", text: "increment" },
    { id: "pa0006", text: "state.value += action.payload;" },
    { id: "pa0007", text: "state.value += 1;" },
    { id: "pa0008", text: "action.type" },
    { id: "pa0009", text: "decrement" },
    { id: "pa0010", text: "state.value -= 1;" },
    { id: "pa0011", text: "reducers" },
    { id: "pa0012", text: "decrement" },
  ],
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
