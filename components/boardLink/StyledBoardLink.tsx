import styled from '@emotion/styled';

const StyledBoardLink = styled.div`
  width: 200px;
  height: 100%;
  background-color: white;
  padding: 20px 10px 10px 20px;
  display: flex;
  flex-flow: column;
  border-radius: 5px;
  transition: all 0.3s ease-in-out;
  & > div {
    margin-top: auto;
    transition: opacity 0.3s ease-in-out;
    opacity: 0;
  }
  &:hover > div {
    opacity: 1;
  }

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

  &:hover {
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
  }
`;

export default StyledBoardLink;
