import styled from 'styled-components';

const StyledTask = styled.div`
  width: 100%;
  background-color: white;
  padding: 20px 10px 10px 20px;
  display: flex;
  flex-flow: column;
  border-radius: 5px;
  cursor: grab;
  & h3 {
    margin: 0 0 10px 0;
    font-size: 16px;
    width: calc(100% - 10px)
  }
  & p {
    width: calc(100% - 10px);
    margin: 0 0 10px 0;
    font-size: 14px;
    line-height: 140%;
    flex-grow: 1;
  }
`;

export default StyledTask;
