import React, { useEffect } from "react";

import { useDispatch } from "react-redux";

import useSound from "./hooks/useSound";
import { fileSliceActions } from "./modules/slices/fileSlice";
import { scenarioSliceActions } from "./modules/slices/scenarioSlice";
import { MainPage } from "./pages";

const App = () => {
  const dispatch = useDispatch();
  const [playSound, stopSound] = useSound("/assets/bgm.mp3", 0.2, "infinite");

  useEffect(() => {
    playSound();

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
