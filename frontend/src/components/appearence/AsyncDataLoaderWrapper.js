import styled from 'styled-components';
import { Spinner } from 'react-bootstrap';

const AsyncDataLoaderWrapper = ({loading, text, children}) => {
  return (
    <>
    {loading ? (
      <SpinnerContainer>
      <div>
        <StyledSpinner />
        <h6>{text}</h6>
      </div>
    </SpinnerContainer>
    ) : (
      children
    )}
    </>
  );
}

const StyledSpinner = styled(Spinner)`
  width: 8rem;
  height: 8rem;
  border: 10px solid #f3f3f3;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: auto;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
      border-top-color: blue;
    }
    25% {
      border-top-color: green;
    }
    50% {
      border-top-color: yellow;
    }
    75% {
      border-top-color: red;
    }
    100% {
      transform: rotate(360deg);
      border-top-color: black;
    }
  }
`;

const SpinnerContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.47);
`;

export default AsyncDataLoaderWrapper;
