import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import {
  Visualization,
  CodeEditor,
  FileTree,
  StepProgressBar,
  GreetingModal,
  DefaultModal,
} from "../../components/organisms";
import { MainTemplate, TooltipModal } from "../../components/templates";
import { scenarioSliceActions } from "../../modules/slices/scenarioSlice";
import { fileSliceActions } from "../../modules/slices/fileSlice";

const MainPage = () => {
  const dispatch = useDispatch();
  const { scenarios, currentScenario: currentId } = useSelector((state) => state.scenario);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [content, setContent] = useState(<p />);
  const currentScenario = currentId && scenarios[currentId];

  const handleModalCloseClick = () => {
    setIsModalOpen(false);
  };

  const handleTutorialStartButtonClick = () => {
    const nextScenarioId = currentScenario.next;
    dispatch(scenarioSliceActions.updateCurrentScenario(nextScenarioId));
    dispatch(scenarioSliceActions.updateCurrent(scenarios[nextScenarioId]));

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

  const createDynamicElement = (elementList) => {
    return elementList.map((el, index) => {
      if (Array.isArray(el.text)) {
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
      return <CustomTag key={"cs".concat(index)}>{el.text}</CustomTag>;
    });
  };

  const setModalContent = (scenario) => {
    switch (scenario.modalType) {
      case "welcome":
        setContent(
          <GreetingModal onClickClose={handleModalCloseClick} onClickLeftButton={handleTutorialStartButtonClick}>
            {createDynamicElement(scenario.description)}
          </GreetingModal>,
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

  return (
    <>
      <MainTemplate
        visualContent={
          <>
            <StepProgressBar labels={["step1", "step2", "step3"]} />
            <Visualization />
          </>
        }
        codeContent={
          <CodeContentWrapper>
            <FileTree />
            <CodeEditor />
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
  height: 100%;
`;
