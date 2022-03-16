import { Howl } from "howler";

const BGM = new Audio("/assets/bgm.mp3");
const correctSound = new Audio("/asserts/correct.mp3");
const wrongSound = new Audio("/asserts/wrong.mp3");

const playSound = (sound, volume = 1) => {
  sound.currentTime = 0;
  sound.volume = volume;
  sound.play();
};

const stopSound = (sound) => {
  sound.pause();
};

export const playBgm = () => {
  playSound(BGM, 0.4);
};

export const playCorrectSound = () => {
  playSound(correctSound);
};

export const playWrongSound = () => {
  playSound(wrongSound);
};

export const flattenFiles = (files) => {
  const queue = [];
  const result = [];

  const serachFiles = (arr) => {
    for (let i = 0; i < arr.length; i += 1) {
      queue.push(arr[i]);

      while (queue.length) {
        const { id, type, name, level, child = null } = queue.shift();

        result.push({
          id,
          type,
          name,
          level,
        });

        if (child) {
          serachFiles(child);
        }
      }
    }
  };

  serachFiles(files);

  return result;
};

export const isSelectedFile = (selectedFiles, id) => {
  return selectedFiles && selectedFiles.length > 0 && selectedFiles.includes(id);
};

export const effectSound = (src, volume = 1) => {
  console.log("======src=======>", src);
  let sound;
  const soundInject = (src) => {
    sound = new Howl({ src });
    sound.volume(volume);
  };
  soundInject(src);
  return sound;
};
