import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  fileTree: null,
  currentFile: null,
  selectedFiles: [],
  highlightLines: [],
  modalCoordinate: null,
  error: null,
};

export const fileSlice = createSlice({
  name: "file",
  initialState,
  reducers: {
    getFiles: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    getFilesSuccess: (state, action) => {
      state.isLoading = false;
      state.fileTree = action.payload;
      state.error = null;
    },
    getFilesFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    setSelectedFiles: (state, action) => {
      state.selectedFiles = action.payload;
    },
    setCurrentFile: (state, action) => {
      state.currentFile = action.payload;
    },
    setHighlightLines: (state, action) => {
      state.highlightLines = action.payload;
    },
    setModalCoordinate: (state, action) => {
      state.modalCoordinate = action.payload;
    },
  },
});

export const fileSliceActions = fileSlice.actions;
export default fileSlice.reducer;
