import React, { useState, useEffect } from "react";

import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import styled from "styled-components";

import { getCodeFileAPI } from "../../../apis";
import useSound from "../../../hooks/useSound";

const PracticeCodeEditor = ({ onAnswerDone }) => {
  const currentFile = useSelector((state) => state.file.currentFile);
  const currentScenario = useSelector((state) => state.scenario.current);
  const isCorrect = useSelector((state) => state.scenario.isCorrect);
  const [codes, setCodes] = useState(null);
  const [codeLines, setCodeLines] = useState(null);
  const [playCorrectSound, stopCorrectSound] = useSound("/assets/correct.mp3", 1);
  const [playWrongSound, stopWrongSound] = useSound("/assets/wrong.mp3", 1);

  const dragEnter = (e) => {
    e.target.style.opacity = 0.5;
    e.target.style.padding = "0.6rem 1.8rem;";
  };

  const dragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
  };

  const drop = (e) => {
    e.preventDefault();
    e.target.style.padding = "0.2rem 1rem;";
    e.target.style.opacity = 1;

    if (e.target?.id !== "dropzone" || isCorrect === null) {
      return;
    }

    if (isCorrect) {
      onAnswerDone(true);
      e.target.style.animation = "scaleUp 0.5s linear 1 forwards";
      playCorrectSound();
    } else {
      onAnswerDone(false);
      playWrongSound();
    }
  };

  useEffect(() => {
    const getCodes = async () => {
      const result = await getCodeFileAPI();
      setCodes(result);
    };

    getCodes();
  }, []);

  useEffect(() => {
    if (currentFile) {
      codes && setCodeLines(codes[currentFile].code.split("\n"));
    }
  }, [currentFile]);

  useEffect(() => {
    if (currentScenario?.id === "pr0014") {
      const $target = document.querySelector("#container");
      $target.scrollBy({
        top: 500,
        left: 0,
        behavior: "smooth",
      });

      return;
    }

    if (currentScenario?.id === "pr0019") {
      const $target = document.querySelector("#container");
      $target.scrollTo(0, 0);
    }
  }, [currentScenario]);

  return (
    <Container id="container">
      <LineWrapper>
        {codeLines &&
          codeLines.map((line, index) => {
            const number = index + 1;
            const id = `line${number}`;

            if (number === currentScenario.problemLine) {
              const foundIndex = line.indexOf(currentScenario.phrase);
              const phraseLength = currentScenario.phrase.length;

              if (foundIndex === 0) {
                const restText = line.substring(phraseLength);
                console.log("restText ===>", restText);

                return (
                  <li id={id} key={id}>
                    <span>{number}</span>
                    <pre>
                      <span id="dropzone">{currentScenario.phrase}</span>
                      {restText}
                    </pre>
                  </li>
                );
              }

              const frontText = line.substring(0, foundIndex);
              const endText = line.substring(foundIndex + phraseLength);

              return (
                <li id={id} key={id} onDrop={drop} onDragOver={dragOver} onDragEnter={dragEnter}>
                  <span>{number}</span>
                  <pre>
                    {frontText}
                    <span id="dropzone">{currentScenario.phrase}</span>
                    {endText}
                  </pre>
                </li>
              );
            }

            return (
              <li id={id} key={id}>
                <span>{number}</span>
                <pre>{line}</pre>
              </li>
            );
          })}
      </LineWrapper>
    </Container>
  );
};

PracticeCodeEditor.propTypes = {
  onAnswerDone: PropTypes.func.isRequired,
};

export default PracticeCodeEditor;

const Container = styled.div`
  display: flex;
  padding: 0.8rem;
  width: calc(100% - 21.6rem);
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: ${({ theme }) => theme.fontWeights.normal};
  color: ${({ theme }) => theme.colors.white_1};
  overflow-y: auto;
  transition: 1s;
`;

const LineWrapper = styled.ul`
  width: 100%;
  padding: 0;
  margin: 0;

  li {
    display: flex;
    min-height: 2rem;

    span {
      width: 3rem;
      line-height: 2rem;
      text-align: left;
    }
  }

  pre.selected {
    background: ${({ theme }) => theme.opacityColors.gray_1};
  }

  pre {
    width: 100%;
    padding: 0;
    margin: 0;
    line-height: 2rem;
    white-space: pre-wrap;

    span {
      padding: 0.2rem 1rem;
      border: 0.3rem solid ${({ theme }) => theme.colors.white_1};
      border-radius: 2rem;
      background: ${({ theme }) => theme.colors.yellow_1};
      color: ${({ theme }) => theme.colors.yellow_1};
      animation: blink_practice 0.6s linear infinite;
      user-select: none;
    }
  }
`;
