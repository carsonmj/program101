import React from "react";

import PropTypes from "prop-types";
import styled from "styled-components";

const TooltipModal = ({ direction }) => {
  return <TooltipBox direction={direction} />;
};

TooltipModal.propTypes = {
  direction: PropTypes.string.isRequired,
};

export default TooltipModal;

const TooltipBox = styled.div`
  position: fixed;
  top: 200px;
  left: 100px;
  min-width: 15rem;
  min-height: 10rem;
  height: fit-content;
  border-radius: 0.4rem;
  background: ${({ theme }) => theme.colors.white_1};
  z-index: 100;

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
    transition: border 0.4s ease-in-out;
  }
`;
