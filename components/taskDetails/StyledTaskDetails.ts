import styled from 'styled-components';

const StyledTaskDetails = styled.div`
  padding: 0 18px 0 18px;
  width: 500px;
  display: flex;
  flex-direction: column;

  p {
    margin-top: 0px;
    padding: 0px;
  }

  & > div {
    cursor: pointer;
  }

  textarea {
    padding: 5px;
    outline: none;
    border: 1px dashed #B2AEAE;
    border-radius: 5px;
    font-family: inherit;
    font-size: inherit;
    background-color: #F3F3F3;
    height: 100%;
  }
`;

export default StyledTaskDetails;
