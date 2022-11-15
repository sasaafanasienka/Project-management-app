import styled from '@emotion/styled';

import theme from '../../theme/theme';

const StyledHeader = styled.header`
  width: 100%;
  height: 50px;
  background-color: ${theme.palette.primary.main};
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  & div {
    display: flex;
    column-gap: 10px;
  }
`;

export default StyledHeader;
