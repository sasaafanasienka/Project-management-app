import styled from 'styled-components';

interface FlexBoxModel {
  column?: boolean;
  justifyContent?: string;
  alignItems?: string;
  gap?: string;
  wrap?: string;
  width?: string;
}

const FlexBox = styled.div<FlexBoxModel>`
  width: ${(props) => (props.width ?? '100%')};
  display: flex;
  justify-content: ${(props) => (props.justifyContent ?? 'center')};
  align-items: ${(props) => (props.alignItems ?? 'center')};
  flex-direction: ${(props) => (props.column ? 'column' : 'row')};
  gap: ${(props) => (props.gap ?? '16px')};
  flex-wrap: ${(props) => (props.wrap ?? 'wrap')};
`;

export default FlexBox;
