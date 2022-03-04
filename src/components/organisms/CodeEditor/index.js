import React, { useEffect } from "react";

import styled from "styled-components";

import { TooltipModal } from "../../templates";

const CodeEditor = () => {
  useEffect(() => {
    // code for testing render tooltip modal with mock data
    const $li = document.querySelector("#line1");
    const rect = $li.getBoundingClientRect();

    const $li2 = document.querySelector("#line2");
    const rect2 = $li2.getBoundingClientRect();
  }, []);

  return (
    <Container>
      <LineWrapper>
        <li id="line1">
          <span>1</span>
          <pre className="selected">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptate repellendus corrupti modi natus odit
            adipisci dolor assumenda consequatur veniam, aperiam dolores laborum laudantium, at accusamus esse quasi
            possimus! Consequuntur, perferendis?
          </pre>
        </li>
        <li id="line2">
          2
          <pre>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptate repellendus corrupti modi natus odit
          </pre>
        </li>
        <li>3</li>
        <li>4</li>
        <li>5</li>
        <li>6</li>
        <li>7</li>
      </LineWrapper>
      <TooltipModal direction="left" />
    </Container>
  );
};

export default CodeEditor;

const Container = styled.div`
  display: flex;
  padding: 0.8rem;
  width: calc(100% - 21.6rem);
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: ${({ theme }) => theme.fontWeights.normal};
  color: ${({ theme }) => theme.colors.white_1};
`;

const LineWrapper = styled.ul`
  width: 100%;
  padding: 0;
  margin: 0;

  li {
    display: flex;
    min-height: 2rem;

    span {
      margin-right: ${({ theme }) => theme.space.lg};
    }
  }

  pre.selected {
    background: ${({ theme }) => theme.opacityColors.gray_1};
  }

  pre {
    width: 100%;
    padding: 0;
    margin: 0;
    padding-left: ${({ theme }) => theme.space.lg};
    white-space: pre-wrap;
  }
`;
