import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  /* Reset CSS */
  *, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  html, body {
    height: 100%;
    font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, Roboto, 'Helvetica Neue', sans-serif;
    -webkit-font-smoothing: antialiased;
    background-color: #fff;
    color: #000;
  }
  a {
    text-decoration: none;
    color: inherit;
  }
  ul, ol {
    list-style: none;
  }
`;
