import React from "react";

import { noop } from "lodash";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import styled from "styled-components";

import { StepButton } from "../../molecules";

const TooltipModal = ({ direction, children, onPrevClick, onNextClick, type }) => {
  const modalCoordinate = useSelector((state) => state.file.modalCoordinate);

  return (
    <TooltipBox
      direction={direction}
      top={modalCoordinate && modalCoordinate.top}
      left={modalCoordinate && modalCoordinate.left}
      type={type}
    >
      <ContentWrapper>{children}</ContentWrapper>
      <ButtonWrapper>
        <StepButton onPrevClick={onPrevClick} onNextClick={onNextClick} />
      </ButtonWrapper>
    </TooltipBox>
  );
};

TooltipModal.propTypes = {
  direction: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  onPrevClick: PropTypes.func,
  onNextClick: PropTypes.func,
  type: PropTypes.string,
};

TooltipModal.defaultProps = {
  onPrevClick: noop,
  onNextClick: noop,
  type: "default",
};

export default TooltipModal;

const TooltipBox = styled.div`
  position: absolute;
  top: ${({ top }) => top}px;
  left: ${({ left }) => left}px;
  min-width: 15rem;
  min-height: 10rem;
  height: fit-content;
  max-width: 26rem;
  max-width: ${({ type }) => {
    if (type === "wide") {
      return "34rem";
    }

    return "26rem";
  }};
  padding-top: 2rem;
  padding-left: 2rem;
  padding-right: 2rem;
  border-radius: 0.4rem;
  background: ${({ theme }) => theme.colors.white_1};
  z-index: 100;
  animation: fadeIn 0.5s linear 1;

  &:before {
    content: "";
    width: 0;
    height: 0;

    ${({ direction }) => {
      switch (direction) {
        case "right":
          return `
            right: -0.8rem;
            top: 2rem;
          `;
        case "left":
          return `
            left: -0.8rem;
            top: 2rem;
          `;
        case "top-left":
          return `
            left: 2rem;
            top: -0.8rem;
          `;
        case "top-right":
          return `
            right: 2rem;
            top: -0.8rem;
          `;
      }
    }}

    position: absolute;
    border: 10px solid transparent;
    border-radius: 0.4rem;
    background: ${({ theme }) => theme.colors.white_1};
    transform: rotate(135deg);
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  font-size: ${({ theme }) => theme.fontSizes.md};
  transition: 0.8s;

  a {
    cursor: pointer;
    color: ${({ theme }) => theme.colors.gray_1};
  }

  li {
    margin-top: ${({ theme }) => theme.space.md};
    list-style-type: disc;
  }

  p {
    margin-top: ${({ theme }) => theme.space.md};
  }

  div {
    display: flex;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: ${({ theme }) => theme.space.xl};
    text-align: center;
  }

  pre {
    white-space: pre-wrap;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 2rem 0;
  transition: 0.8s;
`;
