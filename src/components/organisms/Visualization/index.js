import React, { useEffect } from "react";

import { debounce } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { LightCircle } from "../../atoms";
import { scenarioSliceActions } from "../../../modules/slices/scenarioSlice";

const Visualization = () => {
  const dispatch = useDispatch();
  const scenarios = useSelector((state) => state.scenario.scenarios);
  const current = useSelector((state) => state.scenario.current);
  const actions = useSelector((state) => state.scenario.visualizeAction);

  const handleAnimationEnd = debounce(() => {
    if (current?.type === "visualize") {
      const nextId = current.next;
      dispatch(scenarioSliceActions.updateCurrentScenario(nextId));
      dispatch(scenarioSliceActions.updateCurrent(scenarios[nextId]));
    }
  }, 1000);

  useEffect(() => {
    if (current?.type === "visualize" && current?.action) {
      dispatch(scenarioSliceActions.updateVisualizeAction(current.action));
    }
  }, [current]);

  return (
    <Container onAnimationEnd={handleAnimationEnd} actions={actions}>
      <Wrapper>
        <StoreBox actions={actions} animation={current?.action}>
          <StoreLeftSide>
            <Dispatch actions={actions} animation={current?.action}>
              Dispatch
            </Dispatch>
            <Text align="left">Store</Text>
          </StoreLeftSide>
          <StoreRightSide>
            <ReducerBox actions={actions} animation={current?.action}>
              <Text align="center">Reducer</Text>
              <BoxWrapper actions={actions} animation={current?.action}>
                <InnerBox>increment</InnerBox>
                <InnerBox animation={current?.action}>decrement</InnerBox>
              </BoxWrapper>
            </ReducerBox>
            <StateBox actions={actions} animation={current?.action}>
              <Text align="center">State</Text>
              <BoxWrapper actions={actions} animation={current?.action}>
                <InnerBox>count: 1</InnerBox>
              </BoxWrapper>
            </StateBox>
          </StoreRightSide>
        </StoreBox>
        <ViewBox actions={actions} animation={current?.action}>
          <DispatchActionBox animation={current?.action}>{"dispatch({ type: counter/decrement })"}</DispatchActionBox>
          <CounterWrapper actions={actions} animation={current?.action}>
            <MinusButton animation={current?.action}>-</MinusButton>
            <CounterText>1</CounterText>
            <PlusButton>+</PlusButton>
          </CounterWrapper>
          <Text color="dark">View</Text>
        </ViewBox>
        <PathBox actions={actions} animation={current?.action}>
          <Circle animation={current?.action}>
            <LightCircle />
          </Circle>
        </PathBox>
      </Wrapper>
    </Container>
  );
};

