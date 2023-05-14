import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "styled-components";
import { theme, Loader, Title } from "@gnosis.pm/safe-react-components";
import SafeProvider from "@gnosis.pm/safe-apps-react-sdk";

import GlobalStyle from "./GlobalStyle";
import SafeApp from "./SafeApp";
import MakerApp from "./MakerApp";

const isMakerApp = window.location.hash.includes("maker");

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      {!isMakerApp ? (
        <SafeProvider
          loader={
            <>
              <Title size="md">Waiting for Safe...</Title>
              <Loader size="md" />
            </>
          }
        >
          <SafeApp />
        </SafeProvider>
      ) : (
        <MakerApp />
      )}
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
