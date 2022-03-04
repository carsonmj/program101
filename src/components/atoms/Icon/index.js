import React from "react";

import PropTypes from "prop-types";
import { FaFileCode, FaFolderOpen } from "react-icons/fa";
import { BiChevronLeft, BiChevronRight, BiX } from "react-icons/bi";
import { noop } from "lodash";
import styled from "styled-components";

import themes from "../../../styles/theme";

const { colors } = themes;

const getIcon = (type) => {
  switch (type) {
    case "folder":
      return <FaFolderOpen />;
    case "file":
      return <FaFileCode />;
    case "prev":
      return <BiChevronLeft />;
    case "next":
      return <BiChevronRight />;
    case "close":
      return <BiX />;
  }
};

const Icon = ({ type, onClick, ...props }) => {
  return (
    <Wrapper onClick={onClick} {...props}>
      {getIcon(type)}
    </Wrapper>
  );
};

Icon.propTypes = {
  type: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  color: PropTypes.string,
  size: PropTypes.string,
};

Icon.defaultProps = {
  onClick: noop,
  size: "sm",
  color: colors.white_1,
};

export default Icon;

const Wrapper = styled.span`
  display: inline-block;
  width: ${({ theme, size }) => theme.iconSize[size]};
  height: ${({ theme, size }) => theme.iconSize[size]};
  color: ${({ color }) => color};

  & > svg {
    width: 100%;
    height: 100%;
  }
`;
