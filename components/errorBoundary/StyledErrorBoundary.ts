import styled from 'styled-components';

const StyledErrorBoundary = styled.div`
  padding: 20px;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: start;
  align-items: center;
  color: #373737;
  background-color: #F5F5F5;
  flex-direction: column;

  h1 {
    padding: 20px;
    text-align: center;
    border: 1px dashed #373737;
    background-color: #fff;
  }
`;

export default StyledErrorBoundary;
