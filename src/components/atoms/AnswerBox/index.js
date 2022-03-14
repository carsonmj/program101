import React from "react";

import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import { scenarioSliceActions } from "../../../modules/slices/scenarioSlice";

const AnswerBox = ({ children, id, draggable, answer }) => {
  const dispatch = useDispatch();

  const dragStart = (e) => {
    e.target.style.opacity = 0.5;
    e.dataTransfer.dropEffect = "copy";

    if (e.target.id === answer) {
      dispatch(scenarioSliceActions.updateIsCorrect(true));
    } else {
      dispatch(scenarioSliceActions.updateIsCorrect(false));
    }
  };

  const dragend = (e) => {
    e.target.style.opacity = 1;
  };

  return (
    <Container id={id} draggable={draggable} onDragStart={dragStart} onDragEnd={dragend}>
      {children}
    </Container>
  );
};

AnswerBox.propTypes = {
  children: PropTypes.node,
  id: PropTypes.string.isRequired,
  draggable: PropTypes.bool.isRequired,
  answer: PropTypes.string,
};

AnswerBox.defaultProps = {
  children: "",
  answer: "",
};

export default AnswerBox;

const Container = styled.div`
  width: fit-content;
  height: 2.2rem;
  line-height: 2.2rem;
  padding: 0rem 1.5rem;
  margin-right: 1rem;
  margin-bottom: 0.5rem;
  border-radius: 2rem;
  border: 0.2rem solid ${({ theme }) => theme.colors.black_2};
  background: ${({ theme }) => theme.opacityColors.white_1};
  color: ${({ theme }) => theme.colors.gray_1};
  text-align: center;
  cursor: pointer;
`;
