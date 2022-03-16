import React from "react";

const useSound = (url, volume = 1, repeat = 1) => {
  const sound = new Audio(url);
  sound.volume = volume;

  const playSound = () => {
    sound.currentTime = 0;
    sound.play();
  };

  const stopSound = () => {
    sound.pause();
  };

  return [playSound, stopSound];
};

export default useSound;
