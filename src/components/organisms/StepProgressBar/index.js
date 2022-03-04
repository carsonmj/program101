import React from "react";

import PropTypes from "prop-types";
import styled from "styled-components";

const StepProgressBar = ({ labels }) => {
  return (
    <Container>
      <ProgressBar>
        <li className="active">Step 1</li>
        <li>Step 2</li>
        <li>Step 3</li>
      </ProgressBar>
    </Container>
  );
};

StepProgressBar.propTypes = {
  labels: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default StepProgressBar;

const Container = styled.div`
  width: 100%;
`;

const ProgressBar = styled.ul`
  counter-reset: step;

  li {
    float: left;
    width: 33.33%;
    position: relative;
    text-align: center;
    color: ${({ theme }) => theme.colors.white_1};
  }

  li:before {
    position: relative;
    content: "";
    counter-increment: step;
    width: 2rem;
    height: 2rem;
    line-height: 2.5rem;
    border-radius: 50%;
    display: block;
    text-align: center;
    margin: 0 auto 1rem auto;
    background: ${({ theme }) => theme.colors.white_1};
    z-index: 2;
  }

  li:after {
    content: "";
    position: absolute;
    width: 100%;
    height: 0.2rem;
    background: ${({ theme }) => theme.colors.white_1};
    top: 1rem;
    left: -50%;
    z-index: 1;
  }

  li:first-child:after {
    content: none;
  }

  li.active {
    color: ${({ theme }) => theme.colors.yellow_1};
  }

  li.active:before {
    color: ${({ theme }) => theme.colors.yellow_1};
    background: ${({ theme }) => theme.colors.yellow_1};
  }

  li.active + li:after {
    background: ${({ theme }) => theme.colors.yellow_1};
  }
`;
