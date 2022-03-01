import React from "react";

import PropTypes from "prop-types";
import { FaFileCode, FaFolderOpen } from "react-icons/fa";
import styled from "styled-components";

import themes from "../../../styles/theme";

const { colors } = themes;

const getIcon = (type) => {
  switch (type) {
    case "folder":
      return <FaFolderOpen />;
    case "file":
      return <FaFileCode />;
  }
};

const Icon = ({ type, ...props }) => {
  return <Wrapper {...props}>{getIcon(type)}</Wrapper>;
};

Icon.propTypes = {
  type: PropTypes.string.isRequired,
  size: PropTypes.string,
  fill: PropTypes.string,
  stroke: PropTypes.string,
};

Icon.defaultProps = {
  size: "sm",
  fill: colors.white_1,
  stroke: colors.white_1,
};

export default Icon;

const Wrapper = styled.span`
  display: inline-block;
  width: ${({ theme, size }) => theme.iconSize[size]};
  height: ${({ theme, size }) => theme.iconSize[size]};

  & > svg {
    width: 100%;
    height: 100%;
    fill: ${(props) => props.fill};
    stroke: ${(props) => props.stroke};
  }
`;
