import React from "react";

import PropTypes from "prop-types";
import styled from "styled-components";

const InnerBox = ({ children }) => {
  return <Container>{children}</Container>;
};

InnerBox.propTypes = {
  children: PropTypes.node,
};

InnerBox.defaultProps = {
  children: "",
};

export default InnerBox;

const Container = styled.div`
  width: 10rem;
  height: 5rem;
  line-height: 5rem;
  border-radius: 1rem;
  background: ${({ theme }) => theme.opacityColors.white_1};
  color: ${({ theme }) => theme.colors.gray_3};
  text-align: center;
`;
