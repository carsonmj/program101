import React, { useEffect } from "react";

import { useDispatch } from "react-redux";

import { MainPage } from "./pages";
import { scenarioSliceActions } from "./modules/slices/scenarioSlice";
import { fileSliceActions } from "./modules/slices/fileSlice";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(scenarioSliceActions.getScenarios());
    dispatch(fileSliceActions.getFiles());
  }, []);

  return (
    <div>
      <MainPage />
    </div>
  );
};

export default App;
