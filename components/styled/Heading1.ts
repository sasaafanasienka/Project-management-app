import styled from 'styled-components';

interface FlexBoxModel {
  column?: boolean;
  justifyContent?: string;
  gap?: string;
}

const Heading1 = styled.h1<FlexBoxModel>`
  width: 100%;
  margin: 0 0 16px 0;
  font-size: 20px;
  /* height: 100%;
  display: flex;
  justify-content: ${(props) => (props.justifyContent ?? 'center')};
  align-items: center;
  flex-direction: ${(props) => (props.column ? 'column' : 'row')};
  gap: ${(props) => (props.gap ?? '16px')};
  flex-wrap: wrap; */
`;

export default Heading1;
