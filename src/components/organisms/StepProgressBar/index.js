import React, { useState, useEffect } from "react";

import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import styled from "styled-components";

const StepProgressBar = ({ labels }) => {
  const current = useSelector((state) => state.scenario.currentScenario);
  const [progressStatus, setProgressStatus] = useState({});
  const [progressPersentage, setProgressPersentage] = useState(0);

  useEffect(() => {
    if (current === "tt0001" || current === "tt0002" || current === "pr0001") {
      setProgressStatus({ 0: "stroke" });
      setProgressPersentage(0);
      return;
    }

    if (current === "tt0011" || current === "pr0004") {
      progressStatus[0] = "fill";
      return;
    }

    if (current === "tt0012" || current === "pr0006") {
      setProgressStatus({ ...progressStatus, 1: "stroke" });
      setProgressPersentage(50);
      return;
    }

    if (current === "tt0018" || current === "pr0007") {
      progressStatus[1] = "fill";
      return;
    }

    if (current === "tt0019" || current === "pr0011") {
      setProgressStatus({ ...progressStatus, 2: "stroke" });
      setProgressPersentage(100);
      return;
    }

    if (current === "tt0024" || current === "pr0015") {
      progressStatus[2] = "fill";
    }
  }, [current]);

  const getProgressCircleType = (index) => {
    return progressStatus[index] && progressStatus[index];
  };

  return (
    <Container>
      <Wrapper>
        <ProgressBar persentage={progressPersentage} />
      </Wrapper>
      <CircelWrapper>
        {labels.map((label, index) => (
          <ProgressCircle key={label.split(" ").join("")} content={label} type={getProgressCircleType(index)} />
        ))}
      </CircelWrapper>
    </Container>
  );
};

StepProgressBar.propTypes = {
  labels: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default StepProgressBar;

const Container = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  height: 8rem;
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  flex-basis: 100%;
  width: 45rem;
  height: 0.4rem;
  border-radius: 1rem;
  background: ${({ theme }) => theme.colors.white_1};
`;

const ProgressBar = styled.div`
  flex-basis: 24%;
  flex-basis: ${({ persentage }) => `${persentage}%`};
  width: 45rem;
  height: 0.4rem;
  background: ${({ theme }) => theme.colors.yellow_1};
  z-index: 1;
  transition: all 1s;
`;

const CircelWrapper = styled.div`
  position: absolute;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 45rem;
  height: 3rem;
  z-index: 2;
`;

const ProgressCircle = styled.div`
  position: relative;
  width: 1.2rem;
  height: 1.2rem;
  border-radius: 50%;
  border: 0.3rem solid
    ${({ theme, type }) => {
      if (type === "stroke" || type === "fill") {
        return theme.colors.yellow_1;
      }
      return theme.colors.white_1;
    }};

  background: ${({ theme, type }) => (type === "fill" ? theme.colors.yellow_1 : theme.colors.white_1)};

  &:after {
    ${({ content }) => content && `content: "${content}"`};
    position: absolute;
    width: 10rem;
    top: 3rem;
    left: -2.5rem;
    font-size: 1.2rem;
    color: ${({ theme, type }) =>
      type === "stroke" || type === "fill" ? theme.colors.yellow_1 : theme.colors.white_1};
  }
`;
