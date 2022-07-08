import React, { useState, useEffect } from "react";

import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import styled from "styled-components";

import { AnswerBox } from "../../atoms";

const Answers = ({ isCorrectAnswer, onIsCorrectAnswerChnage }) => {
  const { scenarios, currentScenario: currentId, practiceAnswers } = useSelector((state) => state.scenario);
  const [result, setResult] = useState("");
  const currentScenario = currentId && scenarios[currentId];

  useEffect(() => {
    let timeoutId = null;

    if (isCorrectAnswer === "none") {
      setResult("");
    } else {
      setResult(isCorrectAnswer ? "정답입니다! 다음 문제로 넘어갑니다." : "오답입니다! 다시 생각해보세요.");

      timeoutId = setTimeout(() => {
        onIsCorrectAnswerChnage("none");
      }, 2000);
    }

    () => {
      clearTimeout(timeoutId);
    };
  }, [isCorrectAnswer, onIsCorrectAnswerChnage]);

  return (
    <Container>
      <Body>
        <h3>Description</h3>
        <p>아래 블럭에서 알맞은 코드를 선택하여 노란색 박스 영역으로 드래그 하세요.</p>
        <AnswersWrapper>
          {currentScenario &&
            practiceAnswers.map((answer) => (
              <AnswerBox key={answer.id} id={answer.id} draggable={true} answer={currentScenario.answer}>
                {answer.text}
              </AnswerBox>
            ))}
        </AnswersWrapper>
      </Body>
      <Footer>
        <Test isCorrect={isCorrectAnswer}>{result}</Test>
      </Footer>
    </Container>
  );
};

export default Answers;

Answers.propTypes = {
  isCorrectAnswer: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  onIsCorrectAnswerChnage: PropTypes.func.isRequired,
};

Answers.defaultProps = {
  isCorrectAnswer: "none",
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
`;

const Body = styled.div`
  p {
    margin-top: 0.8rem;
    font-weight: 200;
  }
`;

const AnswersWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin-top: 2rem;
  color: ${({ theme }) => theme.colors.gray_1};
  white-space: pre;
`;

const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  background: ${({ theme }) => theme.colors.lightdarkblue_1};
  font-size: ${({ theme }) => theme.fontSizes.md};
`;

const Test = styled.p`
  width: 80%;
  padding-left: 6rem;
  text-align: center;
  transition: 1s;
  color: ${({ theme, isCorrect }) => {
    if (isCorrect !== "none") {
      return isCorrect ? theme.colors.green_1 : theme.colors.pink_1;
    }
  }};
`;
