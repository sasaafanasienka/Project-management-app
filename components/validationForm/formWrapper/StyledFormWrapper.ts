import styled from 'styled-components';

export interface StyledFormWrapperModel {
  fixed?: boolean;
}

export const StyledFormWrapper = styled.div<StyledFormWrapperModel>`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: ${(props) => (props.fixed ? 'fixed' : 'absolute')};
  top: 0;
  right: 0;
  left: 0;
  background-color: rgba(255, 255, 255, 0.8);
  z-index: 10;
`;

export const StyledFormContent = styled.div`
  padding: 16px 22px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 600px;
  border: 1px dashed #CDCDCD;
`;
