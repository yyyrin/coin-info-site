import styled, { ThemeProvider, createGlobalStyle } from "styled-components";
import Router from "./Router";
import { ReactQueryDevtools } from "react-query/devtools";
import { HelmetProvider } from "react-helmet-async";
import { darkTheme, lightTheme } from "./theme";
import { useRecoilState } from "recoil";
import { isDarkAtom } from "./atoms";
import { ReactComponent as MoonIc } from "./assets/moonIc.svg";
import { ReactComponent as SunIc } from "./assets/sunIc.svg";

const GlobalStyle = createGlobalStyle`
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, menu, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
main, menu, nav, output, ruby, section, summary,
time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
article, aside, details, figcaption, figure,
footer, header, hgroup, main, menu, nav, section {
  display: block;
}
*[hidden] {
    display: none;
}
body {
  line-height: 1;
  font-family: 'Source Sans Pro', sans-serif;
  background-color:${(props) => props.theme.bgColor};
  color:${(props) => props.theme.textColor};
  transition: background-color 0.3s, color 0.3s;
}
menu, ol, ul {
  list-style: none;
}
blockquote, q {
  quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
  content: '';
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
* {
  box-sizing: border-box;
}
a {
  text-decoration:none;
  color: inherit;
}
`;

const ButtonContainer = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  bottom: 20px;
  right: 40px;
  border-radius: 30px;
  background-color: ${(props) => props.theme.cardBgColor};
  padding: 14px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s, box-shadow 0.3s;
  &:hover {
    cursor: pointer;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  }
`;

const App = () => {
  const [isDark, setIsDark] = useRecoilState(isDarkAtom);

  const onClick = () => {
    setIsDark(!isDark);
  };

  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <GlobalStyle />
      <HelmetProvider>
        <Router />
        <ButtonContainer onClick={onClick}>
          {isDark ? <SunIc fill="#2668ed" /> : <MoonIc fill="#2668ed" />}
        </ButtonContainer>
      </HelmetProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </ThemeProvider>
  );
};

export default App;
