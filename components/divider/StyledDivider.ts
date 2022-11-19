import styled from 'styled-components';

interface StyledDividerProps {
  color?: string;
  height?: string;
}

const StyledDivider = styled.div<StyledDividerProps>`
  width: 100%;
  background-color: ${(props) => (props.color ? props.color : '#E6E6E6')};
  height: ${(props) => (props.height ? props.height : '1px')};
`;

export default StyledDivider;
