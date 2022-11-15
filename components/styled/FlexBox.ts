import styled from 'styled-components';

interface FlexBoxModel {
  column?: boolean;
  justifyContent?: string;
  gap?: string;
}

const FlexBox = styled.div<FlexBoxModel>`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: ${(props) => (props.justifyContent ?? 'center')};
  align-items: center;
  flex-direction: ${(props) => (props.column ? 'column' : 'row')};
  gap: ${(props) => (props.gap ?? '16px')};
  flex-wrap: wrap;
`;

export default FlexBox;
