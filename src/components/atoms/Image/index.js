import React from "react";

import PropTypes from "prop-types";
import styled from "styled-components";

const Image = ({ src, alt, width, height }) => {
  return <Container src={src} alt={alt} width={width} height={height} />;
};

Image.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
};

Image.defaultProps = {
  alt: "image",
  width: "20rem",
  height: "20rem",
};

export default Image;

const Container = styled.img.attrs(({ src, alt }) => ({
  src,
  alt,
}))`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  margin: ${({ theme }) => theme.space.md};
`;
