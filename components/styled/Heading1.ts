import styled from 'styled-components';

interface FlexBoxModel {
  column?: boolean;
  justifyContent?: string;
  gap?: string;
}

const Heading1 = styled.h1<FlexBoxModel>`
  color: #373737;
  width: 100%;
  display: flex;
  align-items: center;
  margin: 0;
  font-size: 20px;
`;

export default Heading1;
