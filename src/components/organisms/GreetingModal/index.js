import React from "react";

import PropTypes from "prop-types";
import styled from "styled-components";

import { Button, Icon } from "../../atoms";
import themes from "../../../styles/theme";

const GreetingModal = ({ children, onClickClose, onClickLeftButton }) => {
  return (
    <Overlay>
      <Container>
        <CloseWrapper>
          <Icon type="close" size="lg" color={themes.colors.gray_1} onClick={onClickClose} />
        </CloseWrapper>
        {children}
        <Text>Redux Tutorial</Text>
        <ButtonWrapper>
          <Button text="Start Tutorial" size="long" onClick={onClickLeftButton} />
          <Button text="Start Practice" size="long" onClick={() => alert("Practice mode 준비중")} />
        </ButtonWrapper>
      </Container>
    </Overlay>
  );
};

GreetingModal.propTypes = {
  children: PropTypes.node.isRequired,
  onClickClose: PropTypes.func.isRequired,
  onClickLeftButton: PropTypes.func.isRequired,
};

export default GreetingModal;

const Overlay = styled.div`
  position: fixed;
  background-color: ${({ theme }) => theme.opacityColors.gray_1};
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
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
`;

const Text = styled.p`
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
