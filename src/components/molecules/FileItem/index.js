import React from "react";

import { noop } from "lodash";
import PropTypes from "prop-types";
import styled from "styled-components";

import { Icon } from "../../atoms";

const FileItem = ({ type, depth, name, id, selected, onClick }) => {
  return (
    <Container depth={depth} id={id} onClick={() => onClick(id, type)}>
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
  onClick: PropTypes.func,
};

FileItem.defaultProps = {
  depth: "0rem",
  selected: false,
  onClick: noop,
};

export default FileItem;

const Container = styled.div`
  display: flex;
  align-items: center;
  height: 2rem;
  padding: ${({ theme }) => theme.space.sm};
  padding-left: ${({ depth }) => `${1.5 * depth}rem`};
  cursor: pointer;
`;

const TextWarrper = styled.p`
  margin-left: ${({ theme }) => theme.space.md};
  color: ${({ theme, selected }) => (selected ? theme.colors.lightblue_1 : theme.colors.white_1)};
`;
