import React from "react";

import PropTypes from "prop-types";
import styled from "styled-components";

import { Header } from "../../organisms";

const MainTemplate = ({ visualContent, codeContent }) => {
  return (
    <Container>
      <Header />
      <ContentWrapper>
        <VisualizeBoard>{visualContent}</VisualizeBoard>
        <CodeEditorBoard>{codeContent}</CodeEditorBoard>
      </ContentWrapper>
    </Container>
  );
};

MainTemplate.propTypes = {
  visualContent: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node, PropTypes.element]).isRequired,
  codeContent: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node, PropTypes.element]).isRequired,
};

export default MainTemplate;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const ContentWrapper = styled.div`
  display: flex;
  width: 100%;
  height: calc(100vh - 5rem);
`;

const VisualizeBoard = styled.div`
  width: 50%;
  height: 100%;
  background: ${({ theme }) => theme.colors.darkblue_1};
`;

const CodeEditorBoard = styled.div`
  width: 50%;
  height: 100%;
  background: ${({ theme }) => theme.colors.darkblue_2};
`;
