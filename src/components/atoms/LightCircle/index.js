import React from "react";

import styled from "styled-components";

function LightCircle() {
  return (
    <Container>
      <OuterBlur />
      <Outer />
      <Circle />
      <InnerCircle />
    </Container>
  );
}

export default LightCircle;

const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 5rem;
  height: 5rem;
`;

const OuterBlur = styled.div`
  position: absolute;
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 3.5rem;
  background: radial-gradient(84.18% 84.18% at 61% 50%, #fff709 0%, #f5efc55e 100%);
  filter: blur(14px);
  z-index: 2;
`;

const Outer = styled.div`
  position: absolute;
  width: 3rem;
  height: 3rem;
  border-radius: 3rem;
  background: radial-gradient(50% 50% at 50% 50%, #d0f99959 0%, #f5efc55e 100%);
  filter: blur(6px);
  z-index: 3;
`;

const Circle = styled.div`
  position: absolute;
  width: 2rem;
  height: 2rem;
  border-radius: 2rem;
  background: linear-gradient(135deg, #ffffff 0%, #ffcd15b0 100%);
  filter: blur(4px);
  z-index: 4;
`;

const InnerCircle = styled.div`
  position: absolute;
  width: 1rem;
  height: 1rem;
  border-radius: 1rem;
  background: linear-gradient(135deg, #fffff2 0%, #fbeb5a 100%);
  box-shadow: 0px 2px 15px rgba(28, 26, 65, 0.18);
  z-index: 5;
`;
