import React from "react";

import PropTypes from "prop-types";
import styled from "styled-components";

import { Icon } from "../../atoms";

const FileItem = ({ type, depth, name, id, selected }) => {
  return (
    <Container depth={depth} id={id}>
      <Icon type={type} size="xs" />
      <TextWarrper selected={selected}>{name}</TextWarrper>
    </Container>
  );
};

FileItem.propTypes = {
  type: PropTypes.string.isRequired,
  depth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  selected: PropTypes.bool,
};

FileItem.defaultProps = {
  depth: "0rem",
  selected: false,
};

export default FileItem;

const Container = styled.div`
  display: flex;
  align-items: center;
  height: 2rem;
  padding: ${({ theme }) => theme.space.sm};
  padding-left: ${({ depth }) => `${1.5 * depth}rem`};
`;

const TextWarrper = styled.p`
  margin-left: ${({ theme }) => theme.space.md};
  color: ${({ theme, selected }) => (selected ? theme.colors.lightblue_1 : theme.colors.white_1)};
`;
