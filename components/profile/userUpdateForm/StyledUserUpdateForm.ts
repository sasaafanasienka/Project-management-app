import styled from 'styled-components';
import StyledUserInfo from '../userInfo/StyledUserInfo';

export const StyledUserUpdateForm = styled(StyledUserInfo)`
  flex: 2;
  flex-direction: column;
  justify-content: flex-start;
  gap: 0px;

  h2 {
    color: #373737;
  }
`;

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 15px; 
`;

