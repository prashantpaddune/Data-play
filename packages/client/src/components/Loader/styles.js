

import styled from 'styled-components';

export const Container = styled.div`
  margin-top: ${({ margin }) => (margin ? margin : "100px")};
  .spinner {
    width: 50px;
    aspect-ratio: 1;
    border-radius: 50%;
    border: 8px solid;
    border-color: #2f3640 #0000;
    animation: s1 1s infinite;
  }
  @keyframes s1 {to{transform: rotate(.5turn)}}
`;