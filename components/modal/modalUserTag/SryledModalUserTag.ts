import styled from 'styled-components';

const StyledModalUserTag = styled.div`
  padding: 5px 15px 5px 5px;
  margin-bottom: 10px;
  border: 1px dashed #CDCDCD;
  position: relative;
  background-color: #EBECF0;
  border-radius: 5px;
  min-width: 56px;

  span {
    display: flex;
    align-items: center;
    justify-content: center;
    top: -7px;
    right: -2px;
    position: absolute;
    border-radius: 50%;
    background-color: #fff;
    color: #E15342;
    border: 1px solid #fff;
    transition: border-color 0.2s ease-in-out, transform 0.2s ease-in-out;
    cursor: pointer;

    &:hover {
      border-color: #E15342;
      transform: scale(1.1);
    }
  }
`;

export default StyledModalUserTag;
