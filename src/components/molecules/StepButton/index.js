import React from "react";

import { noop } from "lodash";
import PropTypes from "prop-types";
import styled from "styled-components";

import { Icon } from "../../atoms";

const StepButton = ({ onPrevClick, onNextClick }) => {
  return (
    <Container>
      <PrevButton onClick={onPrevClick}>
        <Icon type="prev" />
        prev
      </PrevButton>
      <NextButton onClick={onNextClick}>
        next
        <Icon type="next" />
      </NextButton>
    </Container>
  );
};

StepButton.propTypes = {
  onPrevClick: PropTypes.func,
  onNextClick: PropTypes.func,
};

StepButton.defaultProps = {
  onPrevClick: noop,
  onNextClick: noop,
};

export default StepButton;

const Container = styled.div`
  display: flex;
  align-items: center;
  width: 12rem;
  height: 2.5rem;
  border-radius: 0.4rem;
  background: ${({ theme }) => theme.colors.blue_1};
  color: ${({ theme }) => theme.colors.white_1};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: ${({ theme }) => theme.fontWeights.bold};

  * {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    width: 50%;
    line-height: 3rem;
    cursor: pointer;
  }
`;

const PrevButton = styled.div`
  padding-right: ${({ theme }) => theme.space.md};
`;

const NextButton = styled.div`
  padding-left: ${({ theme }) => theme.space.md};
`;
