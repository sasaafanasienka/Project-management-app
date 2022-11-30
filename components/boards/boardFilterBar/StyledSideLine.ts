import styled from 'styled-components';

export interface StyledSideLineProps {
  owned?: boolean;
}

const StyledSideLine = styled.span<StyledSideLineProps>`
  margin-right: 5px;
  background-color: ${(props) => (props.owned ? '#F3B455' : '#9BCBEB')};
  display: inline-block;
  height: 100%;
  width: 4px;
`;

export default StyledSideLine;
