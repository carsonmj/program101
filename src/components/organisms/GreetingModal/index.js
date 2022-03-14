import React from "react";

import PropTypes from "prop-types";
import styled from "styled-components";

import themes from "../../../styles/theme";
import { Button, Icon } from "../../atoms";

const GreetingModal = ({ children, onClickClose, onClickLeftButton, onClickRightButton, leftText, rigthText }) => {
  return (
    <Overlay>
      <Container>
        <CloseWrapper>
          <Icon type="close" size="lg" color={themes.colors.gray_1} onClick={onClickClose} />
        </CloseWrapper>
        {children}
        <Text>Redux Tutorial</Text>
        <ButtonWrapper>
          <Button text={leftText} size="long" onClick={onClickLeftButton} />
          <Button text={rigthText} size="long" onClick={onClickRightButton} />
        </ButtonWrapper>
      </Container>
    </Overlay>
  );
};

GreetingModal.propTypes = {
  children: PropTypes.node.isRequired,
  onClickClose: PropTypes.func.isRequired,
  onClickLeftButton: PropTypes.func.isRequired,
  onClickRightButton: PropTypes.func.isRequired,
  leftText: PropTypes.string.isRequired,
  rigthText: PropTypes.string.isRequired,
};

export default GreetingModal;

const Overlay = styled.div`
  position: fixed;
  background-color: ${({ theme }) => theme.opacityColors.gray_1};
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: 50;
`;

const Container = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 20rem;
  min-height: 30rem;
  max-height: calc(100% - 10rem);
  max-width: calc(100% - 20rem);
  left: 50%;
  padding: ${({ theme }) => theme.space.md};
  border-radius: ${({ theme }) => theme.space.md};
  transform: translate(-50%, 60%);
  background-color: ${({ theme }) => theme.colors.white_1};
  animation: fadeIn 0.5s linear 1;
`;

const Text = styled.p`
  margin-top: 4rem;
  font-size: ${({ theme }) => theme.fontSizes.xxl};
  color: ${({ theme }) => theme.colors.gray_1};
`;

const CloseWrapper = styled.div`
  width: 100%;
  text-align: right;
  margin-bottom: 2rem;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  min-width: 35rem;
  margin: 4rem 0rem;
  padding: 0 4rem;
`;
