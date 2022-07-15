import styled, { createGlobalStyle, ThemeProvider } from "styled-components";
import Router from "./Router";
import { ReactQueryDevtools } from "react-query/devtools";
import { HelmetProvider } from "react-helmet-async";
import { useState } from "react";
import { lightTheme, darkTheme } from "./theme";

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
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, main, menu, nav, section {
  display: block;
}
/* HTML5 hidden-attribute fix for newer browsers */
*[hidden] {
    display: none;
}
body {
  line-height: 1;
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
*{
  box-sizing: border-box;
}
body{
  font-weight: 300;
  font-family: 'Source Sans Pro', sans-serif;
  background-color: ${({ theme }) => theme.bgColor};
  color:${({ theme }) => theme.textColor};
  line-height: 1.2;
}
a {
  text-decoration: none;
  color:inherit;
}
`;

const Icon = styled.div`
  position: absolute;
  justify-content: center;
  align-items: center;
  display: flex;
  width: 20vw;
  height: 10vh;
  font-size: 50px;
  &:hover {
    transition: all 0.6s ease-in-out;
    transform: scale(1.2);
  }
`;

function App() {
  const [themeMode, setThemeMode] = useState(false);
  const toggleDark = () => {
    setThemeMode(!themeMode);
  };

  return (
    <ThemeProvider theme={themeMode ? darkTheme : lightTheme}>
      <Icon onClick={() => toggleDark()}>
        {themeMode ? <span>🌚</span> : <span>🌞</span>}
      </Icon>
      <GlobalStyle />
      <HelmetProvider>
        <Router />
      </HelmetProvider>
      <ReactQueryDevtools initialIsOpen={true} />
    </ThemeProvider>
  );
}

export default App;