export default Visualization;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 61rem;
  margin-top: 3rem;
  color: ${({ theme }) => theme.colors.white_1};

  @keyframes fadeInPath {
    0% {
      width: 0;
      height: 0;
      border-top-color: ${({ theme }) => theme.colors.grayblue_1};
      border-right-color: transparent;
      border-bottom-color: transparent;
      border-left-color: transparent;
    }
    50% {
      width: 60rem;
      height: 0;
      border-top-color: ${({ theme }) => theme.colors.grayblue_1};
      border-right-color: ${({ theme }) => theme.colors.grayblue_1};
      border-bottom-color: transparent;
      border-left-color: transparent;
    }
    70% {
      width: 60rem;
      height: 28rem;
      border-top-color: ${({ theme }) => theme.colors.grayblue_1};
      border-right-color: ${({ theme }) => theme.colors.grayblue_1};
      border-bottom-color: transparent;
      border-left-color: ${({ theme }) => theme.colors.grayblue_1};
    }
    100% {
      width: 60rem;
      height: 28rem;
      border-top-color: ${({ theme }) => theme.colors.grayblue_1};
      border-right-color: ${({ theme }) => theme.colors.grayblue_1};
      border-bottom-color: ${({ theme }) => theme.colors.grayblue_1};
      border-left-color: ${({ theme }) => theme.colors.grayblue_1};
    }
  }

  @keyframes moveStateToView {
    0% {
      top: -24px;
      left: 500px;
    }
    20% {
      top: -24px;
      left: 575px;
    }
    80% {
      top: 255px;
      left: 575px;
    }
    100% {
      top: 255px;
      left: 470px;
    }
  }

  @keyframes moveViewToDispatch {
    0% {
      top: 255px;
      left: 40px;
    }
    20% {
      top: 255px;
      left: -25px;
    }
    80% {
      top: -25px;
      left: -25px;
    }
    100% {
      top: -25px;
      left: 35px;
    }
  }

  @keyframes blink {
    0% {
      box-shadow: 1px 1px 2px gray, 0 0 25px white, 0 0 5px yellow;
      // box-shadow: 1px 1px 2px gray, 0 0 25px white, 0 0 5px darkblue;
    }
    100% {
      background: #f1e1c2c9;
      // background: #7a71db;
    }
  }

  @keyframes blink_white {
    0% {
      box-shadow: 1px 1px 2px gray, 0 0 25px white, 0 0 5px pink;
    }
    100% {
      background: #d5cdcd;
    }
  }

  @keyframes showDispatchAction {
    0% {
      visibility: visible;
      opacity: 0;
      box-shadow: 1px 1px 2px gray, 0 0 25px white, 0 0 5px yellow;
    }
    50% {
      visibility: visible;
      opacity: 1;
      box-shadow: 1px 1px 2px gray, 0 0 25px white, 0 0 5px yellow;
    }
    100% {
      visibility: hidden;
      opacity: 0;
    }
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 70rem;
`;

const StoreBox = styled.div`
  display: flex;
  justify-content: center;
  width: calc(50rem - ${({ theme }) => theme.space.xl});
  height: 32rem;
  padding-left: ${({ theme }) => theme.space.xl};
  visibility: ${({ actions }) => (actions.includes("showStore") ? "visible" : "hidden")};
  // visibility: visible;
  background: ${({ theme }) => theme.opacityColors.grayblue_1};
  border-radius: 1rem;
  z-index: 2;

  ${({ animation }) => {
    if (animation === "showStore") {
      return `
        animation: fadeIn 0.5s linear 1;
        animation-fill-mode: forwards;
      `;
    }
  }}
`;

const ViewBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-direction: column;
  width: calc(46rem - ${({ theme }) => theme.space.xl});
  height: 22rem;
  padding-left: ${({ theme }) => theme.space.xl};
  visibility: ${({ actions }) => (actions && actions.includes("showViewComponent") ? "visible" : "hidden")};
  // visibility: visible;
  background: ${({ theme }) => theme.colors.white_1};
  border-radius: 1rem;
  margin-top: 4rem;
  z-index: 2;

  ${({ animation }) => {
    if (animation === "showViewComponent") {
      return `
        animation: fadeIn 0.5s linear 1;
        animation-fill-mode: forwards;
      `;
    }
  }}
`;

const StoreLeftSide = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 40%;
  height: 100%;
  z-index: 2;
`;

const StoreRightSide = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  width: 60%;
  height: 100%;
  z-index: 2;
`;

const ReducerBox = styled.div`
  width: 24rem;
  height: 14rem;
  visibility: ${({ actions }) => (actions.includes("showReducerAndState") ? "visible" : "hidden")};
  // visibility: visible;
  background: ${({ theme }) => theme.opacityColors.pink_1};
  border-radius: 1rem;
  z-index: 2;

  ${({ animation }) => {
    if (animation === "showReducerAndState") {
      return `
        animation: fadeIn 0.5s linear 1;
        animation-fill-mode: forwards;
      `;
    }

    if (animation === "moveToReducer") {
      return "animation: blink_white 0.8s linear 1;";
    }
  }}
`;

const StateBox = styled.div`
  width: 24rem;
  height: 14rem;
  visibility: ${({ actions }) => (actions.includes("showReducerAndState") ? "visible" : "hidden")};
  // visibility: visible;
  background: ${({ theme }) => theme.opacityColors.yellow_1};
  border-radius: 1rem;
  z-index: 2;

  ${({ animation }) => {
    if (animation === "showReducerAndState") {
      return `
        animation: fadeIn 0.5s linear 1;
        animation-fill-mode: forwards;
      `;
    }
  }}
`;

const Dispatch = styled.div`
  position: relative;
  top: 9rem;
  left: -2.8rem;
  width: 14rem;
  height: 9rem;
  line-height: 9rem;
  border-radius: 1rem;
  visibility: ${({ actions }) => (actions.includes("showStore") ? "visible" : "hidden")};
  // visibility: visible;

  background: ${({ theme }) => theme.opacityColors.deepblue_1};
  color: ${({ theme }) => theme.colors.white_1};
  font-size: ${({ theme }) => theme.fontSizes.head6};
  font-weight: ${({ theme }) => theme.fontWeights.mid};
  text-align: center;
  z-index: 2;

  ${({ animation }) => {
    if (animation === "showStore") {
      return `
        animation: fadeIn 0.5s linear 1;
        animation-fill-mode: forwards;
      `;
    }

    if (animation === "blinkDispatch") {
      return "animation: blink 1s linear 2";
    }
  }}
`;

const PathBox = styled.div`
  position: absolute;
  display: block;
  top: 30rem;
  width: 60rem;
  height: 28rem;
  visibility: ${({ actions }) => (actions.includes("showPath") ? "visible" : "hidden")};
  // visibility: visible;
  background: transparent;
  // border: 0.2rem dashed transparent;
  border: 0.1rem solid ${({ theme }) => theme.colors.grayblue_1};
  border-radius: 0.4rem;
  z-index: 0;

  ${({ animation }) => {
    if (animation === "showPath") {
      return `
      animation: fadeInPath 3s linear 1;
      animation-fill-mode: forwards;
      `;
    }
  }}
`;

const Circle = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  visibility: hidden;
  // visibility: visible;
  z-index: 1;

  ${({ animation }) => {
    if (animation === "moveStateToView") {
      return `
        visibility: visible;
        animation: moveStateToView 3s linear 1;
        animation-fill-mode: forwards;
      `;
    }

    if (animation === "moveViewToDispatch") {
      return `
        visibility: visible;
        animation: moveViewToDispatch 3s linear 1;
        animation-fill-mode: forwards;
      `;
    }
  }}
`;

const BoxWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  visibility: ${({ actions }) => (actions && actions.includes("showReducers") ? "visible" : "hidden")};
  // visibility: visible;

  ${({ animation }) => {
    if (animation === "showReducers") {
      return `
        animation: fadeIn 0.5s linear 1;
        animation-fill-mode: forwards;
      `;
    }
  }}
`;

const Text = styled.div`
  width: 100%;
  margin-top: ${({ theme }) => theme.space.md};
  margin-bottom: ${({ theme }) => theme.space.xl};
  color: ${({ theme }) => theme.colors.white_1};
  color: ${({ theme, color }) => (color === "dark" ? theme.colors.grayblue_1 : theme.colors.white_1)};
  font-size: ${({ theme }) => theme.fontSizes.head6};
  font-weight: ${({ theme }) => theme.fontWeights.mid};
  text-align: ${({ align }) => align};
`;

const CounterWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 18rem;
  height: 4rem;
  visibility: ${({ actions }) => (actions && actions.includes("showViewComponent") ? "visible" : "hidden")};
  // visibility: visible;
  boder-radius: 1rem;
  border-radius: 1rem;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;

  ${({ animation }) => {
    if (animation === "showViewComponent") {
      return `
        animation: fadeIn 0.5s linear 1;
        animation-fill-mode: forwards;
      `;
    }

    if (animation === "blinkCounter") {
      return "animation: blink 1s linear 2;";
    }
  }}
`;

const MinusButton = styled.div`
  width: 25%;
  height: 100%;
  line-height: 4rem;
  text-align: center;
  background: ${({ theme }) => theme.colors.darkblue_1};
  font-size: ${({ theme }) => theme.fontSizes.head2};
  border-radius: 1rem 0rem 0rem 1rem;

  ${({ animation }) => {
    if (animation === "showClickEvent") {
      return `
        animation: blink 1s linear 2;
      `;
    }
  }}
`;

const PlusButton = styled.div`
  width: 25%;
  height: 100%;
  line-height: 4rem;
  text-align: center;
  background: ${({ theme }) => theme.colors.darkblue_1};
  font-size: ${({ theme }) => theme.fontSizes.head2};
  border-radius: 0rem 1rem 1rem 0rem;
`;

const CounterText = styled.div`
  width: 50%;
  height: 100%;
  line-height: 4rem;
  text-align: center;
  background: ${({ theme }) => theme.colors.white_1};
  color: ${({ theme }) => theme.colors.darkblue_2};
  font-size: ${({ theme }) => theme.fontSizes.head6};
`;

const DispatchActionBox = styled.div`
  width: 28rem;
  height: 3.5rem;
  line-height: 3.5rem;
  visibility: ${({ actions }) => (actions && actions.includes("showViewComponent") ? "visible" : "hidden")};
  visibility: hidden;
  margin-bottom: 4rem;
  border-radius: 2rem;
  background: ${({ theme }) => theme.colors.grayblue_1};
  background: #3d4c70;
  text-align: center;

  ${({ animation }) => {
    if (animation === "dispatchCall") {
      return `
        animation: showDispatchAction 2s linear 2;
      `;
    }
  }}
`;

const InnerBox = styled.div`
  width: 10rem;
  height: 5rem;
  line-height: 5rem;
  border-radius: 1rem;
  background: ${({ theme }) => theme.opacityColors.white_1};
  color: ${({ theme }) => theme.colors.gray_3};
  text-align: center;

  ${({ animation }) => {
    if (animation === "moveToDecrement") {
      return `
        animation: blink 1s linear 2;
      `;
    }
  }}
`;
