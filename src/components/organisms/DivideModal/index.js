import React from "react";

import { noop } from "lodash";
import PropTypes from "prop-types";
import styled from "styled-components";

import { StepButton } from "../../molecules";

const DivideModal = ({ left, right, onPrevClick, onNextClick }) => {
  return (
    <Overlay>
      <Container>
        <ContentWrapper>
          <Division id="d">{left}</Division>
          <Division className="rightSide" id="d">
            {right}
          </Division>
        </ContentWrapper>
        <ButtonWrapper>
          <StepButton onPrevClick={onPrevClick} onNextClick={onNextClick} />
        </ButtonWrapper>
      </Container>
    </Overlay>
  );
};

export default DivideModal;

DivideModal.propTypes = {
  left: PropTypes.node.isRequired,
  right: PropTypes.node.isRequired,
  onPrevClick: PropTypes.func,
  onNextClick: PropTypes.func,
};

DivideModal.defaultProps = {
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
  max-width: 80%;
  max-height: calc(100% - 10rem);
  padding: ${({ theme }) => theme.space.md};
  padding-top: calc(${({ theme }) => theme.space.xl} * 2);
  border-radius: ${({ theme }) => theme.space.md};
  background-color: ${({ theme }) => theme.colors.white_1};
  animation: fadeIn 0.5s linear 1;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  font-size: ${({ theme }) => theme.fontSizes.md};

  .rightSide {
    margin-left: 5rem;
  }
`;

const Division = styled.div`
  display: flex;
  width: 40%;
  justify-content: space-around;
  flex-direction: column;
  align-items: flex-start
  margin-left: 1rem;
  font-family: sans-serif, NanumGothic, 'Noto Sans KR';

  pre {
    margin-top: ${({ theme }) => theme.space.md};
    white-space: pre-wrap;
    font-family: 'Apple SD Gothic Neo';
  }

  a {
    cursor: pointer;
    color: ${({ theme }) => theme.colors.green_1};
  }

  li {
    margin-top: 3rem;
    font-size: 1.2rem;
    font-weight: 700;
    list-style-type: disc;
  }

  p {
    margin-top: ${({ theme }) => theme.space.md};
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    width: 100%;
    text-align: center;
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
