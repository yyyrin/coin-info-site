import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ThemeProvider } from "styled-components";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const darkTheme = {
  textColor: "whitesmoke",
  backgroundColor: "#111",
};
// const lightTheme = {
//   textColor: "#111",
//   backgroundColor: "whitesmoke",
// };

root.render(
  <React.StrictMode>
    <ThemeProvider theme={darkTheme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
