import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import styled from "styled-components";

import { AnswerBox } from "../../components/atoms";
import {
  Visualization,
  CodeEditor,
  FileTree,
  StepProgressBar,
  GreetingModal,
  DefaultModal,
  PracticeCodeEditor,
} from "../../components/organisms";
import { MainTemplate, TooltipModal } from "../../components/templates";
import { scenarioSliceActions } from "../../modules/slices/scenarioSlice";
import { fileSliceActions } from "../../modules/slices/fileSlice";

const MainPage = () => {
  const dispatch = useDispatch();
  const { scenarios, currentScenario: currentId, mode } = useSelector((state) => state.scenario);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [content, setContent] = useState(<p />);
  const currentScenario = currentId && scenarios[currentId];

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
    dispatch(scenarioSliceActions.updateCurrentScenario("tt0002"));
    dispatch(scenarioSliceActions.updateCurrent(scenarios.tt0002));
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
            <DragDropContext
              onDragEnd={(result) => {
                console.log("end!", result);
              }}
            >
              <Droppable droppableId="answers">
                {(provided, snapshot) => (
                  <>
                    <EditorWrapper mode={mode} ref={provided.innerRef}>
                      <FileTree />
                      {mode === "tutorial" ? (
                        <CodeEditor />
                      ) : (
                        <PracticeCodeEditor {...provided.droppableProps} test={provided.isDropDisabled} />
                      )}
                    </EditorWrapper>
                    <AnswersWrapper mode={mode}>
                      <h3>Description</h3>
                      <p>위의 박스에 알맞은 코드를 선택해 위로 끌어올려 주세요.</p>
                      <Answers>
                        {["test", "test2", "test3"].map((item, index) => (
                          <Draggable key={item} draggableId={item} index={index}>
                            {(provided, snapshot) => {
                              return (
                                <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                  <AnswerBox>{item}</AnswerBox>
                                </div>
                              );
                            }}
                          </Draggable>
                        ))}
                      </Answers>
                    </AnswersWrapper>
                    {provided.placeholder}
                  </>
                )}
              </Droppable>
            </DragDropContext>
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
  padding: 2rem;
  background: ${({ theme }) => theme.colors.lightdarkblue_1};
  color: ${({ theme }) => theme.colors.white_1};
  font-size: ${({ theme }) => theme.fontSizes.md};

  p {
    margin-top: 0.8rem;
    font-weight: 200;
  }
`;

const Answers = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin-top: 2rem;
  color: ${({ theme }) => theme.colors.gray_1};
  white-space: pre;
`;
