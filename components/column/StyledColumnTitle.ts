import styled from 'styled-components';

const StyledColumnTitle = styled.div`
  display: flex;
  cursor: pointer;
  align-items: center;

  svg {
    font-size: 16px;
  }

  h3 {
    position: relative;

    span {
      font-size: 0.7rem;
      text-align: center;
      height: 15px;
      width: 15px;
      color: #fff;
      background-color: #4153AF;
      border-radius: 50%;
      top: -10px;
      position: absolute;
    }
  }

`;

export default StyledColumnTitle;
