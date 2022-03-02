import React from "react";

import styled from "styled-components";

import { Button } from "../../atoms";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.black_1};
`;

const Logo = styled.img.attrs({
  src: "/assets/program101_logo.png",
  alt: "logo",
})`
  width: 11.5rem;
  height: 3rem;
  margin: ${({ theme }) => theme.space.md};
  cursor: pointer;
`;

const Header = () => {
  return (
    <Container>
      <Logo />
      <Button text="restart" />
    </Container>
  );
};

export default Header;
