import { ThemeProvider, createGlobalStyle } from "styled-components";
import Router from "./Router";
import { ReactQueryDevtools } from "react-query/devtools";
import { HelmetProvider } from "react-helmet-async";
import { darkTheme, lightTheme } from "./theme";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "./atoms";

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

const App = () => {
  // useRecoilValue(state): Recoil state 값을 반환
  // 암묵적으로 주어진 상태에 컴포넌트를 구독함
  // 읽기 전용 상태와 쓰기 가능 상태에서 모두 동작하므로 컴포넌트가 상태를 읽을 수만 있게 하고 싶을 때에 추천하는 hook
  // React 컴포넌트에서 사용하면 상태가 업데이트 될 때 리렌더링을 하도록 컴포넌트를 구독함
  const isDark = useRecoilValue(isDarkAtom);

  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <GlobalStyle />
      <HelmetProvider>
        <Router />
      </HelmetProvider>
      <ReactQueryDevtools initialIsOpen={true} />
    </ThemeProvider>
  );
};

export default App;
