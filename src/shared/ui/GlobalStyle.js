import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  /* Reset CSS */
  *, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    text-align:center;
  }

  html, body {
    height: 100%;
    font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, Roboto, 'Helvetica Neue', sans-serif;
    -webkit-font-smoothing: antialiased;
    background-color: #ebebebff;
    color: #000;
  }

  #root{
    width: 100%;
    max-width: 720px;
    background-color: #ffffff;
    margin: 0 auto;
  }

  a {
    text-decoration: none;
    color: inherit;
  }
  ul, ol {
    list-style: none;
  }
`;
