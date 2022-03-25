import React, { useEffect } from "react";

import { useDispatch } from "react-redux";

import { MainPage } from "./pages";
import { scenarioSliceActions } from "./modules/slices/scenarioSlice";
import { fileSliceActions } from "./modules/slices/fileSlice";
import useSound from "./hooks/useSound";

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
