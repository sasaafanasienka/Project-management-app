import styled from 'styled-components';
import theme from '../../theme/theme';

const StyledAddBoard = styled.div`
  padding: 24px;
  width: 200px;
  min-height: 100%;
  background-color: inherit;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  border: 1px dashed ${theme.palette.secondary.light};
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  svg {
    color: ${theme.palette.secondary.light}
  }

  &:hover {
    border-color: #4153AF;
  }

  &:hover svg {
    color: #4153AF;
  }
`;

export default StyledAddBoard;
