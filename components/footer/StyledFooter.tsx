import styled from '@emotion/styled';

import theme from '../../theme/theme';

const StyledFooter = styled.footer`
  width: 100%;
  height: 50px;
  background-color: #fff;
  border-top: 1px solid #ddd;
  padding: 0 20px;
  display: flex; 
  align-items: center;
  justify-content: space-between;
  & a {
    color: black;
    &:hover {
      color: ${theme.palette.primary.main};
    }
  }
  & svg {
    width: 70px;
    height: auto;
    transition: all 0.3s ease;
  }
  & img {
    width: 30px;
    height: 30px;
    border-radius: 50%;
  }
`;

export default StyledFooter;
