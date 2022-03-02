import React from "react";

import { noop } from "lodash";
import PropTypes from "prop-types";
import styled from "styled-components";

import { Icon } from "../../atoms";

const StepButton = ({ prevOnClick, nextOnClick }) => {
  return (
    <Container>
      <PrevButton onClick={prevOnClick}>
        <Icon type="prev" />
        prev
      </PrevButton>
      <NextButton onClick={nextOnClick}>
        next
        <Icon type="next" />
      </NextButton>
    </Container>
  );
};

StepButton.propTypes = {
  prevOnClick: PropTypes.func,
  nextOnClick: PropTypes.func,
};

StepButton.defaultProps = {
  prevOnClick: noop,
  nextOnClick: noop,
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
