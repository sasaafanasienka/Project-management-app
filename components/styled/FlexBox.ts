import styled from 'styled-components';

interface FlexBoxModel {
  column?: boolean;
  justifyContent?: string;
}

const FlexBox = styled.div<FlexBoxModel>`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: ${(props) => (props.justifyContent ? props.justifyContent : 'center')};
  align-items: center;
  flex-direction: ${(props) => (props.column ? 'column' : 'row')};
  gap: 16px;
`;

export default FlexBox;
