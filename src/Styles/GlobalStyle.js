import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
  ${reset}

  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }

  html {
    width: 100%;
    height: 100%;
    font-size: 62.5%; 
  }
  
  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
  
  button {
    background-color: transparent;
    border: none;
    outline: none;
    cursor: pointer;
  }

  [tabindex]:focus-visible,
  label:focus-visible,
  button:focus-visible{
    outline: none;
    box-shadow: 0 0 0 3px rgba(0,0,0, 0.65);
  }
  
`;

export default GlobalStyle;
