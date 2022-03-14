import React, { useEffect } from "react";

import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import styled from "styled-components";

const StepProgressBar = ({ labels }) => {
  const current = useSelector((state) => state.scenario.currentScenario);

  useEffect(() => {
    if (current === "tt0005") {
      const $target = document.querySelector("#ReduxStore");
      $target.className = "active";

      return;
    }

    if (current === "tt0012") {
      const $target = document.querySelector("#SliceReducer");
      $target.className = "active";

      return;
    }

    if (current === "tt0019") {
      const $target = document.querySelector("#ViewComponent");
      $target.className = "active";
    }
  }, [current]);

  return (
    <Container>
      <ProgressBar length={labels.length}>
        {labels.map((label) => (
          <li id={label.split(" ").join("")} key={label}>
            {label}
          </li>
        ))}
      </ProgressBar>
    </Container>
  );
};

StepProgressBar.propTypes = {
  labels: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default StepProgressBar;

const Container = styled.div`
  width: 80%;
`;

const ProgressBar = styled.ul`
  counter-reset: step;
  font-size: 1rem;

  li {
    float: left;
    width: 33.3%;
    position: relative;
    text-align: center;
    color: ${({ theme }) => theme.colors.white_1};
    transition: 1s;
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
