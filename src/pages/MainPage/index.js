import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { CodeEditor, FileTree, StepProgressBar, GreetingModal, DefaultModal } from "../../components/organisms";
import { MainTemplate } from "../../components/templates";
import { scenarioSliceActions } from "../../modules/slices/scenarioSlice";

const MainPage = () => {
  const dispatch = useDispatch();
  const { scenarios, currentScenario: currentId } = useSelector((state) => state.scenario);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [content, setContent] = useState("");
  const currentScenario = currentId && scenarios[currentId];

  const handleModalCloseClick = () => {
    setIsModalOpen(false);
  };

  const handleTutorialStartButtonClick = () => {
    const nextScenarioId = currentScenario.next;
    dispatch(scenarioSliceActions.updateCurrentScenario(nextScenarioId));

    setIsModalOpen(false);
  };

  const handleNextButtonClick = () => {
    const nextScenarioId = currentScenario.next;
    dispatch(scenarioSliceActions.updateCurrentScenario(nextScenarioId));

    setIsModalOpen(false);
  };

  const handlePrevButtonClick = () => {
    const prevScenarioId = currentScenario.prev;
    dispatch(scenarioSliceActions.updateCurrentScenario(prevScenarioId));

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
      default:
        setContent(<h1>defalut</h1>);
    }
  };

  useEffect(() => {
    if (currentId && currentScenario.type === "description") {
      setModalContent(currentScenario);
      setIsModalOpen(true);
    }
  }, [currentId]);

  return (
    <>
      <MainTemplate
        visualContent={<StepProgressBar labels={["step1", "step2", "step3"]} />}
        codeContent={
          <CodeContentWrapper>
            <FileTree />
            <CodeEditor />
          </CodeContentWrapper>
        }
        modalContent={isModalOpen && <div>{content}</div>}
      />
    </>
  );
};

export default MainPage;

const CodeContentWrapper = styled.div`
  display: flex;
  height: 100%;
`;
