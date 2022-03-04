import React from "react";

import PropTypes from "prop-types";
import styled from "styled-components";

import { StepButton } from "../../molecules";
import { noop } from "lodash";

const DefaultModal = ({ children, onPrevClick, onNextClick }) => {
  return (
    <Overlay>
      <Container>
        <ContentWrapper>{children}</ContentWrapper>
        <ButtonWrapper>
          <StepButton onPrevClick={onPrevClick} onNextClick={onNextClick} />
        </ButtonWrapper>
      </Container>
    </Overlay>
  );
};

export default DefaultModal;

DefaultModal.propTypes = {
  children: PropTypes.node.isRequired,
  onPrevClick: PropTypes.func,
  onNextClick: PropTypes.func,
};

DefaultModal.defaultProps = {
  onPrevClick: noop,
  onNextClick: noop,
};

const Overlay = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.opacityColors.gray_1};
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: 200;
`;

const Container = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  min-width: 20rem;
  min-height: 20rem;
  max-width: 100%;
  max-height: calc(100% - 10rem);
  padding: ${({ theme }) => theme.space.md};
  padding-top: calc(${({ theme }) => theme.space.xl} * 2);
  border-radius: ${({ theme }) => theme.space.md};
  background-color: ${({ theme }) => theme.colors.white_1};
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: ${({ theme }) => theme.fontSizes.md};

  a {
    cursor: pointer;
    color: ${({ theme }) => theme.colors.gray_1};
  }

  li {
    list-style-type: disc;
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
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 90%;
  margin: 2rem 0;
  padding: 0 1rem;
`;
