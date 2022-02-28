import React from "react";

import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";

import App from "./App";
import createStore from "./configureStore";
import GlobalStyle from "./styles/GlobalStyle";
import theme from "./styles/theme";

// const store = createStore();

ReactDOM.render(
  <React.StrictMode>
    {/* <Provider store={store}> */}
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <App />
    </ThemeProvider>
    {/* </Provider> */}
  </React.StrictMode>,
  document.getElementById("root"),
);
