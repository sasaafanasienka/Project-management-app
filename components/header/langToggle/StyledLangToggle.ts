import styled from 'styled-components';

const StyledLangToggle = styled.button`
  color: #fff;
  padding: 10px;
  background-color: inherit;
  border-radius: 50%;
  border: none;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: rgba(45, 45, 45, 0.1);
  }

  &:active {
    box-shadow: rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px;
  }
`;

export default StyledLangToggle;
