import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
html {
  line-height: 1.2;
  word-wrap: break-word;
  font-size: 10px;
  font-family: 'Apple SD Gothic Neo', Roboto, 'Noto Sans KR', NanumGothic, 'Malgun Gothic', sans-serif;
  height: 100%;
}
body {
  height: 100%;
  margin: 0;
  padding: 0;
  font-size: 1.6rem;
}
ol, ul, li {
  list-style: none;
}
a {
  color: #000;
  text-decoration: none;
}
img {
  max-width: 100%;
  height: auto;
  border: 0;
}
button {
  border: 0;
  background: transparent;
  curs
}
`;

export default GlobalStyle;
