import styled from 'styled-components';

const Spinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 325px;
  background-color: #ffffff;

  &::after {
    content: '';
    width: 40px;
    height: 40px;
    border: 4px solid #e0e0e0;
    border-top: 4px solid #74b0ff73;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export default Spinner;
