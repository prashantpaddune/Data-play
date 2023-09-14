import styled from 'styled-components';

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 50px;
  background-color: #2f3640;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    padding: 15px;
  }
`;

export const Title = styled.h1`
  font-family: 'Poppins', sans-serif;
  margin: 0;
  font-size: 1.6em;
  color: #ecf0f1;

  @media (max-width: 768px) {
    font-size: 1.4em;
  }
`;

export const Description = styled.span`
  font-family: 'Poppins', sans-serif;
  font-size: 0.8em;
  color: #dcdde1;
  margin-top: 5px;

  @media (max-width: 768px) {
    font-size: 0.7em;
    margin-bottom: 10px;
  }
`;

export const PlayButton = styled.button`
  display: flex;
  align-items: center;
  background-color: #3498db; // blue color
  border: none;
  padding: 10px 25px;
  border-radius: 5px;
  font-size: 1em;
  color: #fff;
  cursor: pointer;
  transition: background-color 0.2s, transform 0.1s;
  font-family: 'Poppins', sans-serif;

  &:hover {
    background-color: #2980b9;
  }

  &:active {
    transform: scale(0.98);
  }

  @media (max-width: 768px) {
    margin-top: 15px;
  }
`;

export const PlayIcon = styled.span`
  margin-right: 10px;
  font-size: 1.2em;
`;
