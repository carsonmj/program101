import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { Icon, Image } from "../../components/atoms";
import {
  Answers,
  Visualization,
  CodeEditor,
  FileTree,
  StepProgressBar,
  GreetingModal,
  DefaultModal,
  PracticeCodeEditor,
  DivideModal,
} from "../../components/organisms";
import { MainTemplate, TooltipModal } from "../../components/templates";
import { fileSliceActions } from "../../modules/slices/fileSlice";
import { scenarioSliceActions } from "../../modules/slices/scenarioSlice";

const MainPage = () => {
  const dispatch = useDispatch();
  const { scenarios, currentScenario: currentId, mode } = useSelector((state) => state.scenario);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [content, setContent] = useState(<p />);
  const currentScenario = currentId && scenarios[currentId];
  const [isCorrectAnswer, setIsCorrectAnswer] = useState("none");

  const handleModalCloseClick = () => {
    setIsModalOpen(false);
  };

  const handleTutorialStartButtonClick = () => {
    dispatch(scenarioSliceActions.updateMode("tutorial"));
    const nextScenarioId = currentScenario.next;
    dispatch(scenarioSliceActions.updateCurrentScenario(nextScenarioId));
    dispatch(scenarioSliceActions.updateCurrent(scenarios[nextScenarioId]));

    setIsModalOpen(false);
  };

  const handlePracticeStartButtonClick = () => {
    dispatch(scenarioSliceActions.resetVisualizeAction());
    dispatch(scenarioSliceActions.updateMode("practice"));
    dispatch(scenarioSliceActions.updateCurrentScenario("pr0001"));
    dispatch(scenarioSliceActions.updateCurrent(scenarios.pr0001));

    setIsModalOpen(false);
  };

  const handleNextButtonClick = () => {
    const nextScenarioId = currentScenario.next;
    dispatch(scenarioSliceActions.updateCurrentScenario(nextScenarioId));
    dispatch(scenarioSliceActions.updateCurrent(scenarios[nextScenarioId]));

    setIsModalOpen(false);
  };

  const handlePrevButtonClick = () => {
    const prevScenarioId = currentScenario.prev;
    dispatch(scenarioSliceActions.updateCurrentScenario(prevScenarioId));
    dispatch(scenarioSliceActions.updateCurrent(scenarios[prevScenarioId]));

    setIsModalOpen(false);
  };

  const handleTutorialRestart = () => {
    dispatch(scenarioSliceActions.resetVisualizeAction());
    dispatch(scenarioSliceActions.updateCurrentScenario("tt0002"));
    dispatch(scenarioSliceActions.updateCurrent(scenarios.tt0002));
  };

  const createDynamicElement = (elementList) => {
    return elementList.map((el, index) => {
      if (Array.isArray(el.text)) {
        if (el.direction === "column") {
          return <div key={"wr".concat(index)}>{createDynamicElement(el.text)}</div>;
        }
        return createDynamicElement(el.text);
      }

      const CustomTag = el.tag;

      if (el.tag === "a") {
        return (
          <CustomTag key={"cs".concat(index)} href={el.href}>
            {el.text}
          </CustomTag>
        );
      }

      if (el.tag === "Icon") {
        return <Icon key={"cs".concat(index)} type={el.type} color={el.color} />;
      }

      if (el.tag === "img") {
        return <Image key={"cs".concat(index)} src={el.src} width={el.width} height={el.height} alt="data-flow" />;
      }

      return <CustomTag key={"cs".concat(index)}>{el.text}</CustomTag>;
    });
  };

  const setModalContent = (scenario) => {
    switch (scenario.modalType) {
      case "welcome":
        setContent(
          <GreetingModal
            onClickClose={handleModalCloseClick}
            onClickLeftButton={handleTutorialStartButtonClick}
            onClickRightButton={handlePracticeStartButtonClick}
            leftText="Start Tutorial"
            rigthText="Start Practice"
          >
            {createDynamicElement(scenario.description)}
          </GreetingModal>,
        );
        break;
      case "tutorial_end":
        setContent(
          <GreetingModal
            onClickClose={handleModalCloseClick}
            onClickLeftButton={handleTutorialRestart}
            onClickRightButton={handlePracticeStartButtonClick}
            leftText="Try Again"
            rigthText="Start Practice"
          >
            {createDynamicElement(scenario.description)}
          </GreetingModal>,
        );
        break;
      case "practice_end":
        setContent(
          <GreetingModal
            onClickClose={handleModalCloseClick}
            onClickLeftButton={handleTutorialStartButtonClick}
            onClickRightButton={handlePracticeStartButtonClick}
            leftText="Start Tutorial"
            rigthText="Try Again"
          >
            {createDynamicElement(scenario.description)}
          </GreetingModal>,
        );
        break;
      case "divide":
        setContent(
          <DivideModal
            left={createDynamicElement(scenario.description.left)}
            right={createDynamicElement(scenario.description.right)}
            onPrevClick={handlePrevButtonClick}
            onNextClick={handleNextButtonClick}
          />,
        );
        break;
      case "default":
        setContent(
          <DefaultModal onPrevClick={handlePrevButtonClick} onNextClick={handleNextButtonClick}>
            {createDynamicElement(scenario.description)}
          </DefaultModal>,
        );
        break;
    }
  };

  useEffect(() => {
    const currentFile = currentScenario?.file;
    const selectedFile = currentScenario?.selectedFile;
    const highlightLine = currentScenario?.highlightLine;

    if (currentFile) {
      dispatch(fileSliceActions.setCurrentFile(currentFile));
    }

    if (highlightLine) {
      dispatch(fileSliceActions.setHighlightLines(highlightLine));
    }

    if (selectedFile && selectedFile.length > 0) {
      dispatch(fileSliceActions.setSelectedFiles(selectedFile));
    }

    if (
      currentId &&
      currentScenario.type === "description" &&
      currentScenario.modalType !== "tooltip" &&
      currentScenario.modalType !== "tooltip_wide"
    ) {
      setModalContent(currentScenario);
      setIsModalOpen(true);
    }
  }, [currentId]);

  useEffect(() => {
    let timeoutId = null;

    timeoutId = setTimeout(() => {
      if (isCorrectAnswer !== "none" && isCorrectAnswer) {
        const nextScenarioId = currentScenario.next;
        dispatch(scenarioSliceActions.updateCurrentScenario(nextScenarioId));
        dispatch(scenarioSliceActions.updateCurrent(scenarios[nextScenarioId]));
      }
    }, 2000);

    () => {
      clearTimeout(timeoutId);
    };
  }, [isCorrectAnswer]);

  return (
    <>
      <MainTemplate
        visualContent={
          <>
            <StepProgressBar labels={["Redux Store", "Slice Reducer", "View Component"]} />
            <Visualization />
          </>
        }
        codeContent={
          <CodeContentWrapper>
            <EditorWrapper mode={mode}>
              <FileTree />
              {mode === "tutorial" ? <CodeEditor /> : <PracticeCodeEditor onAnswerDone={setIsCorrectAnswer} />}
            </EditorWrapper>
            <AnswersWrapper mode={mode}>
              <Answers isCorrectAnswer={isCorrectAnswer} onIsCorrectAnswerChnage={setIsCorrectAnswer} />
            </AnswersWrapper>
          </CodeContentWrapper>
        }
        modalContent={isModalOpen && <>{content}</>}
      />
      {(currentScenario?.modalType === "tooltip" || currentScenario?.modalType === "tooltip_wide") && (
        <TooltipModal
          direction={currentScenario.modalDirection}
          onPrevClick={handlePrevButtonClick}
          onNextClick={handleNextButtonClick}
          type={currentScenario?.modalType === "tooltip_wide" ? "wide" : "default"}
        >
          {createDynamicElement(currentScenario.description)}
        </TooltipModal>
      )}
    </>
  );
};

export default MainPage;

const CodeContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const EditorWrapper = styled.div`
  display: flex;
  height: ${({ mode }) => (mode === "tutorial" ? "100%" : "60%")};
`;

const AnswersWrapper = styled.div`
  background: red;
  display: flex;
  ${({ mode }) => mode === "tutorial" && "display: none;"};
  flex-direction: column;
  height: 40%;
  padding: 2rem 2rem 1rem 2rem;
  background: ${({ theme }) => theme.colors.lightdarkblue_1};
  color: ${({ theme }) => theme.colors.white_1};
  font-size: ${({ theme }) => theme.fontSizes.md};

  p {
    margin-top: 0.8rem;
    font-weight: 200;
  }
`;
